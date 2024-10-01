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
import { confirmAlert } from 'react-confirm-alert';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from "date-fns";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function GenerateLeadTimes() {
    const [leadtime, setLeadTimes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('generate'); 
    const [userBranch, setUserBranch] = useState([]);
    const [currentData, setCurrentData] = useState({ id: '', mulai: null, akhir: null, jenis_aktivitas: '', status: '', slot: '', jenis_jam: '', branch: '', });

    const fetchUserBranch = async () => {
        try {
            const response = await Api.get('api/userbranch')
            setUserBranch(response.data.data)
            console.log('API Response user branch:', response.data)
        } catch (error) {
            console.error('Error fetching user branch:', error);
        }
    }

    useEffect(() => {
        fetchUserBranch();
      }, []);

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

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const lowercasedSearch = search.toLowerCase();
        const filtered = leadtime.filter(item =>
            item.status.toLowerCase().includes(lowercasedSearch) || 
            item.jenis_jam.toLowerCase().includes(lowercasedSearch) ||
            item.branch.toLowerCase().includes(lowercasedSearch) 
        );
        setFilteredData(filtered);
    }, [search, leadtime]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "GenerateLeadTimes");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'GenerateLeadTimes report.xlsx');
    };

    const handleGenerate = () => {
        setCurrentData({ id: '', mulai: '', akhir: '', jenis_aktivitas: '', jenis_jam: '', branch: '' });
        setModalType('generate');
        setShowModal(true);
    };

    const handleEdit = (row) => {
        setCurrentData({ id: row.id, mulai: row.mulai, akhir: row.akhir, jenis_aktivitas: row.jenis_aktivitas, jenis_jam:row.jenis_jam, branch:row.branch});
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
                        await Api.delete(`api/masterhour/${id}`)
                            .then(() => {
                                toast.success("Data Deleted Successfully!", {
                                    duration: 4000,
                                    position: "top-right",
                                    style: {
                                        borderRadius: '10px',
                                        background: '#333',
                                        color: '#fff',
                                    },
                                });
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
            if (modalType === 'generate') {
                await Api.post('api/masterhour', currentData);
                toast.success("Generate Data Successfully!", {
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
        { name: 'Activity', selector: row => row.jenis_aktivitas, sortable: true, width: '150px'},
        //{ name: 'Slot', selector: row => row.slot, sortable: true, width: '100px' },
        { name: 'Times', selector: row => row.jenis_jam, sortable: true, width: '150px' },
        // { name: 'Status', selector: row => row.status ?? 'No Data', sortable: true },  
        { name: 'Branch', selector: row => row.branch ?? 'No Data', sortable: true, width: '300px' },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(row)}>Edit</button>
                    {/* <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(row.id)}>Delete</button> */}
                </>
            ),width: '250px'
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
                                <button className="btn btn-primary mb-3" onClick={handleGenerate}>Generate Lead Times</button>
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
        <Modal.Title>{modalType === 'generate' ? 'Generate Lead Times' : 'Edit Lead Times'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            {/* Slot */}
            {/* <Form.Group controlId="slot">
                <Form.Label>Slot</Form.Label>
                <Form.Control
                    type="number"
                    value={currentData.slot}
                    onChange={(e) => setCurrentData({ ...currentData, slot: e.target.value })}
                    placeholder="Enter Slot"
                />
            </Form.Group> */}

            {/* Jenis Aktivitas */}
            <Form.Group controlId="jenis_aktivitas">
                <Form.Label>Jenis Aktivitas</Form.Label>
                <Form.Control
                    as="select"
                    value={currentData.jenis_aktivitas}
                    onChange={(e) => setCurrentData({ ...currentData, jenis_aktivitas: e.target.value })}
                >
                    <option value="">Select Activity</option>
                    <option value="ON LOAD">ON LOAD</option>
                    <option value="OFF LOAD">OFF LOAD</option>
                </Form.Control>
            </Form.Group>

            {/* Jenis Jam */}
            <Form.Group controlId="jenis_jam">
                <Form.Label>Jenis Jam</Form.Label>
                <Form.Control
                    as="select"
                    value={currentData.jenis_jam}
                    onChange={(e) => setCurrentData({ ...currentData, jenis_jam: e.target.value })}
                >
                    <option value="">Select Time Type</option>
                    <option value="PER_60MNT">PER_60MNT</option>
                    <option value="PER_30MNT">PER_30MNT</option>
                    <option value="PER_15MNT">PER_15MNT</option>
                </Form.Control>
            </Form.Group>

            {/* Status */}
            {/* <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                    as="select"
                    value={currentData.status}
                    onChange={(e) => setCurrentData({ ...currentData, status: e.target.value })}
                >
                    <option value="">Select Status</option>
                    <option value="AKTIF">AKTIF</option>
                    <option value="NON AKTIF">NON AKTIF</option>
                </Form.Control>
            </Form.Group> */}

            {/* Branch */}
    <Form.Group controlId="branch">
    <Form.Label>Branch</Form.Label>
    <Form.Control
        as="select"
        value={currentData.branch}
        onChange={(e) => setCurrentData({ ...currentData, branch: e.target.value })}
        >
        <option value="">Select Branch</option>
        {userBranch.map((branch, index) => (
            <option key={index} value={branch.name_branch}>
                {branch.name_branch}
            </option>
        ))}
        </Form.Control>
        </Form.Group>

        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
            Save
        </Button>
    </Modal.Footer>
</Modal>

        </React.Fragment>
    );
}

export default GenerateLeadTimes;

