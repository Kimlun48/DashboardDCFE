import { Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";


import ChartStoreGrpo from "../../../../components/dcv1.2/store/kaliurang/storeGrpo";
import ChartStoreGrpoLate from "../../../../components/dcv1.2/store/kaliurang/storeBinLate";
import ChartStoreCashCarry from "../../../../components/dcv1.2/store/kaliurang/cashCarry";
import ChartStoreDeliveryCus from "../../../../components/dcv1.2/store/kaliurang/deliveriCustomer";
import ChartStoreItrIn from "../../../../components/dcv1.2/store/kaliurang/ItrIn";
import ChartStoreItrOut from "../../../../components/dcv1.2/store/kaliurang/ItrOut";

function ChartStoreKaliurang() {
    

   
    document.title = "Chart Store Kaliurang";

    return (
        <React.Fragment>
              <div className="container-fullscreen ">
                <h2 className="text-center chart-top-title">Store Kaliurang</h2>
                <div className="row">
                    <div className="col-lg-4 col-md-4 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <ChartStoreGrpo />
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-4 col-md-4 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <ChartStoreGrpoLate />
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-4 col-md-4 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <ChartStoreCashCarry />
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-4 col-md-4 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <ChartStoreDeliveryCus />
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-4 col-md-4 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <ChartStoreItrIn />
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-4 col-md-4 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <ChartStoreItrOut />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ChartStoreKaliurang;