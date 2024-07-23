import React, {useState, useEffect, Children} from "react";
import { NavDropdown } from "react-bootstrap";
import Sidebar from "./sidebar";
import { useNavigate, Link } from "react-router-dom";
import WarehouseIcon from '@mui/icons-material/Warehouse';

const AdminLayout = ({children}) => {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const navigate = useNavigate();

    const sidebarToggleHandler = (e) => {
        e.preventDefault();

        if(!sidebarToggle) {
            //add class on body
            document.body.classList.add('sb-sidenav-toggled');

            //set state "sidebarToggle" to true
            setSidebarToggle(true);
        } else {

            //remove class on body
            document.body.classList.remove('sb-sidenav-toggled');

            //set state "sidebarToggle" to false
            setSidebarToggle(false);
        }
    }

    return (
        <React.Fragment>
            <React.Fragment>
    <div className="d-flex sb-sidenav-toggled" id="wrapper">
        <div className="bg-white transparent-background" id="sidebar-wrapper">
            <div className="sidebar-heading bg-light text-center transparent-background" onClick={() => navigate("/")}>
                <strong>Distribution Center</strong>
                <br/>
                <WarehouseIcon/>
            </div>
            
            <Sidebar />
        </div>
        <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-light transparent-background">
                <div className="container-fluid transparent-background">
                    <button className="btn btn-success-dark toggle-btn" onClick={sidebarToggleHandler}><i className="fa fa-list-ul"></i></button>
                    <div className="mobile responsive-navbar-nav transparent-background" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mt-2 mt-lg-0 transparent-background">
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container-fluid transparent-background">
                {children}
            </div>
        </div>
    </div>
</React.Fragment>


        </React.Fragment>
    )
}
export default AdminLayout;