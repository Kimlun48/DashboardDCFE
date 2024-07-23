import React, {useState, useEffect, useRef} from "react";

import Api from "../../api";
import AdminLayout from "../../layouts/AdminInbound";
import PlaySound from "../../components/utilites/sound";
import { Link } from "react-router-dom";
import ChartPA from "../../components/chartpiePa";

function PAChart() {
    document.title = "PUTAWAY CHART";

    const [ilslate, setIlslate] = useState([]);

    const fetchDataPa = async () => {
        await Api.get('api/palate')
        .then(response => {
            setIlslate(response.data.data);
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
        fetchDataPa();
        const interval = setInterval(() => {
            fetchDataPa();
            console.log("ok");
          }, 30000);
      
          return () => clearInterval(interval);
    },[]);
      
          

    return(
        <React.Fragment>
            <AdminLayout>
            <div className="containers mt-5 mb-5">
            <div className="row mt-4">
            <div className="col-md-12">
                
            <audio ref={audioRef} src="/sounds/Putaway.mp3" />  
                    <ChartPA/>
                    </div>
                </div>
                </div>
                </AdminLayout>
        </React.Fragment>
    )
}

export default PAChart