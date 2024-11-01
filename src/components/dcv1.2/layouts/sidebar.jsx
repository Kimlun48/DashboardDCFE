

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import InputIcon from '@mui/icons-material/Input';
import StorageIcon from '@mui/icons-material/Storage';
import OutputIcon from '@mui/icons-material/Output';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CancelPresentationSharpIcon from '@mui/icons-material/CancelPresentationSharp';
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Api from "../../../api";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import { useUserPermissions } from "../../utilites/UserPermissionsContext";
import { useQuery } from "@tanstack/react-query";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const [user, setUser] = useState({});
    const [dropdowns, setDropdowns] = useState({
        reports: false,
        subReports: false,
        subReports2: false,
        subReports3: false,
        logistics:false,
        subLogistics:false
    });
    const token = Cookies.get('access_token');
    const { data: userPermissions = [], isLoading } = useQuery({
        queryKey: ['permissions'], 
        queryFn: async () => {
            const response = await Api.get('/api/userpermission');
            return response.data.permissions;
        },
        cacheTime: 10 * 60 * 1000, 
        staleTime: 30000, 
    });
    const [currentUser, setCurrentUser] = useState(null); 

    const fetchCurrentUser = async () => {
        try {
            const response = await Api.get('api/getcurrentuser');
            setCurrentUser(response.data.data);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    useEffect(() => {
       
        fetchCurrentUser();
    }, []);

    const fetchData = async () => {
        try {
            const response = await Api.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchData();
      
    }, [token]);
    const handleLogout = async () => {
        try {
            
            const response = await Api.post("/api/logout");
        
            if (response.status === 200) {
                Cookies.remove("access_token");
                Cookies.remove("refresh_token");
    
               
                navigate("/");
    
                
                toast.success("Logout Successfully.", {
                    duration: 4000,
                    position: "top-right",
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            }
        } catch (error) {
            console.error("Error during logout", error);
            toast.error("Logout Failed.", {
                duration: 4000,
                position: "top-right",
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
    
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            navigate("/");
        }
    };

    const handleRadioChange = (path, dropdownName) => {
        navigate(path);
        setDropdowns({
            reports: dropdownName === 'reports',
            subReports: dropdownName === 'subReports',
            subReports2: dropdownName === 'subReports2',
            subReports3: dropdownName === 'subReports3',
            logistic : dropdownName === 'logistics',
            subLogistics:dropdownName === 'subLogistics',

        });
    };

    const toggleDropdown = (name) => {
        setDropdowns(prev => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    useEffect(() => {
        setDropdowns(prev => ({
            reports: pathname.includes("inbound") || pathname.includes("storage") || pathname.includes("outbound"),
            subReports: pathname.includes("inbound"),
            subReports2: pathname.includes("storage"),
            subReports3: pathname.includes("outbound"),
            logistics: pathname.includes("inbound") || pathname.includes("storage") || pathname.includes("outbound"),
            
        }));
    }, [pathname]);

    const isAdmin = user.name === 'admin';
    const isSuperAdmin = user.name ==='superadmin';

    const hasPermission = (permission) => {
        return userPermissions.includes(permission);
    }; 

    const changeOffline = async (id) => {
        try {
            await Api.put(`api/update_status_offline/${id}`);
           // toast.success("User status offline successfuly");
            fetchData();
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to save data!";
           // toast.error(errorMessage);
        }
    }
    useEffect(() => {
        // Fungsi yang akan dijalankan ketika browser ditutup atau di-refresh
        const handleBrowserClose = async (event) => {
            event.preventDefault();
            if (currentUser && currentUser.id) {
                try {
                    await changeOffline(currentUser.id);  // Memanggil fungsi changeOffline
                } catch (error) {
                    console.error("Failed to set user offline:", error);
                }
            }
        };
    
        // Menambahkan event listener untuk beforeunload
        window.addEventListener('beforeunload', handleBrowserClose);
    
        // Membersihkan event listener saat komponen di-unmount
        return () => {
            window.removeEventListener('beforeunload', handleBrowserClose);
        };
    }, [currentUser]);  // Menjalankan ketika currentUser berubah

    return (
        <React.Fragment>
            <div className="sidebar">
                <div className="side-dash">
            <Link className={`list-group-item list-group-item-action  p-3 `} to="/admin/dashboard">
                <DashboardIcon className="me-2 custom-icon" />Dashboard
            </Link>
            </div>
            <div className="side-report">
            
                <div className="list-group-item list-group-item-action list-group-item-light p-3 transparent-background">
                    <div onClick={() => toggleDropdown('reports')} className="d-flex justify-content-between align-items-center">
                        <span><LibraryBooksIcon className="me-2 custom-icon" />Report</span>
                        <i className={`fa fa-chevron-${dropdowns.reports ? 'up' : 'down'}`}></i>
                    </div>
                    
                        <div className={`dropdown-content ${dropdowns.reports ? 'show' : ''}`}>
                        {hasPermission('reports.inbound')  && (
                            
                                <div className="list-group-item list-group-item-action list-group-item-light p-3 transparent-background">
                                <div onClick={() => toggleDropdown('subReports')} className="d-flex justify-content-between align-items-center">
                               
                                    <span><InputIcon className="me-2 custom-icon" /> Inbound</span>
                                    <i className={`fa fa-chevron-${dropdowns.subReports ? 'up' : 'down'}`}></i>
                                </div>
                                <div className={`dropdown-content ${dropdowns.subReports ? 'show' : ''}`}>
                                    <form>
                                        <div className="form-check custom-radio mb-2" key="grporeport">
                                            <input className="form-check-input" type="radio" name="inboundOptions" id="grporeport" checked={pathname.includes("grporeport")} onChange={() => handleRadioChange("/admin/inbound/grporeport", 'subReports')} />
                                            <label className="form-check-label" htmlFor="grporeport">Goods Receipt PO</label>
                                        </div>
                                        <div className="form-check custom-radio mb-2" key="itrin">
                                            <input className="form-check-input" type="radio" name="inboundOptions" id="itrin" checked={pathname.includes("itrin")} onChange={() => handleRadioChange("/admin/inbound/itrinreport", 'subReports')} />
                                            <label className="form-check-label" htmlFor="itrin">Inventory Transfer Request IN</label>
                                        </div>
                                        <div className="form-check custom-radio mb-2" key="return">
                                            <input className="form-check-input" type="radio" name="inboundOptions" id="return" checked={pathname.includes("return")} onChange={() => handleRadioChange("/admin/inbound/returnreport", 'subReports')} />
                                            <label className="form-check-label" htmlFor="return">Return</label>
                                        </div>
                                        <div className="form-check custom-radio mb-2" key="crossdock">
                                            <input className="form-check-input" type="radio" name="inboundOptions" id="crossdock" checked={pathname.includes("crossdock")} onChange={() => handleRadioChange("/admin/inbound/crossdockreport", 'subReports')} />
                                            <label className="form-check-label" htmlFor="crossdock">Crossdock</label>
                                        </div>
                                        
                                    </form>
                                </div>
                            </div>
                        )}

                        {hasPermission('reports.storage')  && (
                            <div className="list-group-item list-group-item-action list-group-item-light p-3 transparent-background">
                                <div onClick={() => toggleDropdown('subReports2')} className="d-flex justify-content-between align-items-center">
                                    <span><StorageIcon className="me-2 custom-icon" /> Storage</span>
                                    <i className={`fa fa-chevron-${dropdowns.subReports2 ? 'up' : 'down'}`}></i>
                                </div>
                                 <div className={`dropdown-content ${dropdowns.subReports2 ? 'show' : ''}`}>
                                    <form>
                                        <div className="form-check custom-radio mb-2" key="cashpicking">
                                            <input className="form-check-input"
                                            type="radio" 
                                            name="storageOptions" 
                                            id="cashpicking" 
                                            checked={pathname.includes("cashpicking")} 
                                            onChange={() => handleRadioChange("/admin/storage/cashpicking", 'subReports2')} />
                                            <label className="form-check-label" htmlFor="cashpicking">Cash Picking</label>
                                         
                                        </div>
                                        <div className="form-check custom-radio mb-2" key="deliverypicking">
                                            <input className="form-check-input" type="radio" name="storageOptions" id="deliverypicking" checked={pathname.includes("deliverypicking")} onChange={() => handleRadioChange("/admin/storage/deliverypicking", 'subReports2')} />
                                            <label className="form-check-label" htmlFor="deliverypicking">Delivery Picking</label>
                                        </div>
                                        <div className="form-check custom-radio mb-2" key="putaway">
                                            <input className="form-check-input" type="radio" name="storageOptions" id="putaway" checked={pathname.includes("putaway")} onChange={() => handleRadioChange("/admin/storage/putaway", 'subReports2')} />
                                            <label className="form-check-label" htmlFor="putaway">Putaway</label>
                                        </div>
                                        <div className="form-check custom-radio mb-2" key="replenishment">
                                            <input className="form-check-input" type="radio" name="storageOptions" id="replenishment" checked={pathname.includes("replenishment")} onChange={() => handleRadioChange("/admin/storage/replenishment", 'subReports2')} />
                                            <label className="form-check-label" htmlFor="replenishment">Replenishment</label>
                                        </div>
                                        <div className="form-check custom-radio mb-2" key="listpicking">
                                            <input className="form-check-input" type="radio" name="storageOptions" id="listpicking" checked={pathname.includes("listpicking")} onChange={() => handleRadioChange("/admin/storage/listpicking", 'subReports2')} />
                                            <label className="form-check-label" htmlFor="listpicking">List Picking</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {hasPermission('reports.outbound') && (
                            <div className="list-group-item list-group-item-action list-group-item-light p-3 transparent-background">
                                <div onClick={() => toggleDropdown('subReports3')} className="d-flex justify-content-between align-items-center">
                                    <span><OutputIcon className="me-2 custom-icon" />Outbound</span>
                                    <i className={`fa fa-chevron-${dropdowns.subReports3 ? 'up' : 'down'}`}></i>
                                </div>
                                <div className={`dropdown-content ${dropdowns.subReports3 ? 'show' : ''}`}>
                                    <form>
                                        <div className="form-check custom-radio mb-2" key="arreserve">
                                            <input className="form-check-input" type="radio" name="outboundOptions" id="arreserve" checked={pathname.includes("arreserve")} onChange={() => handleRadioChange("/admin/outbound/arreservein", 'subReports3')} />
                                            <label className="form-check-label" htmlFor="arreserve">ArReserve</label>
                                        </div>
                                        <div className="form-check custom-radio mb-2" key="inventorytro">
                                            <input className="form-check-input" type="radio" name="outboundOptions" id="inventorytro" checked={pathname.includes("inventorytro")} onChange={() => handleRadioChange("/admin/outbound/inventorytro", 'subReports3')} />
                                            <label className="form-check-label" htmlFor="inventorytro">Itr Out</label>
                                        </div>
                                        <div className="form-check custom-radio mb-2" key="salesorder">
                                            <input className="form-check-input" type="radio" name="outboundOptions" id="salesorder" checked={pathname.includes("salesorder")} onChange={() => handleRadioChange("/admin/outbound/salesorder", 'subReports3')} />
                                            <label className="form-check-label" htmlFor="salesorder">Sales Order</label>
                                        </div>
                                        <div className="form-check custom-radio mb-2" key="notintegrated">
                                            <input className="form-check-input" type="radio" name="outboundOptions" id="notintegrated" checked={pathname.includes("notintegrated")} onChange={() => handleRadioChange("/admin/outbound/notintegrated", 'subReports3')} />
                                            <label className="form-check-label" htmlFor="notintegrated">Not Integrated</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                    
                </div>
            
            </div>


            <div className="side-report">
            
                <div className="list-group-item list-group-item-action list-group-item-light p-3 transparent-background">
                    <div onClick={() => toggleDropdown('logistics')} className="d-flex justify-content-between align-items-center">
                        <span><LocalShippingIcon className="me-2 custom-icon" />Shipment</span>
                        <i className={`fa fa-chevron-${dropdowns.logistics ? 'up' : 'down'}`}></i>
                    </div>
                    
                        <div className={`dropdown-content ${dropdowns.logistics ? 'show' : ''}`}>
                        {hasPermission('shipment.inbound.index') && (
                            
                                <div className="list-group-item list-group-item-action list-group-item-light p-3 transparent-background">
                                <div onClick={() => toggleDropdown('subLogistics')} className="d-flex justify-content-between align-items-center">
                               
                                    <span><InputIcon className="me-2 custom-icon" /> Inbound</span>
                                    <i className={`fa fa-chevron-${dropdowns.subLogistics ? 'up' : 'down'}`}></i>
                                </div>
                                <div className={`dropdown-content ${dropdowns.subLogistics ? 'show' : ''}`}>
                                    <form>
                                      
                                        <div className="form-check custom-radio mb-2" key="logistic">
                                            <input className="form-check-input" type="radio" name="logisticOptions" id="logistic" checked={pathname.includes("logistic")} onChange={() => handleRadioChange("/admin/inbound/logistic", 'subReports')} />
                                            <label className="form-check-label" htmlFor="logistic">Receiving</label>
                                        </div>
                                        
                                    </form>
                                </div>
                            </div>
                        )}

                    </div>
                    
                </div>
            
            </div>


            <div className="side-dash">
            {hasPermission('users.index')  && (
            <Link className={`list-group-item list-group-item-action  p-3 transparent-background`} to="/admin/user">
                <PersonIcon className="me-2 custom-icon" />User
            </Link>      
            )}
            </div>


           
            <div className="side-logout">
            <Link
                className={`list-group-item list-group-item-action list-group-item-light p-3 ${splitLocation[2] === "exit" ? "active" : ""} transparent-background`}
                to="/"
                onClick={handleLogout}
            >
                <CancelPresentationSharpIcon className="me-2 custom-icon" />Logout
            </Link>
            </div>
            </div>
        </React.Fragment>
    );
}

export default Sidebar;



