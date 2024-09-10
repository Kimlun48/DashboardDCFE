import { useEffect } from "react";
import Api from "../../api";

const LogoutOnClose = () => {
    useEffect(() => {
        const handleLogout = async () => {
            const token = Cookies.get('access_token');
            if (token) {
                try {
                    await Api.post("/api/logout", {}, {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("access_token")}`,
                        },
                    });
            
                    
                    Cookies.remove("access_token");
                    Cookies.remove("refresh_token");
                } catch (error) {
                    console.error('Logout failed:', error);
                }
            }
        };
        const handleBeforeUnload = (event) => {
            handleLogout();
            event.returnValue = ''; // Ini penting agar peringatan muncul pada beberapa browser
          };

          window.addEventListener('beforeunload', handleBeforeUnload);

          return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
          };
        
    }, []);
    return null;
    
};

export default LogoutOnClose;