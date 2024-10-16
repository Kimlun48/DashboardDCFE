// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import Api from "../../../api";
// import toast from "react-hot-toast";
// import { Modal, Button, Form } from 'react-bootstrap';
// import { confirmAlert } from 'react-confirm-alert';


// function ListRole() {
//     const [permissions, setPermissions] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [search, setSearch] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [modalType, setModalType] = useState('add');
//     const [currentUser, setCurrentUser] = useState(null); 
//     const [currentData, setCurrentData] = useState({
//         id: null,
//         name: '',
//         Permissions: '',
//     });

//     const fetchData = async () => {
//         try {
//             const response = await Api.get('api/roles');
//             setPermissions(response.data.data);
//             setFilteredData(response.data.data);
//         } catch (error) {
//             console.error('Error fetching permissions:', error);
//             toast.error("Failed to fetch permissions data.");
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleSearch = (event) => {
//         const value = event.target.value.toLowerCase();
//         setSearch(value);
//         const filtered = permissions.filter((permission) => 
//             permission.name.toLowerCase().includes(value)
//         );
//         setFilteredData(filtered);
//     };

//     const columns = [
//         { name: 'Id', selector: row => row.id, sortable: true, width :'100px' },
//         { name: 'Role Name', selector: row => row.name, sortable: true , width :'150px'},
//         {
//             name: 'Permissions',
//             selector: row => row.permissions.map(permission => permission.name).join(', '),
//             sortable: true, width:'500px',
//             cell: row => (
//                 <div>
//                     {row.permissions.map((permission, index) => (
//                         <span className="btn btn-success btn-sm shadow-sm border-0 ms-2 mb-2" key={index}>
//                             {permission.name}
//                         </span>
//                     ))}
//                 </div>
//             ),
//         } ,
//         {
//             name: 'Actions',width :'250px',
//             cell: row => (
//                 <>
//                     <Button variant="primary" onClick={() => handleEdit(row)}>Edit</Button>
//                     <Button variant="danger" onClick={() => handleDelete(row.id)} className="ms-2">Delete</Button>
//                 </>
//             ),
//         },
//     ];

//     return (
//         <div className="containers mt-4 mb-5 data-table-container">
//             <div className="mb-3">
//                 <Form.Control type="text" placeholder="Search by name" value={search} onChange={handleSearch} />
//                 <Button variant="primary" className="mt-3">Add Role</Button>
//             </div>
//             <DataTable 
//                 columns={columns} 
//                 data={filteredData} 
//                 pagination 
//                 customStyles={{
//                     rows: {
//                         style: {
//                             backgroundColor: '#f2f2f2',
//                             '&:nth-of-type(odd)': { backgroundColor: '#e6e6e6' },
//                             fontSize: '14px',
//                             color: '#333',
//                         },
//                     },
//                     headCells: {
//                         style: {
//                             backgroundColor: '#0e0f65',
//                             fontSize: '16px',
//                             color: 'white',
//                         },
//                     },
//                 }} 
//             />
//         </div>
//     );
// }

// export default ListRole;

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Api from "../../../api";
import toast from "react-hot-toast";
import { Modal, Button, Form } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
// import { useUserPermissions } from "../../utilites/UserPermissionsContext";
import { useQuery } from "@tanstack/react-query";

function ListRole() {
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [currentRole, setCurrentRole] = useState({
        id: null,
        name: '',
        permissions: [],
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
            const roleResponse = await Api.get('api/roles');
            const permissionResponse = await Api.get('api/permissions');
            setRoles(roleResponse.data.data);
            setFilteredData(roleResponse.data.data);
            setPermissions(permissionResponse.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error("Failed to fetch data.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);
        const filtered = roles.filter((role) => 
            role.name.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
    };

    const handleAdd = () => {
        setCurrentRole({ id: null, name: '', permissions: [] });
        setModalType('add');
        setShowModal(true);
    };

    const handleEdit = (role) => {
        setCurrentRole({ id: role.id, name: role.name, permissions: role.permissions.map(p => p.name) });
        setModalType('edit');
        setShowModal(true);
    };

   
    const handleDelete = async (id) => {
        confirmAlert({
            title: 'Are You Sure?',
            message: 'Want to delete this data?',
            buttons: [
                {
                    label: 'YES',
                    onClick: async () => {
                        await Api.delete(`api/roles/${id}`);
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

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const updatedPermissions = checked
            ? [...currentRole.permissions, value]
            : currentRole.permissions.filter(p => p !== value);
        setCurrentRole({ ...currentRole, permissions: updatedPermissions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = modalType === 'add' ? 'api/roles' : `api/roles/${currentRole.id}`;
        const method = modalType === 'add' ? Api.post : Api.put;
        try {
            await method(endpoint, { name: currentRole.name, permissions: currentRole.permissions });
            toast.success(`${modalType === 'add' ? 'Role added' : 'Role updated'} successfully`);
            setShowModal(false);
            fetchData();
        } catch (error) {
            toast.error(`Failed to ${modalType === 'add' ? 'add' : 'update'} role`);
        }
    };

    
    const columns = [
        { name: 'Id', selector: row => row.id, sortable: true, width: '100px' },
        { name: 'Role Name', selector: row => row.name, sortable: true, width: '150px' },
        {
            name: 'Permissions',
            selector: row => row.permissions.map(permission => permission.name).join(', '),
            sortable: true, 
            // width: '500px',
            cell: row => (
                <div>
                    {row.permissions.map((permission, index) => (
                        <span className="btn btn-success btn-sm shadow-sm border-0 ms-2 mb-2" key={index}>
                            {permission.name}
                        </span>
                    ))}
                </div>
            ),
        },

        {
            name: 'Actions',
            width: '200px',
            cell: row => (
                <>
                    {/* <Button variant="primary" onClick={() => handleEdit(row)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(row.id)} className="ms-2">Delete</Button> */}
                    {hasPermission('roles.edit') &&   <Button variant="primary" onClick={() => handleEdit(row)}>Edit</Button>}
                    {hasPermission('roles.delete') &&   <Button variant="danger" onClick={() => handleDelete(row.id)} className="ms-2">Delete</Button>}
                    
                </>
            ),
        },
    ];
    
   
    // if (hasPermission('roles.edit') || hasPermission('roles.delete')) {
    //     columns.push({
    //         name: 'Actions',
    //         width: '250px',
    //         cell: row => (
    //             <>
                   
                   
                    
    //                 {hasPermission('permissions.edit') &&    <Button variant="primary" onClick={() => handleEdit(row)}>Edit</Button>}
    //                 {hasPermission('permissions.delete') &&   <Button variant="danger" onClick={() => handleDelete(row.id)} className="ms-2">Delete</Button>}
    //             </>
    //         ),
    //     });
    // }
    

    return (
        <div className="containers mt-4 mb-5 data-table-container">
            <div className="mb-3">
                <Form.Control type="text" placeholder="Search by name" value={search} onChange={handleSearch} />
               
                {hasPermission('roles.create') &&    <Button variant="primary" className="mt-3" onClick={handleAdd}>Add Roles</Button>}
            </div>
            <DataTable 
                columns={columns} 
                data={filteredData} 
                pagination 
                customStyles={{
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
                }} 
            />
            
            {/* Modal for Add/Edit */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalType === 'add' ? 'Add Role' : 'Edit Role'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Role Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={currentRole.name} 
                                onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })} 
                                placeholder="Enter role name" 
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Permissions</Form.Label>
                            <div className="permissions-grid">
                                {permissions.map(permission => (
                                    <Form.Check 
                                        key={permission.id}
                                        type="checkbox"
                                        label={permission.name}
                                        value={permission.name}
                                        checked={currentRole.permissions.includes(permission.name)}
                                        onChange={handleCheckboxChange}
                                    />
                                ))}
                            </div>
                        </Form.Group>
                        <Button variant="success" type="submit">
                            {modalType === 'add' ? 'Add Role' : 'Save Changes'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ListRole;

