
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
import { useQuery } from "@tanstack/react-query";

function GenerateLeadTimes() {
    const [leadtime, setLeadTimes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('generate'); 
    const [userBranch, setUserBranch] = useState([]);
    const [branch, setBranch] = useState([]);
    const [currentData, setCurrentData] = useState({ id: '', mulai: null, akhir: null, jenis_aktivitas: '', status: '', slot: '', jenis_jam: '', branch: '', });
    const [loading, setLoading] = useState(false);


    const { data: userPermissions = [], isLoading } = useQuery({
        queryKey: ['permissions'], 
        queryFn: async () => {
            const response = await Api.get('/api/userpermission');
            return response.data.permissions;
        },
        cacheTime: 10 * 60 * 1000, 
        staleTime: 30000, 
    });

    const hasPermission = (permission) => {
        return userPermissions.includes(permission);
    };


    const fetchDataBranch = async () => {
        try {
            const response = await Api.get('api/branch');
            setBranch(response.data.data);
        } catch (error) {
            console.error('Error fetching branch data:', error);
        }
    };

    useEffect(() => {
        fetchDataBranch();
    }, []);



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

    const handleSave = async (event) => {
        event.preventDefault();
       
        if (!currentData.jenis_aktivitas || !currentData.jenis_jam || !currentData.branch) {
            toast.error("All fields are required!", {
                duration: 4000,
                position: "top-right",
                style: {
                    borderRadius: '10px',
                    background: '#d9534f',
                    color: '#fff',
                },
            });
            return; 
        }
       
      //  const loadingToastId = toast.loading("Processing...");
        setLoading(true);
        try {
            if (modalType === 'generate') {
                await Api.post('api/masterhour', currentData);
                toast.success("Generate Data Successfully!", {
                 //   id: loadingToastId,
                    duration: 8000,
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
                 //   id: loadingToastId,
                    duration: 8000,
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
                id: loadingToastId,
                duration: 4000,
                position: "top-right",
                style: {
                    borderRadius: '10px',
                    background: '#d9534f',
                    color: '#fff',
                },
            });
        } finally {
          //  toast.dismiss(loadingToastId);
          setLoading(false);
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
        
        hasPermission('jobtask.action') && {
            name: 'Actions',
            cell: row => (
                <>
                    {hasPermission('jobtask.edit') && (
                        <button 
                            className="btn btn-primary btn-sm" 
                            onClick={() => handleEdit(row)}
                        >
                            Edit
                        </button>
                    )}
                    {hasPermission('jobtask.delete') && (
                        <button 
                            className="btn btn-danger btn-sm ms-2" 
                            onClick={() => handleDelete(row.id)}
                        >
                            Delete
                        </button>
                    )}
                </>
            ),
            width: '250px'
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
                                {hasPermission('leadtime.excel') &&
                                <div className="card-excel">
                                
                                    <div className="icon" onClick={exportToExcel}>
                                        <ContentCopyIcon />
                                        <br />
                                        To Excels
                                    </div>
                                </div>
                                }
                                {hasPermission('jobtask.create') &&  <button className="btn btn-primary mb-3" onClick={handleGenerate}>Generate Jobs Task</button>}
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

           
            <Form.Group controlId="jenis_aktivitas">
                <Form.Label>Jenis Aktivitas</Form.Label>
                <Form.Control
                    as="select"
                    value={currentData.jenis_aktivitas}
                    onChange={(e) => setCurrentData({ ...currentData, jenis_aktivitas: e.target.value })}
                    
                >
                    <option value="">Select Activity</option>
                    <option value="ON LOAD">ON LOAD</option>
                    {modalType !== 'generate' && (
                        <option value="BREAKTIME">BREAKTIME</option>
                    )}
                   
                </Form.Control>
            </Form.Group>

          
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
             <Form.Group controlId="branch">
                 <Form.Label>Branch</Form.Label>
                 <Form.Control
                 as="select"
                value={currentData.branch}
                     onChange={(e) => setCurrentData({ ...currentData, branch: e.target.value })}
            >
                     <option value="" disabled>Choose Nama Branch</option>
                {branch.map(option => <option key={option.PrcCode} value={option.PrcName}>
            {option.PrcName}
            </option>)}
            </Form.Control>
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
        {loading ? (
              <>
               <div className="spinner-container">
              <div className="spinner-custom"></div>
            </div>
                Processing...
              </>
            ) : (
              'Save'
            )}
        </Button>
    </Modal.Footer>
</Modal>
            {/* <Modal 
    show={showModal} 
    onHide={() => { 
        if (!loading) {
            setShowModal(false); 
        }
    }} 
>
    <Modal.Header closeButton={!loading}>
        <Modal.Title>{modalType === 'generate' ? 'Generate Lead Times' : 'Edit Lead Times'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>

            <Form.Group controlId="jenis_aktivitas">
                <Form.Label>Jenis Aktivitas</Form.Label>
                <Form.Control
                    as="select"
                    value={currentData.jenis_aktivitas}
                    onChange={(e) => setCurrentData({ ...currentData, jenis_aktivitas: e.target.value })}
                >
                    <option value="">Select Activity</option>
                    <option value="ON LOAD">ON LOAD</option>
                </Form.Control>
            </Form.Group>

           
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

          
            <Form.Group controlId="branch">
                <Form.Label>Branch</Form.Label>
                <Form.Control
                    as="select"
                    value={currentData.branch}
                    onChange={(e) => setCurrentData({ ...currentData, branch: e.target.value })}
                >
                    <option value="" disabled>Choose Nama Branch</option>
                    {branch.map(option => <option key={option.PrcCode} value={option.PrcName}>
                        {option.PrcName}
                    </option>)}
                </Form.Control>
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => {
            if (!loading) {
                setShowModal(false); 
            }
        }}>
            Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? (
                <>
                    <div className="spinner-container">
                        <div className="spinner-custom"></div>
                    </div>
                    Saving...
                </>
            ) : (
                'Save'
            )}
        </Button>
    </Modal.Footer>
</Modal> */}


        </React.Fragment>
    );
}

export default GenerateLeadTimes;

