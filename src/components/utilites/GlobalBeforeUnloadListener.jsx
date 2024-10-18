import { useEffect } from 'react';

import Cookies from 'js-cookie';
import Api from '../../api';

const GlobalBeforeUnloadListener = () => {
    useEffect(() => {
        const handleLogoutOnClose = async () => {
          // Mengambil token dari cookies
          const accessToken = Cookies.get("access_token");
          const refreshToken = Cookies.get("refresh_token");
    
          if (accessToken && refreshToken) {
            try {
              // Memanggil API logout dengan mengirimkan access token di headers
              await Api.post('/api/logout', {}, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });
    
              // Hapus token dari cookies
              Cookies.remove("access_token");
              Cookies.remove("refresh_token");
            } catch (error) {
              console.error("Error during logout on close: ", error);
            }
          }
        };
    
        // Tambahkan event listener
        window.addEventListener("beforeunload", handleLogoutOnClose);
    
        // Bersihkan event listener ketika komponen unmount
        return () => {
          window.removeEventListener("beforeunload", handleLogoutOnClose);
        };
      }, []);
    
      return null;
    };


export default GlobalBeforeUnloadListener;
