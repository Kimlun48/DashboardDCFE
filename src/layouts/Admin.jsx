import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaHome, FaUserShield, FaBarcode, FaStore, FaWarehouse, FaBars, FaBoxes, FaMapMarkerAlt } from 'react-icons/fa'; // Icons for navigation

export default function AdminLayout({ children }) {
  return (
    <React.Fragment>
      <div className="d-flex" id="wrapper" style={{ backgroundColor: '#000638', minHeight: '100vh' }}>
        <div id="page-content-wrapper">
          <Navbar expand="lg" style={{ backgroundColor: '#000638' }} className="fixed-top shadow-sm">
            <Container fluid style={{ paddingLeft: '20px', paddingRight: '20px' }}>
              <Navbar.Toggle aria-controls="navbarSupportedContents" />
              <Navbar.Collapse id="navbarSupportedContent">
                <Nav className="me-auto mb-2 mb-lg-0">
                  <Nav.Link as={Link} to="/" className="text-white">
                    <FaHome className="me-2" /> HOME
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admin/login" className="text-white">
                    <FaUserShield className="me-2" /> ADMIN
                  </Nav.Link>
                  <Nav.Link as={Link} to="/qrcode" className="text-white">
                    <FaBarcode className="me-2" /> SCAN BARCODE
                  </Nav.Link>
                  <Nav className="ms-auto mt-2 mt-lg-0">
                  <NavDropdown title="STORE" className="text-white" id="basic-nav-dropdown" style={{ paddingRight: '15px' }}>
                    {/* Dropdown for Rancaekek */}
                    <NavDropdown title="Rancaekek" id="dropdown-rancaekek" drop="end">
                      <NavDropdown.Item as={Link} to="/dashboardstore">
                        <FaStore className="me-2" /> Store
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="#">
                        <FaWarehouse className="me-2" /> WareHouse
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown.Divider />

                    {/* Dropdown for Kaliurang */}
                    <NavDropdown title="Kaliurang" id="dropdown-kaliurang" drop="end">
                    {/* <NavDropdown.Item as={Link} to="/kaliurang/store">
                    <FaStore className="me-2" /> Store
                    </NavDropdown.Item> */}
                    <NavDropdown title="Store" id="dropdown-store" drop="end">
                       <NavDropdown.Item as={Link} to= "/kaliurang/store" >
                          <FaStore className="me-2" /> Chart Store
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to= "/kaliurang/pndstore" >
                          <FaBars className="me-2" /> Customers
                          </NavDropdown.Item>
                        
                  </NavDropdown>
                    <NavDropdown title="Warehouse" id="dropdown-warehouse" drop="end">
                       <NavDropdown.Item as={Link} to= "/kaliurang/warehouse" >
                          <FaWarehouse className="me-2" /> Chart Warehouse
                          </NavDropdown.Item>
                         <NavDropdown.Item as={Link} to="/kaliurang/inoutwarehouse">
                          <FaBoxes className="me-2" />  In/Out Warehouse
                      </NavDropdown.Item>
                  </NavDropdown>
                  
                  
                    {/* <NavDropdown.Item as={Link} to="/kaliurang/pndstore">
                  <FaBars className="me-2" /> Customers
                  </NavDropdown.Item> */}
                  </NavDropdown>

                  </NavDropdown>
                </Nav>
                </Nav>

                
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <div className="container-fluid content-wrapper mt-5" style={{ backgroundColor: '#000638', color: 'white' }}>
            {children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
