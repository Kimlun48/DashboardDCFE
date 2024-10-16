import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Api from "../../../api";
import toast from "react-hot-toast";
import { Modal, Button, Form } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { confirmAlert } from 'react-confirm-alert';
// import { useUserPermissions } from "../../utilites/UserPermissionsContext";
import { useQuery } from "@tanstack/react-query";


function ListUser() {
    const [users, setUsers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [currentUser, setCurrentUser] = useState(null); 
    const [branch, setBranch] = useState([]);
    const [roles, setRoles] = useState ([]);
    const [currentData, setCurrentData] = useState({
        id: null,
        name: '',
        email: '',
        id_branch: '',
        name_branch: '',
        password: '',
        password_confirmation: '',
        role: ''
    });
   
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


    const fetchDataRoles = async () => {
        try {
            const response = await Api.get('/api/getrole');
            setRoles(response.data.data);
        } catch (error) {
            console.error('Error fetching branch data:', error);
        }
    }

    useEffect(() => {
        fetchDataRoles();
    },[]);

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

    const fetchData = async () => {
        try {
            const response = await Api.get('api/getuser');
            setUsers(response.data.data);
            setFilteredData(response.data.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
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

    const handleSave = async () => {
        if (!currentData.name || !currentData.email || !currentData.role) {
            toast.error("Please fill in all required fields!");
            return;
        }
    
        try {
            if (modalType === 'add') {
                await Api.post('api/createuser', currentData);
                toast.success("User added successfully!");
            } else {
                await Api.put(`api/updateuser/${currentData.id}`, currentData);
                toast.success("User updated successfully!");
            }
            fetchData();
            setShowModal(false);
        } catch (error) {
            // Cek apakah error memiliki respons dan ambil pesan kesalahan dari backend
            const errorMessage = error.response?.data?.message || "Failed to save data!";
            toast.error(errorMessage);
        }
    };
    

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);
        const filtered = users.filter((user) => user.name.toLowerCase().includes(value));
        setFilteredData(filtered);
    };

    const handleEdit = (user) => {
        setCurrentData({
            id: user.id,
            name: user.name,
            email: user.email,
            id_branch: user.id_branch,
            name_branch: user.name_branch,
            password: '',
            password_confirmation: '',
            role: getRoles(user.roles)
        });
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
                        await Api.delete(`api/deleteuser/${id}`);
                        toast.success("Data Deleted Successfully!");
                        fetchData();
                    }
                },
                {
                    label: 'NO',
                }
            ]
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Ketika name_branch dipilih, otomatis isi id_branch yang terkait
        if (name === 'name_branch') {
            const selectedBranch = branch.find(b => b.PrcName === value);
            if (selectedBranch) {
                setCurrentData(prevState => ({
                    ...prevState,
                    name_branch: selectedBranch.PrcName,
                    id_branch: selectedBranch.PrcCode  // Isi id_branch otomatis
                }));
            }
        } else {
            setCurrentData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleAddUserClick = () => {
        setCurrentData({
            id: null,
            name: '',
            email: '',
            id_branch: '',
            name_branch: '',
            password: '',
            password_confirmation: '',
            role: ''
        });
        setModalType('add');
        setShowModal(true);
    };

    const getRoles = (roles) => {
        return roles.length > 0 ? roles.map(role => role.name).join(', ') : 'No Role';
    };

    const columns = [
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Email', selector: row => row.email, sortable: true },
        { name: 'Branch', selector: row => row.name_branch, sortable: true, width: '250px' },
        { name: 'Role', selector: row => getRoles(row.roles), sortable: true },
        { name: 'Actions', cell: row => (
            <>
                {hasPermission('users.edit') && <Button variant="primary" onClick={() => handleEdit(row)}>Edit</Button>}
                {hasPermission('users.delete') && <Button variant="danger" onClick={() => handleDelete(row.id)} className="ms-2">Delete</Button>}
            </>
        )}
        
    ];
    // if (hasPermission('users.edit') || hasPermission('users.delete')) {
    //     columns.push({
    //         name: 'Actions',
    //         width: '250px',
    //         cell: row => (
    //             <>
    //                 {/* {hasPermission('roles.edit') && <Button variant="primary" onClick={() => handleEdit(row)}>Edit</Button>}
    //                 {hasPermission('roles.delete') && <Button variant="danger" onClick={() => handleDelete(row.id)} className="ms-2">Delete</Button>} */}
    //                <Button variant="primary" onClick={() => handleEdit(row)}>Edit</Button>
    //                <Button variant="danger" onClick={() => handleDelete(row.id)} className="ms-2">Delete</Button>
    //             </>
    //         ),
    //     });
    // }

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
                    {currentUser && currentUser.roles.includes('super_admin') && (
                        <Button variant="primary" className="mt-3" onClick={handleAddUserClick}>Add User</Button>
                    )}
                </div>

                <DataTable columns={columns} customStyles={customStyles} data={filteredData} pagination />

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalType === 'add' ? 'Add User' : 'Edit User'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" name="name" value={currentData.name} onChange={handleInputChange} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={currentData.email} onChange={handleInputChange} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Id Branch</Form.Label>
                                <Form.Control type="text" name="id_branch" value={currentData.id_branch} onChange={handleInputChange} disabled />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name Branch</Form.Label>
                                <Form.Control as="select" name="name_branch" value={currentData.name_branch} onChange={handleInputChange} required>
                                    <option value="" disabled>Choose Nama Branch</option>
                                    {branch.map(option => <option key={option.PrcCode} value={option.PrcName}>{option.PrcName}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={currentData.password} onChange={handleInputChange} placeholder ="password" required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name="password_confirmation" value={currentData.password_confirmation} onChange={handleInputChange} placeholder ="confirm_password"required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Role</Form.Label>
                                <Form.Control as="select" name="role" value={currentData.role} onChange={handleInputChange} required>
                                    {/* <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="user_inbound">Inbound</option>
                                    <option value="user_storage">Storage</option>
                                    <option value="user_outbound">Outbound</option> */}
                                    {/* Add other roles as needed */}
                                    <option value="" disabled>Choose Role</option>
                                    {roles.map(option => <option key={option.id} value={option.name}>{option.name}</option>)}
                                </Form.Control>
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

export default ListUser;