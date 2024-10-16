import { useEffect } from 'react';

import Cookies from 'js-cookie';
import Api from '../../api';

const GlobalBeforeUnloadListener = () => {
    const accessToken = Cookies.get('access_token');

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // Lakukan aksi yang diperlukan, misalnya panggil API logout
            Api.post("/api/logout", {}, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                console.log('Logout response:', response);
                if (response.status === 200) { // Periksa status respons
                    // Hapus token dari Cookies
                    Cookies.remove("access_token");
                    Cookies.remove("refresh_token");
                }
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });

            // Optional: Tampilkan dialog konfirmasi sebelum pengguna menutup tab/browser
            event.preventDefault();
            event.returnValue = ''; // Ini diperlukan untuk memunculkan prompt di browser lama
        };

        // Tambahkan event listener `beforeunload`
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup listener saat komponen di-unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [accessToken]);

    return null; // Tidak ada output visual dari komponen ini
};

export default GlobalBeforeUnloadListener;
