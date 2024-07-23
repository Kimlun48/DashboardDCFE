import React, {useState, useEffect, useRef} from "react";
import PlaySound from "../components/utilites/sound";
import { Link } from "react-router-dom";
import Chart from "../components/inbound/chartpie";
import ChartDS from "../components/inbound/chartpieds";
import ChartPA from "../components/inbound/chartpiePa";
import CpsIndex from "./storage/cashputstorage";
import AdminLayout from "../layouts/AdminInbound";
import ReceiptInbIndex from "./receiptinbound";
import DashInboundIndex from "./putaway/dashinbound";
import Api from "../api";
import { Card } from "react-bootstrap";
import FooterDc from "../components/footer";





// import CpsIndex from "../cashputstorage";
function HomeInbound() {

    const [dashinbound, setDashinbound] = useState([]);

    const time = 30 * 60 * 1000; //30 menit

    const fetchData = async () => {
        await Api.get('api/dashinbound')
        .then(response => {
            setDashinbound(response.data.data);
        })
    }
    // const audioRef = useRef(null);

    // const playSound = () => {
    //     if (audioRef.current) {
    //         audioRef.current.play();
    //     }
    // };
    
    // const stopSound = () => {
    //     if (audioRef.current) {
    //         audioRef.current.pause();
    //         audioRef.current.currentTime = 0; // Reset audio ke awal
    //     }
    // };

    // useEffect(() => {
    //     if (dashinbound.length > 0) {
    //         playSound();
    //     } else {
    //         stopSound();
    //     }
    // }, [dashinbound]);

    const speak = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'id-ID';
        window.speechSynthesis.speak(speech);
    };
    const stopSpeech = () => {
        window.speechSynthesis.cancel();
    };

    useEffect(() => {
        if (dashinbound.length > 0) {
            dashinbound.forEach((row, index) => {
                setTimeout(() => {
                    speak(`ada order crossdock nomor dokumen ${row.NO_DOCUMENT}`);
                }, index * 6000); // delay each speech by 3 seconds
            });
        } else {
            stopSpeech();
        }
        return()=>{
            stopSpeech();
        }
    }, [dashinbound]);

    useEffect (()=>{
        fetchData();
        const interval = setInterval(() => {
            fetchData();
            console.log("ok");
          }, time);
      
          return () => clearInterval(interval);
    },[]);

    document.title = "Home Inbound";
    return(
        <React.Fragment>
            <AdminLayout>
                
              <h2 className="text-center my-4">INBOUND</h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <Chart />
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <ChartDS />
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <ChartPA />
                            </Card.Body>
                        </Card>
                    </div>
                    
                    {/* <div className="col-md-12 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <DashInboundIndex />
                            </Card.Body>
                        </Card>
                    </div> */}
                   
                </div>
            </div>
            {/* <audio ref={audioRef} src="/sounds/Crossdock.mp3" /> */}
            <DashInboundIndex />
            
            <FooterDc />
            </AdminLayout>
        </React.Fragment>
    )
}

export default HomeInbound