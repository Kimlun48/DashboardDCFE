//import useState dan useEffect
import React, { useState, useEffect,useRef } from 'react';

//import api
import Api from '../../api';

//import Link
import { Link } from 'react-router-dom';

import LayoutAdmin from '../../layouts/Admin';

import useFormatDate from '../../components/utilites/useFormatDate';

export default function AlertCash() {
    document.title = "ALERTCASH";

    const{formatDate} = useFormatDate();

    const [alertcash, setAlertCash] = useState([]);

    const fetchDataAlertcash = async () => {
        await Api.get('api/alertcash')
        .then(response => {
            setAlertCash(response.data.data);
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
        if (alertcash.length > 0) {
            playSound();
        } else {
            stopSound();
        }
    }, [alertcash]);

    useEffect (()=>{
        fetchDataAlertcash();
        const interval = setInterval(() => {
            fetchDataAlertcash();
            console.log("ok");
          }, 30000);
      
          return () => clearInterval(interval);
    },[]);
    return (
        <React.Fragment>
            <LayoutAdmin>
                {/* <PlaySound /> */}
        <div className="containers mt-5 mb-5">
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm border-top-success">
                        <div className="card-header">
                            <span className='font-weight-bold'><i className='fa fa folder'></i>ALERTCASH</span>
                            <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead className="bg-light text-white">
                                    <tr>
                                       
                                        <th scope='col'>Document Number</th>
                                        <th scope='col'>Branch</th>
                                        <th scope='col'>Nowave</th>
                                        <th scope='col'>Item Desc</th>
                                        <th scope='col'>Total QTY</th>
                                        <th scope='col'>Time </th>
                                        <th scope='col'>No Order</th>
                                        <th scope='col'>status</th>
                                        <th scope='col'>Remark</th>

                                    </tr>
                                </thead>
                                <tbody>
                                {
                                        alertcash.length > 0
                                            ?   alertcash.map((alertcash, index) => (
                                                    <tr key={ index }>
                                                      
                                                        <td>{alertcash.DocNum}</td>
                                                        <td>{alertcash.Cabang}</td>
                                                        <td>{alertcash.NoWave }</td>
                                                        <td>{alertcash.ITEM_DESC}</td>
                                                        <td>{alertcash.Total_QTY}</td>
                                                        <td>{alertcash.Jam}</td>
                                                        <td>{alertcash.erp_order}</td>
                                                        <td>{alertcash.Status}</td>
                                                        <td>{alertcash.Catatan}</td>
                                                        
                                                    </tr>
                                                ))

                                            :   <tr>
                                                    <td colSpan="4" className="text-center">
                                                        <div className="alert alert-danger mb-0">
                                                            Data Belum Tersedia!
                                                        </div>
                                                    </td>
                                                </tr>
                                    }
                                           
                                </tbody>
                                <audio ref={audioRef} src="/sounds/Alert Voice.mp3" />
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </LayoutAdmin>
        </React.Fragment>
    )
}