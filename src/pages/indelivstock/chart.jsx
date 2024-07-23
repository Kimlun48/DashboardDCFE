// import React, {useState, useEffect, useRef} from "react";

// import Api from "../../api";
// import LayoutAdmin from "../../layouts/Admin";
// import ChartDS from "../../components/chartpieds";
// import PlaySound from "../../components/utilites/sound";
// import { Link } from "react-router-dom";

// function DSChart() {
//     document.title = "INBOUND CHART";

//     const [ilslate, setIlslate] = useState([]);

//     const fetchDataIls = async () => {
//         await Api.get('api/indelivestocklate')
//         .then(response => {
//             setIlslate(response.data.data);
//         })
//     }
//     const audioRef = useRef(null);

//     const playSound = () => {
//         if (audioRef.current) {
//             audioRef.current.play();
//         }
//     };
    
//     const stopSound = () => {
//         if (audioRef.current) {
//             audioRef.current.pause();
//             audioRef.current.currentTime = 0; // Reset audio ke awal
//         }
//     };

//     useEffect(() => {
//         if (ilslate.length > 0) {
//             playSound();
//         } else {
//             stopSound();
//         }
//     }, [ilslate]);
//     useEffect (()=>{
//         fetchDataIls();
//         const interval = setInterval(() => {
//             fetchDataIls();
//             console.log("ok");
//           }, 30000);
      
//           return () => clearInterval(interval);
//     },[]);
      
          

//     return(
//         <React.Fragment>
//             <LayoutAdmin>
//             <div className="containers mt-5 mb-5">
//             <div className="row mt-4">
//             <div className="col-md-12">
                
//             <audio ref={audioRef} src="/sounds/notification.mp3" />  
//                     <ChartDS />
//                     </div>
//                 </div>
//                 </div>
//             </LayoutAdmin>
//         </React.Fragment>
//     )
// }

// export default DSChart
import React, { useState, useEffect, useRef } from "react";
import Api from "../../api";

import AdminLayout from "../../layouts/AdminInbound";
import ChartDS from "../../components/chartpieds";
import { Link } from "react-router-dom";

function DSChart() {
    document.title = "INBOUND CHART";

    const [ilslate, setIlslate] = useState([]);

    const fetchDataIls = async () => {
        try {
            const response = await Api.get('api/indelivestocklate');
            const data = response.data.data;
            setIlslate(data);
            console.log('API response:', data);

            // const shouldPlayAudio = data.some(item => item.Status === '100' && item.Available === '4');
        //     const shouldPlayAudio = data.every(item => item.Status === '100' && item.Available === '1');

        //     if (shouldPlayAudio) {
        //         playSound();
        //     } else {
        //         stopSound();
        //     }
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        //     stopSound();
        // }
        const shouldPlayAudio = data.some(item => {
            const statusMatch = item.Status === '100';
            const availableMatch = item.Available === '1';
            console.log(`Status: ${item.Status}, Available: ${item.Available}, Status Match: ${statusMatch}, Available Match: ${availableMatch}`);
            return statusMatch && availableMatch;
        });
    
        console.log(`Should Play Audio: ${shouldPlayAudio}`);
    
        if (shouldPlayAudio) {
            playSound();
        } else {
            stopSound();
        }
    } catch (error) {
        console.error('Error mengambil data:', error);
        stopSound(); // Pastikan suara berhenti jika terjadi kesalahan
    }
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
            audioRef.current.currentTime = 0; // Reset audio to start
        }
    };

    useEffect(() => {
        fetchDataIls();
        const interval = setInterval(() => {
            fetchDataIls();
            console.log("Fetching data...");
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <React.Fragment>
            <AdminLayout>
                <div className="containers mt-5 mb-5">
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <audio ref={audioRef} src="/sounds/notification.mp3" />
                            <ChartDS />
                        </div>
                    </div>
                </div>
                </AdminLayout>
        </React.Fragment>
    );
}

export default DSChart;
