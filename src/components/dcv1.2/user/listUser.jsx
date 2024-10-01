import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Api from "../../../api";
import toast from "react-hot-toast";
import { Modal, Button, Form } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

function ListUser() {
    const [users, setUsers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [currentUser, setCurrentUser] = useState(null); 
    const [currentData, setCurrentData] = useState({
        id: null,
        name: '',
        email: '',
        id_branch:'',
        name_branch:'',
        password: '',
        password_confirmation: '',
        role: ''
    });

    // Function to fetch user data
    const fetchData = async () => {
        try {
            const response = await Api.get('api/getuser');
            setUsers(response.data.data);
            setFilteredData(response.data.data);
            const user = response.data.data;
            console.log('fetchuser :', user);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to fetch current logged-in user data
    const fetchCurrentUser = async () => {
        try {
            const response = await Api.get('api/getcurrentuser'); // Pastikan endpoint ini benar
            setCurrentUser(response.data.data); // Menyimpan data pengguna yang sedang login

            console.log(response.data.data)
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchCurrentUser(); // Memanggil API untuk mengambil data pengguna yang sedang login
    }, []);

    // Handle saving user (Add or Edit)
    const handleSave = async () => {
        if (!currentData.name || !currentData.email || !currentData.role) {
            toast.error("Please fill in all required fields!");
            return;
        }

        try {
            if (modalType === 'add') {
                await Api.post('api/createuser', {
                    name: currentData.name,
                    email: currentData.email,
                    id_branch: currentData.id_branch,
                    name_branch: currentData.name_branch,
                    password: currentData.password,
                    password_confirmation: currentData.password_confirmation,
                    role: currentData.role
                });
                toast.success("User added successfully!");
            } else {
                await Api.put(`api/updateuser/${currentData.id}`, {
                    name: currentData.name,
                    email: currentData.email,
                    id_branch: currentData.id_branch,
                    name_branch: currentData.name_branch,
                    password: currentData.password,
                    password_confirmation: currentData.password_confirmation,
                    role: currentData.role
                });
                toast.success("User updated successfully!");
            }

            fetchData(); // Refresh data after save
            setShowModal(false);
        } catch (error) {
            toast.error("Failed to save data!");
        }
    };

    // Handle search/filter
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);
        const filtered = users.filter((user) => user.name.toLowerCase().includes(value));
        setFilteredData(filtered);
    };

    // Handle edit user
    const handleEdit = (user) => {
        setCurrentData({
            id: user.id,
            name: user.name,
            email: user.email,
            id_branch: user.id_branch,
            name_branch: user.name_branch,
            password: '',
            password_confirmation: '',
            role: getRoles(user.roles) // Assuming you handle roles in the backend
        });
        setModalType('edit');
        setShowModal(true);
    };

    // Handle delete user
    const handleDelete = async (id) => {
        try {
            await Api.delete(`api/deleteuser/${id}`);
            toast.success("User deleted successfully!");
            fetchData(); // Refresh data after delete
        } catch (error) {
            toast.error("Failed to delete data!");
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle add user click
    const handleAddUserClick = () => {
        setCurrentData({
            id: null,
            name: '',
            email: '',
            id_branch:'',
            name_branch:'',
            password: '',
            password_confirmation: '',
            role: ''
        });
        setModalType('add');
        setShowModal(true);
    };

    // Convert roles array to string
    const getRoles = (roles) => {
        return roles.length > 0 ? roles.map(role => role.name).join(', ') : 'No Role';
    };


    const columns = [
        
            { name: 'Name', selector: row => row.name, sortable: true },
            { name: 'Email', selector: row => row.email, sortable: true },
            { name: 'Branch', selector: row => row.name_branch, sortable: true, width: '250px'},
            { 
                name: 'Role', 
                selector: row => getRoles(row.roles), 
                sortable: true 
            },
            { 
                name: 'Actions', 
                cell: row => (
                    <>
                        <Button variant="primary" onClick={() => handleEdit(row)}>
                            Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(row.id)} className="ms-2">
                            Delete
                        </Button>
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
                <div className="mb-3">
                    <Form.Control 
                        type="text" 
                        placeholder="Search by name" 
                        value={search} 
                        onChange={handleSearch} 
                    />

                   
                    {currentUser && currentUser.roles.includes('admin') && (
                        <Button 
                            variant="primary" 
                            className="mt-3"
                            onClick={handleAddUserClick}
                        >
                            Add User
                        </Button>
                    )}
                </div>

                <DataTable
                    columns={columns}
                    customStyles={customStyles}
                    data={filteredData}
                    pagination
                />

                {/* Modal for Add/Edit User */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalType === 'add' ? 'Add User' : 'Edit User'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="name"
                                    value={currentData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter user name" 
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    name="email"
                                    value={currentData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter user email" 
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Id Branch</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="id_branch"
                                    value={currentData.id_branch}
                                    onChange={handleInputChange}
                                    placeholder="Enter ID Branch" 
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name Branch</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="name_branch"
                                    value={currentData.name_branch}
                                    onChange={handleInputChange}
                                    placeholder="Enter Name Branch" 
                                    required
                                />
                            </Form.Group>
                            
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            name="password"
                                            value={currentData.password}
                                            onChange={handleInputChange}
                                            placeholder="Enter password" 
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            name="password_confirmation"
                                            value={currentData.password_confirmation}
                                            onChange={handleInputChange}
                                            placeholder="Confirm password" 
                                            required
                                        />
                                    </Form.Group>
                            
                            <Form.Group>
                                <Form.Label>Role</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    name="role"
                                    value={currentData.role}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="inbound">Inbound</option>
                                    {/* Add other roles as needed */}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </React.Fragment>
    );
}

export default ListUser;

// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import Api from "../../../api";
// import toast from "react-hot-toast";
// import { Modal, Button, Form } from 'react-bootstrap';
// import 'react-datepicker/dist/react-datepicker.css';

// function ListUser() {
//     const [users, setUsers] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [search, setSearch] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [modalType, setModalType] = useState('add');
//     const [currentUser, setCurrentUser] = useState(null); 
//     const [currentData, setCurrentData] = useState({
//         id: null,
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//         role: ''
//     });

//     // Function to fetch user data
//     const fetchData = async () => {
//         try {
//             const response = await Api.get('api/getuser');
//             setUsers(response.data.data);
//             setFilteredData(response.data.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     // Function to fetch current logged-in user data
//     const fetchCurrentUser = async () => {
//         try {
//             const response = await Api.get('api/getcurrentuser'); // Pastikan endpoint ini benar
//             setCurrentUser(response.data.data); // Menyimpan data pengguna yang sedang login
//         } catch (error) {
//             console.error('Error fetching current user:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//         fetchCurrentUser(); // Memanggil API untuk mengambil data pengguna yang sedang login
//     }, []);

//     // Handle saving user (Add or Edit)
//     const handleSave = async () => {
//         if (!currentData.name || !currentData.email || !currentData.role) {
//             toast.error("Please fill in all required fields!");
//             return;
//         }

//         try {
//             if (modalType === 'add') {
//                 await Api.post('api/createuser', {
//                     name: currentData.name,
//                     email: currentData.email,
//                     password: currentData.password,
//                     password_confirmation: currentData.password_confirmation,
//                     role: currentData.role
//                 });
//                 toast.success("User added successfully!");
//             } else if (modalType === 'edit') {
//                 const updateData = {
//                     name: currentData.name,
//                     email: currentData.email,
//                     role: currentData.role
//                 };
//                 // Include password only if it's provided
//                 if (currentData.password) {
//                     updateData.password = currentData.password;
//                     updateData.password_confirmation = currentData.password_confirmation;
//                 }
//                 await Api.put(`api/updateuser/${currentData.id}`, updateData);
//                 toast.success("User updated successfully!");
//             }

//             fetchData(); // Refresh data after save
//             setShowModal(false);
//         } catch (error) {
//             toast.error("Failed to save data!");
//         }
//     };

//     // Handle search/filter
//     const handleSearch = (event) => {
//         const value = event.target.value.toLowerCase();
//         setSearch(value);
//         const filtered = users.filter((user) => user.name.toLowerCase().includes(value));
//         setFilteredData(filtered);
//     };

//     // Handle edit user
//     const handleEdit = (user) => {
//         setCurrentData({
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             password: '',
//             password_confirmation: '',
//             role: getRoles(user.roles) // Assuming you handle roles in the backend
//         });
//         setModalType('edit');
//         setShowModal(true);
//     };

//     // Handle delete user
//     const handleDelete = async (id) => {
//         try {
//             await Api.delete(`api/deleteuser/${id}`);
//             toast.success("User deleted successfully!");
//             fetchData(); // Refresh data after delete
//         } catch (error) {
//             toast.error("Failed to delete data!");
//         }
//     };

//     // Handle input change
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setCurrentData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     // Handle add user click
//     const handleAddUserClick = () => {
//         setCurrentData({
//             id: null,
//             name: '',
//             email: '',
//             password: '',
//             password_confirmation: '',
//             role: ''
//         });
//         setModalType('add');
//         setShowModal(true);
//     };

//     // Convert roles array to string
//     const getRoles = (roles) => {
//         return roles.length > 0 ? roles.map(role => role.name).join(', ') : 'No Role';
//     };

//     return (
//         <React.Fragment>
//             <div className="containers mt-4 mb-5">
//                 <div className="mb-3">
//                     <Form.Control 
//                         type="text" 
//                         placeholder="Search by name" 
//                         value={search} 
//                         onChange={handleSearch} 
//                     />

//                     {currentUser && currentUser.roles.includes('admin') && (
//                         <Button 
//                             variant="primary" 
//                             className="mt-3"
//                             onClick={handleAddUserClick}
//                         >
//                             Add User
//                         </Button>
//                     )}
//                 </div>

//                 <DataTable
//                     columns={[
//                         { name: 'Name', selector: row => row.name, sortable: true },
//                         { name: 'Email', selector: row => row.email, sortable: true },
//                         { 
//                             name: 'Role', 
//                             selector: row => getRoles(row.roles), 
//                             sortable: true 
//                         },
//                         { 
//                             name: 'Actions', 
//                             cell: row => (
//                                 <>
//                                     <Button variant="primary" onClick={() => handleEdit(row)}>
//                                         Edit
//                                     </Button>
//                                     <Button variant="danger" onClick={() => handleDelete(row.id)} className="ms-2">
//                                         Delete
//                                     </Button>
//                                 </>
//                             ) 
//                         }
//                     ]}
//                     data={filteredData}
//                     pagination
//                 />

//                 {/* Modal for Add/Edit User */}
//                 <Modal show={showModal} onHide={() => setShowModal(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>{modalType === 'add' ? 'Add User' : 'Edit User'}</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Form>
//                             <Form.Group>
//                                 <Form.Label>Name</Form.Label>
//                                 <Form.Control 
//                                     type="text" 
//                                     name="name"
//                                     value={currentData.name}
//                                     onChange={handleInputChange}
//                                     placeholder="Enter user name" 
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group>
//                                 <Form.Label>Email</Form.Label>
//                                 <Form.Control 
//                                     type="email" 
//                                     name="email"
//                                     value={currentData.email}
//                                     onChange={handleInputChange}
//                                     placeholder="Enter user email" 
//                                     required
//                                 />
//                             </Form.Group>
//                             {(modalType === 'add' || (modalType === 'edit' && currentData.password)) && (
//                                 <>
//                                     <Form.Group>
//                                         <Form.Label>Password</Form.Label>
//                                         <Form.Control 
//                                             type="password" 
//                                             name="password"
//                                             value={currentData.password}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter password" 
//                                             required={modalType === 'add'} // Password is required when adding a user
//                                         />
//                                     </Form.Group>
//                                     <Form.Group>
//                                         <Form.Label>Confirm Password</Form.Label>
//                                         <Form.Control 
//                                             type="password" 
//                                             name="password_confirmation"
//                                             value={currentData.password_confirmation}
//                                             onChange={handleInputChange}
//                                             placeholder="Confirm password" 
//                                             required={modalType === 'add'} // Password confirmation is required when adding a user
//                                         />
//                                     </Form.Group>
//                                 </>
//                             )}
//                             <Form.Group>
//                                 <Form.Label>Role</Form.Label>
//                                 <Form.Control 
//                                     as="select" 
//                                     name="role"
//                                     value={currentData.role}
//                                     onChange={handleInputChange}
//                                     required
//                                 >
//                                     <option value="">Select Role</option>
//                                     <option value="admin">Admin</option>
//                                     <option value="user">User</option>
//                                     <option value="inbound">Inbound</option>
//                                     {/* Add other roles as needed */}
//                                 </Form.Control>
//                             </Form.Group>
//                         </Form>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowModal(false)}>
//                             Close
//                         </Button>
//                         <Button variant="primary" onClick={handleSave}>
//                             Save Changes
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         </React.Fragment>
//     );
// }

// export default ListUser;
