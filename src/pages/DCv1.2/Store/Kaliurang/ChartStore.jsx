// import { Card } from "react-bootstrap";
// import React, { useEffect, useState } from "react";


// import ChartStoreGrpo from "../../../../components/dcv1.2/store/kaliurang/storeGrpo";
// import ChartStoreGrpoLate from "../../../../components/dcv1.2/store/kaliurang/storeBinLate";
// import ChartStoreCashCarry from "../../../../components/dcv1.2/store/kaliurang/cashCarry";
// import ChartStoreDeliveryCus from "../../../../components/dcv1.2/store/kaliurang/deliveriCustomer";
// import ChartStoreItrIn from "../../../../components/dcv1.2/store/kaliurang/ItrIn";
// import ChartStoreItrOut from "../../../../components/dcv1.2/store/kaliurang/ItrOut";
// import ChartCashCarryLate from "../../../../components/dcv1.2/store/kaliurang/storeCashCarryLate";
// import ChartDelivCustLate from "../../../../components/dcv1.2/store/kaliurang/storedelivecustlate";
// import ChartItrInLate from "../../../../components/dcv1.2/store/kaliurang/storeItrInLate";
// import ChartItrOutLate from "../../../../components/dcv1.2/store/kaliurang/storeItrOutLate";

// function ChartStoreKaliurang() {
    

   
//     document.title = "Chart Store Kaliurang";

//     return (
//         <React.Fragment>
//               <div className="container-fullscreen ">
//                 <h2 className="text-center chart-top-title">Store Kaliurang</h2>
//                 <div className="row">
//                 <div className="col-lg-12 col-md-12 mb-4">
//                 <Card className="border-top-success card-dashboard">
//                     <div className="card-body">
//                         <h4 className="chart-title">Store GRPO & GRPO Late</h4>
//                         <div className="row">
//                             <div className="col-lg-6 col-md-6">
//                                 <ChartStoreGrpo />
//                             </div>
//                             <div className="col-lg-6 col-md-6">
//                                 <ChartStoreGrpoLate />
//                             </div>
//                         </div>
//                     </div>
//                 </Card>
//                </div>
//                <div className="col-lg-12 col-md-12 mb-4">
//                 <Card className="border-top-success card-dashboard">
//                     <div className="card-body">
//                         <h4 className="chart-title">Store Cash & Carry</h4>
//                         <div className="row">
//                             <div className="col-lg-6 col-md-6">
//                                 <ChartStoreCashCarry />
//                             </div>
//                             <div className="col-lg-6 col-md-6">
//                                 <ChartCashCarryLate />
//                             </div>
//                         </div>
//                     </div>
//                 </Card>
//                </div>
//                <div className="col-lg-12 col-md-12 mb-4">
//                 <Card className="border-top-success card-dashboard">
//                     <div className="card-body">
//                         <h4 className="chart-title">Store Delivery Cutomers</h4>
//                         <div className="row">
//                             <div className="col-lg-6 col-md-6">
//                                 <ChartStoreDeliveryCus />
//                             </div>
//                             <div className="col-lg-6 col-md-6">
//                                 <ChartDelivCustLate />
//                             </div>
//                         </div>
//                     </div>
//                 </Card>
//                </div>
//                <div className="col-lg-12 col-md-12 mb-4">
//                 <Card className="border-top-success card-dashboard">
//                     <div className="card-body">
//                         <h4 className="chart-title">Store ITR In</h4>
//                         <div className="row">
//                             <div className="col-lg-6 col-md-6">
//                                 <ChartStoreItrIn />
//                             </div>
//                             <div className="col-lg-6 col-md-6">
//                                 <ChartItrInLate />
//                             </div>
//                         </div>
//                     </div>
//                 </Card>
//                </div>
//                <div className="col-lg-12 col-md-12 mb-4">
//                 <Card className="border-top-success card-dashboard">
//                     <div className="card-body">
//                         <h4 className="chart-title">Store ITR OUT</h4>
//                         <div className="row">
//                             <div className="col-lg-6 col-md-6">
//                                 <ChartStoreItrOut />
//                             </div>
//                             <div className="col-lg-6 col-md-6">
//                                 <ChartItrOutLate />
//                             </div>
//                         </div>
//                     </div>
//                 </Card>
//                </div>
                
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// }

// export default ChartStoreKaliurang;
// import { Card, Form } from "react-bootstrap";
// import React, { useState } from "react";

// import ChartStoreGrpo from "../../../../components/dcv1.2/store/kaliurang/storeGrpo";
// import ChartStoreGrpoLate from "../../../../components/dcv1.2/store/kaliurang/storeBinLate";
// import ChartStoreCashCarry from "../../../../components/dcv1.2/store/kaliurang/cashCarry";
// import ChartStoreDeliveryCus from "../../../../components/dcv1.2/store/kaliurang/deliveriCustomer";
// import ChartStoreItrIn from "../../../../components/dcv1.2/store/kaliurang/ItrIn";
// import ChartStoreItrOut from "../../../../components/dcv1.2/store/kaliurang/ItrOut";
// import ChartCashCarryLate from "../../../../components/dcv1.2/store/kaliurang/storeCashCarryLate";
// import ChartDelivCustLate from "../../../../components/dcv1.2/store/kaliurang/storedelivecustlate";
// import ChartItrInLate from "../../../../components/dcv1.2/store/kaliurang/storeItrInLate";
// import ChartItrOutLate from "../../../../components/dcv1.2/store/kaliurang/storeItrOutLate";

// function ChartStoreKaliurang() {
//     const [filter, setFilter] = useState("all");

//     document.title = "Chart Store Kaliurang";

//     // Function to filter charts based on user selection
//     const filteredCharts = () => {
//         switch (filter) {
//             case "grpo":
//                 return (
//                     <div className="row">
//                         <div className="col-lg-6 col-md-6">
//                             <ChartStoreGrpo />
//                         </div>
//                         <div className="col-lg-6 col-md-6">
//                             <ChartStoreGrpoLate />
//                         </div>
//                     </div>
//                 );
//             case "cashcarry":
//                 return (
//                     <div className="row">
//                         <div className="col-lg-6 col-md-6">
//                             <ChartStoreCashCarry />
//                         </div>
//                         <div className="col-lg-6 col-md-6">
//                             <ChartCashCarryLate />
//                         </div>
//                     </div>
//                 );
//             case "delivery":
//                 return (
//                     <div className="row">
//                         <div className="col-lg-6 col-md-6">
//                             <ChartStoreDeliveryCus />
//                         </div>
//                         <div className="col-lg-6 col-md-6">
//                             <ChartDelivCustLate />
//                         </div>
//                     </div>
//                 );
//             case "itrin":
//                 return (
//                     <div className="row">
//                         <div className="col-lg-6 col-md-6">
//                             <ChartStoreItrIn />
//                         </div>
//                         <div className="col-lg-6 col-md-6">
//                             <ChartItrInLate />
//                         </div>
//                     </div>
//                 );
//             case "itrout":
//                 return (
//                     <div className="row">
//                         <div className="col-lg-6 col-md-6">
//                             <ChartStoreItrOut />
//                         </div>
//                         <div className="col-lg-6 col-md-6">
//                             <ChartItrOutLate />
//                         </div>
//                     </div>
//                 );
//             default:
//                 return (
//                     <div className="row">
//                         <div className="col-lg-6 col-md-6">
//                             <ChartStoreGrpo />
//                         </div>
//                         <div className="col-lg-6 col-md-6">
//                             <ChartStoreGrpoLate />
//                         </div>
//                         <div className="col-lg-6 col-md-6">
//                             <ChartStoreCashCarry />
//                         </div>
//                         <div className="col-lg-6 col-md-6">
//                             <ChartCashCarryLate />
//                         </div>
//                         <div className="col-lg-6 col-md-6">
//                             <ChartStoreDeliveryCus />
//                         </div>
//                         <div className="col-lg-6 col-md-6">
//                             <ChartDelivCustLate />
//                         </div>
//                         <div className="col-lg-6 col-md-6">
//                             <ChartStoreItrIn />
//                         </div>
//                         <div className="col-lg-6 col-md-6">
//                             <ChartItrInLate />
//                         </div>
//                         <div className="col-lg-6 col-md-6">
//                             <ChartStoreItrOut />
//                         </div>
//                         <div className="col-lg-6 col-md-6">
//                             <ChartItrOutLate />
//                         </div>
//                     </div>
//                 );
//         }
//     };

//     return (
//         <React.Fragment>
//             <div className="container-fullscreen filter-chart">
//                 <h2 className="text-center chart-top-title">Store Kaliurang</h2>

//                 {/* Filter Dropdown */}
//                 <Form.Group controlId="chartFilter">
//                     <Form.Label>Filter Charts</Form.Label>
//                     <Form.Control
//                         as="select"
//                         value={filter}
//                         onChange={(e) => setFilter(e.target.value)}
//                     >
//                         <option value="all">All Charts</option>
//                         <option value="grpo">GRPO & GRPO Late</option>
//                         <option value="cashcarry">Cash & Carry</option>
//                         <option value="delivery">Delivery Customers</option>
//                         <option value="itrin">ITR In</option>
//                         <option value="itrout">ITR Out</option>
//                     </Form.Control>
//                 </Form.Group>

//                 {/* Render Filtered Charts */}
//                 {filteredCharts()}
//             </div>
//         </React.Fragment>
//     );
// }

// export default ChartStoreKaliurang;

import { Card, Form } from "react-bootstrap";
import React, { useState } from "react";

import ChartStoreGrpo from "../../../../components/dcv1.2/store/kaliurang/storeGrpo";
import ChartStoreGrpoLate from "../../../../components/dcv1.2/store/kaliurang/storeBinLate";
import ChartStoreCashCarry from "../../../../components/dcv1.2/store/kaliurang/cashCarry";
import ChartStoreDeliveryCus from "../../../../components/dcv1.2/store/kaliurang/deliveriCustomer";
import ChartStoreItrIn from "../../../../components/dcv1.2/store/kaliurang/ItrIn";
import ChartStoreItrOut from "../../../../components/dcv1.2/store/kaliurang/ItrOut";
import ChartCashCarryLate from "../../../../components/dcv1.2/store/kaliurang/storeCashCarryLate";
import ChartDelivCustLate from "../../../../components/dcv1.2/store/kaliurang/storedelivecustlate";
import ChartItrInLate from "../../../../components/dcv1.2/store/kaliurang/storeItrInLate";
import ChartItrOutLate from "../../../../components/dcv1.2/store/kaliurang/storeItrOutLate";
import 'bootstrap/dist/css/bootstrap.min.css';

function ChartStoreKaliurang() {
    const [filter, setFilter] = useState("all");

    document.title = "Chart Store Kaliurang";

    // Function to filter charts based on user selection
    const filteredCharts = () => {
        switch (filter) {
            case "grpo":
                                return (
                                    // <div className="row">
                                    //     <div className="col-lg-6 col-md-6">
                                    //         <ChartStoreGrpo />
                                    //     </div>
                                    //     <div className="col-lg-6 col-md-6">
                                    //         <ChartStoreGrpoLate />
                                    //     </div>
                                    // </div>

                    <div className="containers-grpo">
                    <div className="row mt-4">
                    <div className="col-12">
                    
                    <div className="card-header">
                    <div className="row mt-4">
                             <div className="col-md-6">
                                <ChartStoreGrpo />
                            </div>
                             <div className="col-md-6">
                                <ChartStoreGrpoLate />
                            </div>
                   
                    </div>
                    </div>
                        </div>
                            </div>
                                </div>
                                    
                                );
                                
                            case "cashcarry":
                                return (
                                    // <div className="row">
                                    //     <div className="col-lg-6 col-md-6">
                                    //         <ChartStoreCashCarry />
                                    //     </div>
                                    //     <div className="col-lg-6 col-md-6">
                                    //         <ChartCashCarryLate />
                                    //     </div>
                                    // </div>
                    <div className="containers-cashcarry">
                    <div className="row mt-4">
                    <div className="col-12">
                    
                    <div className="card-header">
                    <div className="row mt-4">
                             <div className="col-md-6">
                                <ChartStoreCashCarry />
                            </div>
                             <div className="col-md-6">
                                <ChartCashCarryLate />
                            </div>
                   
                    </div>
                    </div>
                        </div>
                            </div>
                                </div>
                                   
                                );
                            case "delivery":
                                return (
                                    // <div className="row">
                                    //     <div className="col-lg-6 col-md-6">
                                    //         <ChartStoreDeliveryCus />
                                    //     </div>
                                    //     <div className="col-lg-6 col-md-6">
                                    //         <ChartDelivCustLate />
                                    //     </div>
                                    // </div>
                    <div className="containers-delivcust">
                    <div className="row mt-4">
                    <div className="col-12">
                    
                    <div className="card-header">
                    <div className="row mt-4">
                             <div className="col-md-6">
                                <ChartStoreDeliveryCus />
                            </div>
                             <div className="col-md-6">
                                <ChartDelivCustLate />
                            </div>
                    
                    </div>
                    </div>
                        </div>
                            </div>
                                </div>
                                    
                                );
                            case "itrin":
                                return (
                                    // <div className="row">
                                    //     <div className="col-lg-6 col-md-6">
                                    //         <ChartStoreItrIn />
                                    //     </div>
                                    //     <div className="col-lg-6 col-md-6">
                                    //         <ChartItrInLate />
                                    //     </div>
                                    // </div>
                    <div className="containers-itrin">
                    <div className="row mt-4">
                    <div className="col-12">
                   
                    <div className="card-header">
                    <div className="row mt-4">
                             <div className="col-md-6">
                                <ChartStoreItrIn />
                            </div>
                             <div className="col-md-6">
                                <ChartItrInLate />
                            </div>
                   
                    </div>
                    </div>
                        </div>
                            </div>
                                </div>
                                   
                                );
                            case "itrout":
                                return (
                                    // <div className="row">
                                    //     <div className="col-lg-6 col-md-6">
                                    //         <ChartStoreItrOut />
                                    //     </div>
                                    //     <div className="col-lg-6 col-md-6">
                                    //         <ChartItrOutLate />
                                    //     </div>
                                    // </div>
                    <div className="containers-itrout">
                    <div className="row mt-4">
                    <div className="col-12">
                    
                    <div className="card-header">
                    <div className="row mt-4">
                             <div className="col-md-6">
                                <ChartStoreItrOut />
                            </div>
                             <div className="col-md-6">
                                <ChartItrOutLate />
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
                //     <div className="container">
                //     <div className="row">
                        
                //       <div className="col-md-2">
                //         <ChartStoreGrpo />
                //       </div>
                //       <div className="col-md-2">
                //         <ChartStoreGrpoLate />
                //       </div>


                //       <div className="col-md-2">
                //         <ChartStoreItrIn />
                //       </div>
                //       <div className="col-md-2">
                //         <ChartItrInLate />
                //       </div>
                      
                //       <div className="col-md-2">
                //         <ChartStoreItrOut />
                //       </div>
                //       <div className="col-md-2">
                //         <ChartItrOutLate />
                //       </div>
                //       <div className="col-lg-4 col-md-4 box">
                //      <ChartStoreCashCarry />
                //     </div>
                //     <div className="col-lg-2 col-md-2 box">
                //     <ChartCashCarryLate />
                //      </div>
                //     <div className="col-lg-4 col-md-4 box">
                // <ChartStoreDeliveryCus />
                // </div>
                // <div className="col-lg-2 col-md-2 box">
                //  <ChartDelivCustLate />
                //  </div>
                //     </div>
                //     </div>

                <div className="container-store">
                <div className="row mt-4">
                  {/* Container GRPO */}
                  <div className="col-md-4 col-sm-12 mb-4">
                    <div className="containers-grpo">
                     
                        <div className="card-header">
                          <div className="row">
                            <div className="col-md-6 col-sm-6">
                              <ChartStoreGrpo />
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <ChartStoreGrpoLate />
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
                              <ChartStoreItrIn />
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <ChartItrInLate />
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
                              <ChartStoreItrOut />
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <ChartItrOutLate />
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
                              <ChartStoreCashCarry />
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <ChartCashCarryLate />
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
                              <ChartStoreDeliveryCus />
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <ChartDelivCustLate />
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
                <h2 className="text-center chart-top-title">Store Kaliurang</h2>

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

export default ChartStoreKaliurang;
