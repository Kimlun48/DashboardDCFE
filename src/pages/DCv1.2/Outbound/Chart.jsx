import { Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Api from "../../../api";

// import ChartInboundPo from "../../../components/dcv1.2/chartinbound/chartPo";
// import ChartInboundItrIn from "../../../components/dcv1.2/chartinbound/chartItrIn";
// import ChartInboundCrossdock from "../../../components/dcv1.2/chartinbound/chartCrossdock";
// import ChartInboundReturn from "../../../components/dcv1.2/chartinbound/chartReturn";
import ChartArReserve from "../../../components/dcv1.2/chartoutbound/chartArReserve";
import ChartItrOut from "../../../components/dcv1.2/chartoutbound/chartItrOut";
import ChartSalesOrder from "../../../components/dcv1.2/chartoutbound/chartSalesOrder";
import 'animate.css';

import FooterDc from "../../../components/footer";

function ChartOutbound() {
    const [chartinbound, setChartinbound] = useState([]);
    const [hasLateData, setHasLateData] = useState(false);
    const time = 60 * 60 * 1000;

    const fetchData = async () => {
        try {
            const responses = await Promise.all([
                Api.get('api/v2statisticarreserve'),
                Api.get('api/v2statisticitrout'),
                Api.get('api/v2statisticsalesorder'),
                Api.get('api/v2latearreserve'),
                Api.get('api/v2latesalesorder'),
                Api.get('api/v2lateitrout'),
                
              
            ]);
            const data = responses.map(response => response.data.data);
            setChartinbound(data);

            // Debugging: log data received from APIs
            console.log('Data received from APIs:', data);

            // Check if there is any late data in any of the responses
            // const lateData = data.some(endpointData =>
            //     endpointData.late > 0
            // );
            // setHasLateData(lateData);

            // if (lateData) {
            //     speak("Ada barang yang terlambat di outbound mohon untuk segera di proses");
            // }
            // Check if there is any late data in any of the responses
            let hasLateData = false;
            data.forEach((endpointData, index) => {
                if (endpointData.LATE > 0) {
                    hasLateData = true;
                    [data[3], data[4], data[5]].forEach(lateDataArray => {
                        // if (Array.isArray(lateDataArray)) {
                        //     lateDataArray.forEach(item => {
                        //         // speak(`Ada barang yang terlambat di outbound nomor receipt: ${item.DocNum}`);
                        //         const notif = String(item.NOTIF);
                        //         speak(`Ada barang yang terlambat di outbound nomor receipt: ${notif}`);
                        //     });
                            
                        // }
                        if (Array.isArray(lateDataArray)) {
                            lateDataArray.forEach(item => {
                                if (item && typeof item.NOTIF === 'string') {
                                    speak(`Ada barang yang terlambat di outbound nomor receipt: ${item.NOTIF.split('').join(' ')}`);
                                } else {
                                    console.error('Invalid item or NOTIF:', item);
                                }
                            });
                        }
                    });
                }
            });
            setHasLateData(hasLateData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const speak = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'id-ID';
        window.speechSynthesis.speak(speech);
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
            console.log("Data fetched");
        }, time);
        return () => clearInterval(interval);
    }, []);

    document.title = "Chart Outbound";

    return (
        <React.Fragment>
         
           
            <div className="container-fullscreen ">
                <h2 className="text-center chart-top-title">OUTBOUND</h2>
            
                {/* {hasLateData && (
                    <div className="alert alert-danger text-center">
                        Ada barang yang terlambat di outbound mohon untuk segera di proses!
                    </div>
                )} */}
        <div className="row">
            <div className="col-md-6 mb-6">
                <Card className="border-top-success card-dashboard">
                    <Card.Body>
                        <ChartArReserve />
                    </Card.Body>
                </Card>
            </div>
            <div className="col-md-6 mb-6">
                <Card className="border-top-success card-dashboard">
                    <Card.Body>
                        <ChartSalesOrder />
                    </Card.Body>
                </Card>
            </div>
            <div className="col-md-6 mb-6">
                <Card className="border-top-success card-dashboard">
                    <Card.Body>
                        <ChartItrOut />
                    </Card.Body>
                </Card>
            </div>
            
            {/* <div className="col-md-6 mb-6">
                <Card className="border-top-success card-dashboard">
                    <Card.Body>
                        <ChartInboundCrossdock />
                    </Card.Body>
                </Card>
            </div> */}
        </div>
        </div>
        


            {/* <FooterDc /> */}
        </React.Fragment>
    );
}

export default ChartOutbound;

