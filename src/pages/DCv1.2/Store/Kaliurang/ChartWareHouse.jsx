import {Card , Form} from "react-bootstrap";
import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChartWarehouseGrpo from "../../../../components/dcv1.2/store/kaliurang/warehouse/warehouseGrpo";
import ChartWareHouseGrpoLate from "../../../../components/dcv1.2/store/kaliurang/warehouse/warehouseBinLate";
import ChartWareHouseCashCarry from "../../../../components/dcv1.2/store/kaliurang/warehouse/warehouseCashCarry";
import ChartWarehouseCashCarryLate from "../../../../components/dcv1.2/store/kaliurang/warehouse/warehouseCashCarryLate";
import ChartWarehouseDeliveryCustomer from "../../../../components/dcv1.2/store/kaliurang/warehouse/warehouseDeliveryCustomer";
import ChartWarehouseDeliveryCustomerLate from "../../../../components/dcv1.2/store/kaliurang/warehouse/warehouseDeliveryCustomerLate";
import ChartWarehouseItrIn from "../../../../components/dcv1.2/store/kaliurang/warehouse/warehouseItrIn";
import ChartWarehouseItrInLate from "../../../../components/dcv1.2/store/kaliurang/warehouse/warehouseItrInLate";
import ChartWarehouseItrOut from "../../../../components/dcv1.2/store/kaliurang/warehouse/warehouseItrOut";
import ChartWarehouseItrOutLate from "../../../../components/dcv1.2/store/kaliurang/warehouse/warehouseItrOutLate";


function ChartWareHouseKaliurang () {
    const [filter, setFilter] = useState("all");
    document.title = "Chart Warehouse Kaliurang";

    const filteredCharts = () => {
        switch (filter) {
            case "grpo":
                    return (
                    <div className="containers-grpo">
                    <div className="row mt-4">
                    <div className="col-12">
                    
                    <div className="card-header">
                    <div className="row mt-4">
                             <div className="col-md-6">
                                <ChartWarehouseGrpo />
                            </div>
                             <div className="col-md-6">
                                <ChartWareHouseGrpoLate />
                            </div>
                   
                    </div>
                    </div>
                        </div>
                            </div>
                                </div>
                                    
                                );
                                
                            case "cashcarry":
                                return (

                    <div className="containers-cashcarry">
                    <div className="row mt-4">
                    <div className="col-12">
                    
                    <div className="card-header">
                    <div className="row mt-4">
                             <div className="col-md-6">
                                <ChartWareHouseCashCarry />
                            </div>
                             <div className="col-md-6">
                                <ChartWarehouseCashCarryLate />
                            </div>
                   
                    </div>
                    </div>
                        </div>
                            </div>
                                </div>
                                   
                                );
                            case "delivery":
                                return (

                    <div className="containers-delivcust">
                    <div className="row mt-4">
                    <div className="col-12">
                    
                    <div className="card-header">
                    <div className="row mt-4">
                             <div className="col-md-6">
                                <ChartWarehouseDeliveryCustomer />
                            </div>
                             <div className="col-md-6">
                                <ChartWarehouseDeliveryCustomerLate />
                            </div>
                    
                    </div>
                    </div>
                        </div>
                            </div>
                                </div>
                                    
                                );
                            case "itrin":
                                return (

                    <div className="containers-itrin">
                    <div className="row mt-4">
                    <div className="col-12">
                   
                    <div className="card-header">
                    <div className="row mt-4">
                             <div className="col-md-6">
                                <ChartWarehouseItrIn />
                            </div>
                             <div className="col-md-6">
                                <ChartWarehouseItrInLate />
                            </div>
                   
                    </div>
                    </div>
                        </div>
                            </div>
                                </div>
                                   
                                );
                            case "itrout":
                                return (
                    <div className="containers-itrout">
                    <div className="row mt-4">
                    <div className="col-12">
                    
                    <div className="card-header">
                    <div className="row mt-4">
                             <div className="col-md-6">
                                <ChartWarehouseItrOut />
                            </div>
                             <div className="col-md-6">
                                <ChartWarehouseItrOutLate />
                            </div>
                    <div className="col-12 col-lg-3 mb-4"></div>
                    </div>
                    </div>
                        </div>
                            </div>
                                </div>
                                    
                                );
            default:
                return (
                <div className="container-store">
                <div className="row mt-4">
                  {/* Container GRPO */}
                  <div className="col-md-4 col-sm-12 mb-4">
                    <div className="containers-grpo">
                     
                        <div className="card-header">
                          <div className="row">
                            <div className="col-md-6 col-sm-6">
                              <ChartWarehouseGrpo />
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <ChartWareHouseGrpoLate />
                            </div>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                
                  {/* Container Itrin */}
                  <div className="col-md-4 col-sm-12 mb-4">
                    <div className="containers-itrin">
                      
                        <div className="card-header">
                          <div className="row">
                            <div className="col-md-6 col-sm-6">
                              <ChartWarehouseItrIn />
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <ChartWarehouseItrInLate />
                            </div>
                          </div>
                        
                      </div>
                    </div>
                  </div>
              
                  {/* Container Itrout */}
                  <div className="col-md-4 col-sm-12 mb-4">
                    <div className="containers-itrout">
                      
                        <div className="card-header">
                          <div className="row">
                            <div className="col-md-6 col-sm-6">
                              <ChartWarehouseItrOut />
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <ChartWarehouseItrOutLate />
                            </div>
                          </div>
                        
                      </div>
                    </div>
                  </div>
              
                  <div className="col-md-6 col-sm-12 mb-4">
                    <div className="containers-cashcarry">
                      
                        <div className="card-header">
                          <div className="row">
                            <div className="col-md-6 col-sm-6">
                              <ChartWareHouseCashCarry />
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <ChartWarehouseCashCarryLate />
                            </div>
                          </div>
                       
                      </div>
                    </div>
                  </div>
              
                  <div className="col-md-6 col-sm-12 mb-4">
                    <div className="containers-delivcust">
                     
                        <div className="card-header">
                          <div className="row">
                            <div className="col-md-6 col-sm-6">
                              <ChartWarehouseDeliveryCustomer />
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <ChartWarehouseDeliveryCustomerLate />
                            </div>
                          </div>
                        </div>
                      
                    </div>
                  </div>
                </div>
              </div>
              




              
              

                  );
                  
        }
    };
    
    return (
        <React.Fragment>
            <div className="container-fullscreen filter-chart">
                <h2 className="text-center chart-top-title">Warehouse Kaliurang</h2>

                {/* Filter Dropdown */}
                <Form.Group controlId="chartFilter">
                    <Form.Label>Filter Charts</Form.Label>
                    <Form.Control
                        as="select"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Charts</option>
                        <option value="grpo">GRPO & GRPO Late</option>
                        <option value="cashcarry">Cash & Carry</option>
                        <option value="delivery">Delivery Customers</option>
                        <option value="itrin">ITR In</option>
                        <option value="itrout">ITR Out</option>
                    </Form.Control>
                </Form.Group>

                {/* Render Filtered Charts */}
                {filteredCharts()}
            </div>
        </React.Fragment>
    );
}
export default ChartWareHouseKaliurang;