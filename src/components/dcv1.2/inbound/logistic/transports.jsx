import React, { useEffect, useState } from "react";
import useFormatDate from "../../../utilites/useFormatDate";
import DataTable from "react-data-table-component";
import Api from "../../../../api";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast from "react-hot-toast";
import { Modal, Button, Form } from 'react-bootstrap';
//import react-confirm-alert
import { confirmAlert } from 'react-confirm-alert';

//import CSS react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Transports() {
    const [transport, setTransport] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
    const [currentData, setCurrentData] = useState({ id_kendaraan: '', Jenis_Kendaraan: '', slot_Kendaraan: '', tipe_pallet: '' });

    const fetchData = async () => {
        try {
            const response = await Api.get('api/kendaraan');
            setTransport(response.data.data);
            console.log('API Response transport:', response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const lowercasedSearch = search.toLowerCase();
        const filtered = transport.filter(item =>
            item.Jenis_Kendaraan.toLowerCase().includes(lowercasedSearch)
        );
        setFilteredData(filtered);
    }, [search, transport]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transport");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Transport report.xlsx');
    };

    const handleAdd = () => {
        setCurrentData({ id_kendaraan: '', Jenis_Kendaraan: '', slot_Kendaraan: '', tipe_pallet: ''});
        setModalType('add');
        setShowModal(true);
    };

    const handleEdit = (row) => {
        setCurrentData({ id_kendaraan: row.id_kendaraan, 
                        Jenis_Kendaraan: row.Jenis_Kendaraan, 
                        slot_Kendaraan: row.slot_Kendaraan,
                        tipe_pallet: row.tipe_pallet });
        setModalType('edit');
        setShowModal(true);
    };

    const handleDelete = async (id_kendaraan) => {
       
        confirmAlert({
            title: 'Are You Sure ?',
            message: 'want to delete this data ?',
            buttons: [{
                    label: 'YES',
                    onClick: async () => {
                        await Api.delete(`api/kendaraan/${id_kendaraan}`, {
                              
                            })
                            .then(() => {

                                //show toast
                                toast.success("Data Deleted Successfully!", {
                                    duration: 4000,
                                    position: "top-right",
                                    style: {
                                        borderRadius: '10px',
                                        background: '#333',
                                        color: '#fff',
                                    },
                                });

                                //call function "fetchData"
                                fetchData();
                            })
                    }
                },
                {
                    label: 'NO',
                    onClick: () => {}
                }
            ]
        });
    };

    const handleSave = async () => {
        try {
            if (modalType === 'add') {
                await Api.post('api/kendaraan', currentData);
                toast.success("Add Data Successfully!", {
                    duration: 4000,
                    position: "top-right",
                    style: {
                      borderRadius: '10px',
                      background: '#1f59a1',
                      color: '#fff',
                    },
                  });
            } else {
                await Api.put(`api/kendaraan/${currentData.id_kendaraan}`, currentData);
                toast.success("Update Data Successfully!", {
                    duration: 4000,
                    position: "top-right",
                    style: {
                      borderRadius: '10px',
                      background: '#1f59a1',
                      color: '#fff',
                    },
                  });
            }
           
            fetchData(); // Refresh data after save
            setShowModal(false);
        } catch (error) {
             toast.error("Failed to save data!", {
                    duration: 4000,
                    position: "top-right",
                    style: {
                      borderRadius: '10px',
                      background: '#d9534f',
                      color: '#fff',
                    },
                  });
        }
    };

    const columns = [
        { name: 'Type', selector: row => row.Jenis_Kendaraan ?? 'No Data', sortable: true },
        { name: 'Slot', selector: row => row.slot_Kendaraan ?? 'No Data', sortable: true },
        { name: 'Type Pallet', selector: row => row.tipe_pallet ?? 'No Data', sortable: true },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(row)}>Edit</button>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(row.id_kendaraan)}>Delete</button>
                </>
            )
        }
    ];

    const customStyles = {
        rows: {
            style: {
              backgroundColor: '#f2f2f2',
            '&:nth-of-type(odd)': {
              backgroundColor: '#e6e6e6',
            },
                fontSize: '14px',
                '@media (max-width: 768px)': {
                    fontSize: '12px',
                },
                color: '#333',
            },
        },
        headCells: {
            style: {
              backgroundColor: '#0e0f65',
                fontSize: '16px',
                '@media (max-width: 768px)': {
                    fontSize: '14px', 
                },
                color: 'white',
            },
        },
    };

    return (
        <React.Fragment>
            <div className="containers mt-4 mb-5">
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-body">
                                <div className="card-excel">
                                    <div className="icon" onClick={exportToExcel}>
                                        <ContentCopyIcon />
                                        <br />
                                        To Excel
                                    </div>
                                </div>
                                <button className="btn btn-primary mb-3" onClick={handleAdd}>Add Transport</button>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="form-control mb-3"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <DataTable
                                    columns={columns}
                                    data={filteredData}
                                    pagination
                                    paginationPerPage={5}
                                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                                    highlightOnHover
                                    customStyles={customStyles}
                                    noDataComponent={
                                        <div className="alert alert-danger mb-0">
                                            Data Belum Tersedia!
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalType === 'add' ? 'Add Transport' : 'Edit Transport'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="Jenis_Kendaraan">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Type"
                                value={currentData.Jenis_Kendaraan}
                                onChange={e => setCurrentData({ ...currentData, Jenis_Kendaraan: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="slot_Kendaraan" className="mt-3">
                            <Form.Label>Slot</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Slot"
                                value={currentData.slot_Kendaraan}
                                onChange={e => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        setCurrentData({ ...currentData, slot_Kendaraan: value });
                                    }
                                }}
                            />
                        </Form.Group>
                       

                        <Form.Group controlId="tipe_pallet" className="mt-3">
                        <Form.Label>Type Pallet</Form.Label>
                        <Form.Control
                        as="select"
                        value={currentData.tipe_pallet}
                        onChange={(e) => setCurrentData({ ...currentData, tipe_pallet: e.target.value })}
                        >
                        <option value="">Select Pallet Type</option>
                        <option value="PALLET">PALLET</option>
                        <option value="NON_PALLET">NON_PALLET</option>
                        </Form.Control>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>{modalType === 'add' ? 'Add' : 'Save Changes'}</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default Transports;
