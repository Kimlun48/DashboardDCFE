

//import useState dan useEffect
import React, { useState, useEffect,useRef } from 'react';

//import api
import api from '../../api';

//import Link
import { Link } from 'react-router-dom';

import LayoutAdmin from '../../layouts/Admin';

import useFormatDate from '../../components/utilites/useFormatDate';

export default function ReceiptInbIndex() {
    document.title = "ReceiptInbound";

    const{formatDate} = useFormatDate();


    const [cashputstorage, setCashputstorage] = useState([]);

    const time = 2 * 60 * 1000;  

    const fetchData = async () => {
        await api.get('api/cpsv1')
        .then(response => {
            setCashputstorage(response.data.data);
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
        if (cashputstorage.length > 0) {
            playSound();
        } else {
            stopSound();
        }
    }, [cashputstorage]);

    useEffect (()=>{
        fetchData();
        const interval = setInterval(() => {
            fetchData();
            console.log("ok");
          }, time);
      
          return () => clearInterval(interval);
    },[]);
    return (
        <React.Fragment>
           
                {/* <PlaySound /> */}
        <div className="containers mt-5 mb-5">
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm border-top-success">
                        <div className="card-header">
                            <span className='font-weight-bold'><i className='fa fa folder'></i>RECEIPT INBOUND</span>
                            <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead className="bg-light text-white">
                                <tr>
                                                    <th scope='col'>No Document</th>
                                                     <th scope='col'>Type</th>
                                                     <th scope='col'>Item</th>
                                                     <th scope='col'>DESCRIPTION</th>
                                                     <th scope='col'>QTY</th>
                                                     <th scope='col'>UOM</th>
                                                     <th scope='col'>Customer</th>
                                                     <th scope='col'>No Struk</th>
                                                     <th scope='col'>Status</th>
                                                     <th scope='col'>Date</th>
                                                     <th scope='col'>Late</th>
                                                 </tr>
                                </thead>
                                <tbody>
                                {
                                        cashputstorage.length > 0
                                            ?   cashputstorage.map((cashputstorage, index) => (
                                                    <tr key={ index }>
                                                      
                                                      <td>{cashputstorage.NO_DOCUMENT}</td>
                                                           <td>{cashputstorage.TYPE}</td>
                                                             <td>{cashputstorage.ITEM}</td>
                                                             <td>{cashputstorage.DESCRIPTION}</td>
                                                             <td>{cashputstorage.QTY}</td>
                                                             <td>{cashputstorage.UM}</td>
                                                             <td>{cashputstorage.CUSTOMER}</td>
                                                             <td>{cashputstorage.NO_STRUK}</td>
                                                             <td>{cashputstorage.STATUS}</td>
                                                             <td>{formatDate(cashputstorage.START_DATE)}</td>
                                                             <td>{cashputstorage.late}</td>
                                                        
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
       
        </React.Fragment>
    )
}


