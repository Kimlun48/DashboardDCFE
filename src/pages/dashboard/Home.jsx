import React from "react";


import { Card } from "react-bootstrap";
import LayoutAdmin from "../../layouts/Admin";

import { Link } from "react-router-dom";

import FooterDc from "../../components/footer";


function Home() {
    document.title = "Home";


    return(
        <React.Fragment>
          <LayoutAdmin>
           
          
          <Card className="card-home">
    <Card.Body className="d-flex justify-content-center align-items-center">
        <div className="row mt-4">
            <div className="col-12 col-lg-6 mb-4">
                <div className="card border-0 shadow-sm overflow-hidden">
                    <div className="card-body p-0 d-flex align-items-center">
                        <Link to="/inbound/chart" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="bg-primary py-4 px-5 mfe-3" style={{ width: "130px" }}>
                                <i className="fas fa fa-sign-in-alt fa-4x text-white"></i>
                            </div>
                            <div>
                                <div className="text-muted text-uppercase font-weight-bold small custom-storage-style">
                                    CHART INBOUND
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-6 mb-4">
                <div className="card border-0 shadow-sm overflow-hidden">
                    <div className="card-body p-0 d-flex align-items-center">
                        <Link to="/storage/chart" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="bg-primary py-4 px-5 mfe-3" style={{ width: "130px" }}>
                                <i className="fas fa fa-database fa-4x text-white"></i>
                            </div>
                            <div>
                                <div className="text-muted text-uppercase font-weight-bold small custom-storage-style">
                                    CHART STORAGE
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-6 mb-4">
                <div className="card border-0 shadow-sm overflow-hidden ">
                    <div className="card-body p-0 d-flex align-items-center">
                        <Link to="/outbound/chart" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="bg-primary py-4 px-5 mfe-3" style={{ width: "130px" }}>
                                <i className="fas fa fa-sign-out-alt fa-4x text-white"></i>
                            </div>
                            <div>
                                <div className="text-muted text-uppercase font-weight-bold small custom-storage-style">
                                    CHART OUTBOUND
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-6 mb-4">
                <div className="card border-0 shadow-sm overflow-hidden ">
                    <div className="card-body p-0 d-flex align-items-center">
                        <Link to="/dashboardstore" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="bg-primary py-4 px-5 mfe-3" style={{ width: "130px" }}>
                                <i className="fas fa fa-shopping-cart fa-4x text-white"></i>
                            </div>
                            <div>
                                <div className="text-muted text-uppercase font-weight-bold small custom-storage-style">
                                    DASHBOARD STORE
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </Card.Body>
</Card>
<FooterDc />
          
           </LayoutAdmin>
        </React.Fragment>
    )
}

export default Home