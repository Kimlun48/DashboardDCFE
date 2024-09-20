// //import react  
// import React,{useEffect, useState} from "react";
// import useFormatDate from "../../../utilites/useFormatDate";
// import DataTable from "react-data-table-component";
// import Api from "../../../../api";
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// function LeadTimes() {

//     //title page
    

//     const [leadtimes, setLeadTimes] = useState ([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [search, setSearch] = useState('');
//     const { formatDate } = useFormatDate();

//    // const time = 2 * 60 * 1000; 

//     const fetchData = async () => {
//         try {
//             const response = await Api.get('api/masterhour')
//             setLeadTimes(response.data.data)
//             setFilteredData(response.data.data)
//             console.log('API Response leadhours:', response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     }

//     useEffect (() => {
//         fetchData();
      
//     }, []);

//     useEffect(() => {
//         const lowercasedSearch = search.toLowerCase();
//         const filtered = leadtimes.filter(item =>
//             item.status.toLowerCase().includes(lowercasedSearch) || 
//             item.jenis_jam.toLowerCase().includes(lowercasedSearch) 
//         );
//         setFilteredData(filtered);
//     }, [search, leadtimes]);

//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(filteredData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "LeadTimes");
//         const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//         const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
//         saveAs(data, 'LeadTime report.xlsx');
//     };

//     const columns = [
//         // { name: 'Id', selector: row => row.id, sortable: true, width: '100px' },
//         { name: 'Start', selector: row => row.mulai, sortable: true, width: '100px' },
//         { name: 'Finish', selector: row => row.akhir, sortable: true, width: '100px' },
//         { name: 'Activity', selector: row => row.jenis_aktivitas, sortable: true, width: '200px' },
//         { name: 'Slot', selector: row => row.slot, sortable: true },
//         { name: 'Times', selector: row => row.jenis_jam, sortable: true, width: '150px' },
//         { name: 'Status', selector: row => row.status ?? 'No Data', sortable: true },   
//     ];

//     const customStyles = {
//         headCells: {
//             style: {
//                 backgroundColor: '#0e0f65', // Custom header color
//                 color: 'white',
//                 fontSize: '16px',
//                 fontWeight: 'normal',
//             },
//         },
//         rows: {
//             style: {
//                 backgroundColor: '#f2f2f2', // Custom row background color
//                 '&:nth-of-type(odd)': {
//                     backgroundColor: '#e6e6e6', // Custom alternating row background color
//                 },
//                 fontSize: '14px', // Custom font size for rows
//                 color: '#333', // Custom font color for rows
//             },
//         },
//     };

//     return(
//         <React.Fragment>
           
//                 <div className="containers mt-4 mb-5">
//                     <div className="row mt-4">
//                         <div className="col-md-12">
//                             <div className="card border-0 rounded shadow-sm border-top-success">
                               
//                                 <div className="card-body">
//                                  <div className="card-excel">
//                                  <div className="icon" onClick={exportToExcel}>
//                                  <ContentCopyIcon />
//                                  <br />
//                                  To Excel
//                                  </div>
//                                 </div>
//                                     <input
//                                         type="text"
//                                         placeholder="Search"
//                                         className="form-control mb-3"
//                                         value={search}
//                                         onChange={e => setSearch(e.target.value)}
//                                     />
//                                     <DataTable
//                                         columns={columns}
//                                         data={filteredData}
//                                         pagination
//                                         paginationPerPage={5}
//                                         paginationRowsPerPageOptions={[5, 10, 15, 20]}
//                                         highlightOnHover
//                                         customStyles={customStyles}
//                                         noDataComponent={
//                                             <div className="alert alert-danger mb-0">
//                                                 Data Belum Tersedia!
//                                             </div>
//                                         }
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
           
//         </React.Fragment>
//     )
// }

// export default LeadTimes;


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
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

//import CSS react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function LeadTimes() {
    const [leadtime, setLeadTimes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
    const [currentData, setCurrentData] = useState({ id: '', mulai: null, akhir: null, jenis_aktivitas: '', status: '', slot: '', jenis_jam: '' });

    const fetchData = async () => {

                try {
                    const response = await Api.get('api/masterhour')
                    setLeadTimes(response.data.data)
                    setFilteredData(response.data.data)
                    console.log('API Response leadhours:', response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        
            useEffect (() => {
                fetchData();
              
            }, []);
        
            useEffect(() => {
                const lowercasedSearch = search.toLowerCase();
                const filtered = leadtime.filter(item =>
                    item.status.toLowerCase().includes(lowercasedSearch) || 
                    item.jenis_jam.toLowerCase().includes(lowercasedSearch) 
                );
                setFilteredData(filtered);
            }, [search, leadtime]);
        
            const exportToExcel = () => {
                const worksheet = XLSX.utils.json_to_sheet(filteredData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "LeadTimes");
                const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
                saveAs(data, 'LeadTimes report.xlsx');
            };

    const handleAdd = () => {
        setCurrentData({ id: '', mulai: '', akhir: '', jenis_aktivitas: '', status: '', slot: '', jenis_jam: '' });
        setModalType('add');
        setShowModal(true);
    };

    const handleEdit = (row) => {
        setCurrentData({ id: row.id, mulai: row.mulai, akhir: row.akhir, jenis_aktivitas: row.jenis_aktivitas, status: row.status, slot: row.slot, jenis_jam:row.jenis_jam});
        setModalType('edit');
        setShowModal(true);
    };

    const handleDelete = async (id) => {
       
        confirmAlert({
            title: 'Are You Sure ?',
            message: 'want to delete this data ?',
            buttons: [{
                    label: 'YES',
                    onClick: async () => {
                        await Api.delete(`api/masterhour/${id}`, {
                              
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
                await Api.post('api/masterhour', currentData);
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
                await Api.put(`api/masterhour/${currentData.id}`, currentData);
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
        
        { name: 'Start', selector: row => row.mulai, sortable: true },
        { name: 'Finish', selector: row => row.akhir, sortable: true },
        { name: 'Activity', selector: row => row.jenis_aktivitas, sortable: true},
        { name: 'Slot', selector: row => row.slot, sortable: true, width: '100px' },
        { name: 'Times', selector: row => row.jenis_jam, sortable: true },
        { name: 'Status', selector: row => row.status ?? 'No Data', sortable: true },  
        {
            name: 'Actions',
            cell: row => (
                <>
                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(row)}>Edit</button>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(row.id)}>Delete</button>
                </>
            ),width: '150px'
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
                                <button className="btn btn-primary mb-3" onClick={handleAdd}>Add Lead Times</button>
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
                                    paginationPerPage={9}
                                    paginationRowsPerPageOptions={[9, 15, 20]}
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
                    <Modal.Title>{modalType === 'add' ? 'Add Lead Times' : 'Edit Lead Times'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* <Form.Group controlId="mulai">
                            <Form.Label>Start</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Start"
                                value={currentData.mulai}
                                onChange={e => setCurrentData({ ...currentData, mulai: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="akhir" className="mt-3">
                            <Form.Label>Finish</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Finish"
                                value={currentData.akhir}
                                onChange={e => setCurrentData({ ...currentData, akhir: e.target.value })}
                            />
                        </Form.Group> */}
                        <Form.Group controlId="mulai">
                            <Form.Label>Start</Form.Label>
                            <DatePicker
                                selected={currentData.mulai}
                                onChange={(date) => setCurrentData({ ...currentData, mulai: date })}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="yyyy-MM-dd HH:mm"
                                className="form-control"
                            />
                        </Form.Group>
                        <Form.Group controlId="akhir" className="mt-3">
                            <Form.Label>Finish</Form.Label>
                            <DatePicker
                                selected={currentData.akhir}
                                onChange={(date) => setCurrentData({ ...currentData, akhir: date })}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="yyyy-MM-dd HH:mm"
                                className="form-control"
                            />
                        </Form.Group>
                        <Form.Group controlId="jenis_aktivitas">
                            <Form.Label>Aktivity</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Aktivity "
                                value={currentData.jenis_aktivitas}
                                onChange={e => setCurrentData({ ...currentData, jenis_aktivitas: e.target.value })}
                            />
                        </Form.Group>
                        
                        <Form.Group controlId="slot">
                            <Form.Label>Slot</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Slot"
                                value={currentData.slot}
                                onChange={e => setCurrentData({ ...currentData, slot: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="jenis_jam">
                        <Form.Label>Times</Form.Label>
                    <Form.Select
                        value={currentData.jenis_jam}
                        onChange={e => setCurrentData({ ...currentData, jenis_jam: e.target.value })}
                    >
                     <option value="" disabled>Select Times</option>
                     <option value="PER_1JAM">PER_1JAM</option>
                    <option value="PER_2JAM">PER_2JAM</option>
                    <option value="PER_3JAM">PER_3JAM</option>
                    </Form.Select>
                            <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Status"
                                value={currentData.status}
                                onChange={e => setCurrentData({ ...currentData, status: e.target.value })}
                            />
                        </Form.Group>
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

export default LeadTimes;
