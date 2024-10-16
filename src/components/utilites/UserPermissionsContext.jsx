import React, { createContext, useContext, useEffect, useState } from 'react';
import Api from '../../api';
import toast from 'react-hot-toast';

const UserPermissionsContext = createContext();

export const UserPermissionsProvider = ({ children }) => {
    const [userPermissions, setUserPermissions] = useState([]);

    const fetchUserPermissions = async () => {
        try {
            const response = await Api.get('/api/userpermission');
            setUserPermissions(response.data.permissions);
        } catch (error) {
            console.error('Error fetching permissions', error);
           // toast.error("Gagal mengambil izin pengguna");
        }
    };

    useEffect(() => {
        fetchUserPermissions();
    }, []);

    return (
        <UserPermissionsContext.Provider value={{ userPermissions }}>
            {children}
        </UserPermissionsContext.Provider>
    );
};

export const useUserPermissions = () => {
    const context = useContext(UserPermissionsContext);
    if (!context) {
        throw new Error('useUserPermissions harus digunakan dalam UserPermissionsProvider');
    }
    return context;
};
