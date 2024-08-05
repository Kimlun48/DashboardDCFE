import { Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Api from "../../../api";
import ChartCashPicking from "../../../components/dcv1.2/chartstorage/chartCashPicking";
import ChartDeliveryPicking from "../../../components/dcv1.2/chartstorage/chartDeliveryPicking";
import ChartPutaway from "../../../components/dcv1.2/chartstorage/chartPutaway";
import ChartReplenishment from "../../../components/dcv1.2/chartstorage/chartReplenishment";

function ChartStorage() {
    const [chartinbound, setChartinbound] = useState([]);
    const [hasLateData, setHasLateData] = useState(false);
    const time = 2 * 60 * 1000;

    const fetchData = async () => {
        try {
            const responses = await Promise.all([
                Api.get('api/v2statisticputaway'),
                Api.get('api/v2statisticreplenishment'),
                Api.get('api/v2statisticdeliverypicking'),
                Api.get('api/v2statisticcashpicking'),  
                Api.get('api/v2lateputaway'),
                Api.get('api/v2latereplenishment'),
                Api.get('api/v2latedeliverypicking'),
                Api.get('api/v2latecashpicking'),
               
            ]);

            const data = responses.map(response => response.data.data);
            setChartinbound(data);

            // Debugging: log data received from APIs
            console.log('Data received from APIs:', data);

            // Check if there is any late data in any of the responses
            let hasLateData = false;
            data.forEach((endpointData, index) => {
                if (endpointData.LATE > 0) {
                    // speak(`Ada barang yang terlambat di storage nomor receipt`);
                    hasLateData = true;
                    [data[4], data[5], data[6], data[7]].forEach(lateDataArray => {
                        // if (Array.isArray(lateDataArray)) {
                        //     lateDataArray.forEach(item => {
                        //         //speak(`Ada barang yang terlambat di storage nomor receipt: ${item.NOTIF}`);
                        //         const notif = String(item.NOTIF);
                        //         speak(`Ada barang yang terlambat di storage nomor receipt: ${notif}`);
                        //     });
                        // }
                        if (Array.isArray(lateDataArray)) {
                            lateDataArray.forEach(item => {
                                if (item && typeof item.NOTIF === 'string') {
                                    speak(`Ada dokumen yang harus diproses di storage dengan nomor: ${item.NOTIF.split('').join(' ')}`);
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

    document.title = "Chart Storage";

    return (
        <React.Fragment>
            <div className="container-fullscreen ">
                <h2 className="text-center chart-top-title">STORAGE</h2>
                {/* {hasLateData && (
                    <div className="alert alert-danger text-center">
                        Ada barang yang terlambat di storage mohon untuk segera di proses!
                    </div>
                )} */}
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <ChartPutaway />
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-6 col-md-12 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <ChartReplenishment />
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-6 col-md-12 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <ChartDeliveryPicking />
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-6 col-md-12 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <ChartCashPicking />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ChartStorage;
