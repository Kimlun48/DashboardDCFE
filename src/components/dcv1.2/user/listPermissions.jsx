import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Api from "../../../api";
import toast from "react-hot-toast";
import { Modal, Button, Form } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { confirmAlert } from 'react-confirm-alert';
//import { useUserPermissions } from "../../utilites/UserPermissionsContext";
import { useQuery } from "@tanstack/react-query";

function ListPermissions() {
    const [permissions, setPermissions] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [currentUser, setCurrentUser] = useState(null); 
    const [currentData, setCurrentData] = useState({
        id: null,
        name: '',
        guard_name: '',
    });
    // const [userPermissions, setUserPermissions] = useState([]);
    
    // const fetchUserPermissions = async () => {
    //     try {
        
    //       const response = await Api.get('/api/userpermission');
    //       setUserPermissions(response.data.permissions);
    //     } catch (error) {
    //       console.error('Error fetching permissions', error);
    //       if (error.response) {
    //         console.error('Response data:', error.response.data);
    //         console.error('Response status:', error.response.status);
    //       } else if (error.request) {
    //         console.error('Request data:', error.request);
    //       } else {
    //         console.error('Error message:', error.message);
    //       }
    //     }
    //   };

    // useEffect(() => {
    //     fetchUserPermissions(); 
    //   }, []);
  
   
    // const hasPermission = (permission) => {
    //   return userPermissions.includes(permission);
    // };
    // const [userPermissions, setUserPermissions] = useState ([]);
    // const fetchDataPermissions = async () => {
    //     try {
    //         const response = await Api.get('/api/userpermission')
    //         setUserPermissions(response.data.permissions);
    //     } catch (error) {
    //         console.error("Error fetching permissions data:", error);
    //     }
    // }

    // useEffect(() => {
    //     fetchDataPermissions();
    // },[]);

    // const hasPermission = (permission) => {
    //     return userPermissions.includes(permission);
    //   };

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
    
    const fetchData = async () => {
        try {
            const response = await Api.get('api/permissions');
            setPermissions(response.data.data);
            setFilteredData(response.data.data);
        } catch (error) {
            console.error('Error fetching permissions:', error);
        }
    };
        
    const fetchCurrentUser = async () => {
        try {
            const response = await Api.get('api/getcurrentuser');
            setCurrentUser(response.data.data);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchCurrentUser();
    }, []);

    // Handle save (create/update)
    const handleSave = async () => {
        if (!currentData.name) {
            toast.error("Please fill in all required fields!");
            return;
        }

        try {
            if (modalType === 'add') {
                await Api.post('api/permissions', currentData);
                toast.success("Permission added successfully!");
            } else {
                await Api.put(`api/permissions/${currentData.id}`, currentData);
                toast.success("Permission updated successfully!");
            }
            fetchData();
            setShowModal(false);
        } catch (error) {
            toast.error("Failed to save data!");
        }
    };

   

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);
        const filtered = permissions.filter((permission) => 
            permission.name.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
    };
    
    

    // Handle edit
    const handleEdit = (permission) => {
        setCurrentData({
            id: permission.id,
            name: permission.name,
            guard_name: permission.guard_name,
        });
        setModalType('edit');
        setShowModal(true);
    };

    // Handle delete
    const handleDelete = async (id) => {
        confirmAlert({
            title: 'Are You Sure?',
            message: 'Want to delete this data?',
            buttons: [
                {
                    label: 'YES',
                    onClick: async () => {
                        await Api.delete(`api/permissions/${id}`);
                        toast.success("Data deleted successfully!");
                        fetchData();
                    }
                },
                {
                    label: 'NO',
                }
            ]
        });
    };

    // Handle add user button click
    const handleAddPermissionClick = () => {
        setCurrentData({
            id: null,
            name: '',
            guard_name: '',
        });
        setModalType('add');
        setShowModal(true);
    };

    // Update input values dynamically
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    

   
    const columns = [
        { name: 'Id', selector: row => row.id, sortable: true, width:"100px" },
        { name: 'Name', selector: row => row.name, sortable: true, width:"200px" },
        { name: 'Guard Name', selector: row => row.guard_name, sortable: true, },
        {
            name: 'Actions',
            cell: row => (
                <>
                    {/* <Button variant="primary" onClick={() => handleEdit(row)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(row.id)} className="ms-2">Delete</Button> */}
                    {hasPermission('permissions.edit') &&   <Button variant="primary" onClick={() => handleEdit(row)}>Edit</Button>}
                    {hasPermission('permissions.delete') &&   <Button variant="danger" onClick={() => handleDelete(row.id)} className="ms-2">Delete</Button> }
                    
                </>
            ),
        },
    ];

    // if (hasPermission('permissions.edit') || hasPermission('permissions.delete')) {
    //     columns.push({
    //         name: 'Actions',
    //         width: '250px',
    //         cell: row => (
    //             <>
    //                <Button variant="primary" onClick={() => handleEdit(row)}>Edit</Button>
    //                <Button variant="danger" onClick={() => handleDelete(row.id)} className="ms-2">Delete</Button>
    //             </>
    //         ),
    //     });
    // }

    // Custom styles for DataTable
    const customStyles = {
        rows: {
            style: {
                backgroundColor: '#f2f2f2',
                '&:nth-of-type(odd)': { backgroundColor: '#e6e6e6' },
                fontSize: '14px',
                color: '#333',
            },
        },
        headCells: {
            style: {
                backgroundColor: '#0e0f65',
                fontSize: '16px',
                color: 'white',
            },
        },
    };

    return (
        <React.Fragment>
           <div className="containers mt-4 mb-5">
            <div className="mb-3">
                <Form.Control type="text" placeholder="Search by name" value={search} onChange={handleSearch} />
                {/* {currentUser && currentUser.roles.includes('super_admin') && (
                    <Button variant="primary" className="mt-3" onClick={handleAddPermissionClick}>Add Permission</Button>
                )} */}

            {hasPermission('permissions.create') &&    <Button variant="primary" className="mt-3" onClick={handleAddPermissionClick}>Add Permission</Button>}
            </div>

            <DataTable columns={columns} customStyles={customStyles} data={filteredData} pagination />

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalType === 'add' ? 'Add Permission' : 'Edit Permission'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="name" 
                                value={currentData.name} 
                                onChange={(e) => setCurrentData({ ...currentData, name: e.target.value })} 
                                required 
                            />
                        </Form.Group>
                       
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave}>{modalType === 'add' ? 'Add' : 'Save'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
        </React.Fragment>
    );
}

export default ListPermissions;
