import React, {useState, useEffect, useRef} from "react";

import Api from "../../api";

import ChartPie from "../../components/chartpie";
import PlaySound from "../../components/utilites/sound";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminInbound";
function IlsChart() {
    document.title = "CROSSDOCK CHART";

    const [ilslate, setIlslate] = useState([]);
    const time = 30 * 60 * 1000; //30 menit

    const fetchDataIls = async () => {
        await Api.get('api/late')
        .then(response => {
            setIlslate(response.data.data);
            console.log('API response:', response.data.data);
        })
    }
    const audioRef = useRef(null);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };
    
    const stopSound = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Reset audio ke awal
        }
    };

    useEffect(() => {
        if (ilslate.length > 0) {
            playSound();
        } else {
            stopSound();
        }
    }, [ilslate]);
    useEffect (()=>{
        fetchDataIls();
        const interval = setInterval(() => {
            fetchDataIls();
            console.log("ok");
          }, time);
      
          return () => clearInterval(interval);
    },[]);
      
          

    return(
        <React.Fragment>
            <AdminLayout>
            <div className="containers mt-5 mb-5">
            <div className="row mt-4">
            <div className="col-md-12">
                
            <audio ref={audioRef} src="/sounds/Crossdock.mp3" />  
                    <ChartPie/>
                    </div>
                </div>
                </div>
                </AdminLayout>
        </React.Fragment>
    )
}

export default IlsChart