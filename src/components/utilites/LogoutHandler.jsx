// LogoutHandler.jsx
import React, { useEffect } from 'react';

const LogoutHandler = () => {
    useEffect(() => {
        // Fungsi untuk mengirim update status is_online ke false
        const handleLogoutOnClose = async () => {
            const payload = JSON.stringify({ is_online: false });
            console.log('Sending fetch to update is_online status to false');

            try {
                const response = await fetch('/api/update-status', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: payload,
                });

                if (response.ok) {
                    console.log('Status updated successfully');
                } else {
                    console.error('Failed to update status');
                }
            } catch (error) {
                console.error('Error sending fetch:', error);
            }
        };

        // Menambahkan event listener pada saat browser/tab ditutup
        window.addEventListener('beforeunload', handleLogoutOnClose);

        // Membersihkan event listener ketika component unmount
        return () => {
            window.removeEventListener('beforeunload', handleLogoutOnClose);
        };
    }, []);

    return null; // Komponen ini tidak perlu merender apa pun
};

export default LogoutHandler;
