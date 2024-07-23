
import AdminLayout from "../layouts/AdminStorage";
import { Card } from "react-bootstrap";


import ChartCps from "../components/storage/chartpieCps";
import ChartPs from "../components/storage/chartpiePs";
import ChartRps from "../components/storage/chartpieRps";
import CpsIndex from "./storage/cashputstorage";
import React ,{ useEffect, useRef, useState } from "react";
import Api from "../api";
import FooterDc from "../components/footer";


function HomeStorage(){
    const [homestorage, setHomestorage] = useState([])
    const time = 2 * 60 * 1000

    const fetchData = async()=>{
        await Api.get('api/cpsv1')
        .then(response => {
            setHomestorage(response.data.data)
        })
    }

    const speak = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'id-ID';
        window.speechSynthesis.speak(speech);
    };
    const stopSpeech = () => {
        window.speechSynthesis.cancel();
    };

    useEffect(() => {
        if (homestorage.length > 0) {
           homestorage.forEach((row, index) => {
                setTimeout(() => {
                    speak(`${row.notif}, nomor dokumen ${row.NO_DOCUMENT}`);
                }, index * 3000); // delay each speech by 3 seconds
            });
        } else {
            stopSpeech();
        }
        return()=>{
            stopSpeech();
        }
    }, [homestorage]);

    // const audioRef = useRef(null)
    
    // const playSound = () => {
    //     if  (audioRef.current) {
    //         audioRef.current.play();
    //     }
    // };

    // const stopSound = () => {
    //     if (audioRef.current){
    //         audioRef.current.pause();
    //         audioRef.current.currentTime = 0;
    //     }
    // };

    // useEffect (() => {
    //     if (homestorage.length>0) {
    //         playSound()
    //     } else {
    //         stopSound()
    //     }

    // }, [homestorage]);

    useEffect (() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData()
            console.log("ok")
        }, time);
        return () => clearInterval(interval)
    }, [])



    document.title = "Home Storage";

    return(
        <React.Fragment>
            <AdminLayout>
          
           
            <h2 className="text-center my-4">STORAGE</h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <ChartCps />
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <ChartPs />
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <ChartRps/>
                            </Card.Body>
                        </Card>
                    </div>
                    {/* <div className="col-md-12 mb-4">
                        <Card className="border-top-success card-dashboard">
                            <Card.Body>
                                <CpsIndex />
                            </Card.Body>
                        </Card>
                    </div> */}
                </div>
            </div>
            {/* <audio ref={audioRef} src="/sounds/Alert Voice.mp3" /> */}
        
            <CpsIndex />
            
                   <FooterDc />
            </AdminLayout>
        </React.Fragment>
    )

}

export default HomeStorage