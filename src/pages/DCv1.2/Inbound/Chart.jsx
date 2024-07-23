
import { Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Api from "../../../api";

import ChartInboundPo from "../../../components/dcv1.2/chartinbound/chartPo";
import ChartInboundItrIn from "../../../components/dcv1.2/chartinbound/chartItrIn";
import ChartInboundCrossdock from "../../../components/dcv1.2/chartinbound/chartCrossdock";
import ChartInboundReturn from "../../../components/dcv1.2/chartinbound/chartReturn";


function ChartInbound() {
    const [chartinbound, setChartinbound] = useState([]);
    const [hasLateData, setHasLateData] = useState(false);
    const time = 2 * 60 * 1000;

    const fetchData = async () => {
        try {
            const responses = await Promise.all([
                Api.get('api/v2statisticitrin'),
                Api.get('api/v2statisticcrossdock'),
                Api.get('api/v2statisticpo'),
                Api.get('api/v2statisticreturn')
            ]);

            const data = responses.map(response => response.data.data);
            setChartinbound(data);

            // Debugging: log data received from APIs
            console.log('Data received from APIs:', data);

            // Check if there is any late data in any of the responses
            const lateData = data.some(endpointData =>
                endpointData.late > 0
            );
            setHasLateData(lateData);

            if (lateData) {
                speak("Ada barang yang terlambat di inbound mohon untuk segera di proses");
            }
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

    document.title = "Chart Inbound";

    return (
        <React.Fragment>
            <div className="container-fullscreen ">
                <h2 className="text-center chart-top-title">INBOUND</h2>
            
        {/* {hasLateData && (
            <div className="alert alert-danger text-center">
                Ada barang yang terlambat di inbound mohon untuk segera di proses!
            </div>
        )} */}
        <div className="row">
            <div className="col-md-6 mb-6">
                <Card className="border-top-success card-dashboard">
                    <Card.Body>
                        <ChartInboundPo />
                    </Card.Body>
                </Card>
            </div>
            <div className="col-md-6 mb-6">
                <Card className="border-top-success card-dashboard">
                    <Card.Body>
                        <ChartInboundItrIn />
                    </Card.Body>
                </Card>
            </div>
            <div className="col-md-6 mb-6">
                <Card className="border-top-success card-dashboard">
                    <Card.Body>
                        <ChartInboundReturn />
                    </Card.Body>
                </Card>
            </div>
            <div className="col-md-6 mb-6">
                <Card className="border-top-success card-dashboard">
                    <Card.Body>
                        <ChartInboundCrossdock />
                    </Card.Body>
                </Card>
            </div>
        </div>
        </div>
        


           
        </React.Fragment>
    );
}

export default ChartInbound;

