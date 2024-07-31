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

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    const [dropdowns, setDropdowns] = useState({
        reports: false,
        subReports: false,
        subReports2: false,
        subReports3: false,
    });

    const handleLogout = (navigate) => {
        // Hapus token dari cookies
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
    
        // Arahkan pengguna ke halaman login
        navigate("/");
    
        // Display success toast (opsional)
        toast.success("Logout Successfully.", {
            duration: 4000,
            position: "top-right",
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    const handleRadioChange = (path, dropdownName) => {
        navigate(path);

        // Buka dropdown yang sesuai dan tutup dropdown lainnya
        setDropdowns({
            reports: dropdownName === 'reports',
            subReports: dropdownName === 'subReports',
            subReports2: dropdownName === 'subReports2',
            subReports3: dropdownName === 'subReports3',
        });
    };

    const toggleDropdown = (name) => {
        setDropdowns({
            ...dropdowns,
            [name]: !dropdowns[name],
        });
    };

    useEffect(() => {
        // Adjust dropdown and radio button status based on the current pathname
        if (pathname.includes("inbound")) {
            setDropdowns(prev => ({ ...prev, reports: true, subReports: true }));
        } else if (pathname.includes("storage")) {
            setDropdowns(prev => ({ ...prev, reports: true, subReports2: true }));
        } else if (pathname.includes("outbound")) {
            setDropdowns(prev => ({ ...prev, reports: true, subReports3: true }));
        } else {
            setDropdowns(prev => ({ ...prev, reports: false, subReports: false, subReports2: false, subReports3: false }));
        }
    }, [pathname]);

    return (
        <React.Fragment>
            <Link className={`list-group-item list-group-item-action list-group-item-light p-3 ${splitLocation[2] === "dashboard" ? "active" : ""} transparent-background`} to="/admin/dashboard">
                <DashboardIcon className="me-2" />Dashboard
            </Link>
            <div className="list-group-item list-group-item-action list-group-item-light p-3 transparent-background">
                <div onClick={() => toggleDropdown('reports')} className="d-flex justify-content-between align-items-center">
                    <span><BarChartRoundedIcon className="me-2" />Report</span>
                    <i className={`fa fa-chevron-${dropdowns.reports ? 'up' : 'down'}`}></i>
                </div>
                <div className={`dropdown-content ${dropdowns.reports ? 'show' : ''}`}>
                    <div className="list-group-item list-group-item-action list-group-item-light p-3 transparent-background">
                        <div onClick={() => toggleDropdown('subReports')} className="d-flex justify-content-between align-items-center">
                            <span><InputIcon className="me-2" /> Inbound</span>
                            <i className={`fa fa-chevron-${dropdowns.subReports ? 'up' : 'down'}`}></i>
                        </div>
                        <div className={`dropdown-content ${dropdowns.subReports ? 'show' : ''}`}>
                            <form>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="inboundOptions" id="grporeport" checked={pathname.includes("grporeport")} onChange={() => handleRadioChange("/admin/inbound/grporeport", 'subReports')} />
                                    <label className="form-check-label" htmlFor="grporeport">
                                        Goods Receipt PO
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="inboundOptions" id="itrin" checked={pathname.includes("itrin")} onChange={() => handleRadioChange("/admin/inbound/itrinreport", 'subReports')} />
                                    <label className="form-check-label" htmlFor="itrin">
                                        Inventory Transfer Request IN
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="inboundOptions" id="return" checked={pathname.includes("return")} onChange={() => handleRadioChange("/admin/inbound/returnreport", 'subReports')} />
                                    <label className="form-check-label" htmlFor="return">
                                        Return
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="inboundOptions" id="crossdock" checked={pathname.includes("crossdock")} onChange={() => handleRadioChange("/admin/inbound/crossdockreport", 'subReports')} />
                                    <label className="form-check-label" htmlFor="crossdock">
                                        Crossdock
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="list-group-item list-group-item-action list-group-item-light p-3 transparent-background">
                        <div onClick={() => toggleDropdown('subReports2')} className="d-flex justify-content-between align-items-center">
                            <span><StorageIcon className="me-2" /> Storage</span>
                            <i className={`fa fa-chevron-${dropdowns.subReports2 ? 'up' : 'down'}`}></i>
                        </div>
                        <div className={`dropdown-content ${dropdowns.subReports2 ? 'show' : ''}`}>
                            <form>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="storageOptions" id="cashpicking" checked={pathname.includes("cashpicking")} onChange={() => handleRadioChange("/admin/storage/cashpicking", 'subReports2')} />
                                    <label className="form-check-label" htmlFor="cashpicking">
                                        Cash Picking
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="storageOptions" id="deliverypicking" checked={pathname.includes("deliverypicking")} onChange={() => handleRadioChange("/admin/storage/deliverypicking", 'subReports2')} />
                                    <label className="form-check-label" htmlFor="deliverypicking">
                                        Delivery Picking
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="storageOptions" id="putaway" checked={pathname.includes("putaway")} onChange={() => handleRadioChange("/admin/storage/putaway", 'subReports2')} />
                                    <label className="form-check-label" htmlFor="putaway">
                                    Putaway 
                                    </label>
                                    </div>
                                {/* <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="storageOptions" id="putaway" checked={pathname.includes("putaway")} onChange={() => handleRadioChange("admin/storage/putaway", 'subReports2')} />
                                    <label className="form-check-label" htmlFor="putaway">
                                        Putaway
                                    </label>
                                </div> */}
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="storageOptions" id="replenishment" checked={pathname.includes("replenishment")} onChange={() => handleRadioChange("/admin/storage/replenishment", 'subReports2')} />
                                    <label className="form-check-label" htmlFor="replenishment">
                                        Replenishment
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="storageOptions" id="listpicking" checked={pathname.includes("listpicking")} onChange={() => handleRadioChange("/admin/storage/listpicking", 'subReports2')} />
                                    <label className="form-check-label" htmlFor="listpicking">
                                        List Picking
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="list-group-item list-group-item-action list-group-item-light p-3 transparent-background">
                        <div onClick={() => toggleDropdown('subReports3')} className="d-flex justify-content-between align-items-center">
                            <span><OutputIcon className="me-2" /> Outbound</span>
                            <i className={`fa fa-chevron-${dropdowns.subReports3 ? 'up' : 'down'}`}></i>
                        </div>
                        <div className={`dropdown-content ${dropdowns.subReports3 ? 'show' : ''}`}>
                            <form>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="outboundOptions" id="arreserve" checked={pathname.includes("arreserve")} onChange={() => handleRadioChange("/admin/outbound/arreservein", 'subReports3')} />
                                    <label className="form-check-label" htmlFor="arreserve">
                                        ArReserve
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="outboundOptions" id="inventorytro" checked={pathname.includes("inventorytro")} onChange={() => handleRadioChange("/admin/outbound/inventorytro", 'subReports3')} />
                                    <label className="form-check-label" htmlFor="inventorytro">
                                        Itr Out
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="outboundOptions" id="salesorder" checked={pathname.includes("salesorder")} onChange={() => handleRadioChange("/admin/outbound/salesorder", 'subReports3')} />
                                    <label className="form-check-label" htmlFor="salesorder">
                                        Sales Order
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Link className={`list-group-item list-group-item-action list-group-item-light p-3 ${splitLocation[2] === "exit" ? "active" : ""} transparent-background`} to="/">
                <CancelPresentationSharpIcon className="me-2" />Exit
            </Link> */}
            <Link
            className={`list-group-item list-group-item-action list-group-item-light p-3 ${splitLocation[2] === "exit" ? "active" : ""} transparent-background`}
            to="/"
            onClick={() => handleLogout(navigate)}
        >
            <CancelPresentationSharpIcon className="me-2" />Exit
        </Link>
        </React.Fragment>
    );
}

export default Sidebar;
