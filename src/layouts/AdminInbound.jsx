
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

export default function AdminLayout({ children }) {
  return (
    <React.Fragment>
      <div className="d-flex" id="wrapper">
        <div id="page-content-wrapper">
          <Navbar expand="lg" bg="light" className="bg-light-up fixed-top">
            <Container fluid>
              <Navbar.Toggle aria-controls="navbarSupportedContent" />
              <Navbar.Collapse id="navbarSupportedContent">
                <Nav className="me-auto mb-2 mb-lg-0">
                 
                    <Nav.Link as={Link} to="/homeinbound" className="fw-bold">HOME INBOUND</Nav.Link>
                  <Nav.Link as={Link} to="/ilssps" className="fw-bold">CROSSDOCK ALL</Nav.Link>
                   <Nav.Link as={Link} to="/indelivestock" className="fw-bold">DELIVERI STOCK ALL</Nav.Link>
                   <Nav.Link as={Link} to="/putaway" className="fw-bold">RECEIPT INBOUND ALL</Nav.Link>
                </Nav>
                <Nav className="ms-auto mt-2 mt-lg-0">
                  <NavDropdown title="DASHBOARD" className="fw-bold" id="basic-nav-dropdown">
                    <NavDropdown.Item href="http://10.1.0.56:8080/logistic" target="_blank">
                      <i className="fa fa-external-link-alt me-2"></i> GoTo Logistic
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/">
                      <i className="fa fa-share-square me-2"></i> DC HOME
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/homeinbound">
                      <i className="fa fa-cubes me-2"></i> INBOUND
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/homestorage">
                      <i className="fa fa-database me-2"></i> STORAGE
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="">
                      <i className="fa fa-cube me-2"></i> OUTBOUND
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/dashboardstore">
                      <i className="fa fa-cube me-2"></i> DASHBOARD STORE
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="container-fluid content-wrapper">
            {children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

