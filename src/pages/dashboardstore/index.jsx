import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Wave } from 'react-animated-text';
import { FaCheckCircle } from 'react-icons/fa';
import Api from '../../api';
// import FooterDc from '../../components/footer';
// import FooterText from '../../components/utilites/FooterRunText';

function DashboardStoreIndex() {
    document.title = "dashboardstore";

    const [dashboardstore, setDashboardStore] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
 
    const fetchData = async () => {
        // try {
        //     const response = await Api.get('api/dashboardstore');
        //     setDashboardStore(response.data.data);
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        // }
        try {
            const response = await Api.get('api/dashboardstore');
            //buat pesanan sudah bisa di ambil naik ke atas
            const sortedData = response.data.data.sort((a, b) => {
                return b["PESANAN_SUDAH_BISA_DIAMBIL"].localeCompare(a["PESANAN_SUDAH_BISA_DIAMBIL"]);
            });
            setDashboardStore(sortedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const speak = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'id-ID';
        window.speechSynthesis.speak(speech);
    };

    const stopSpeech = () => {
        window.speechSynthesis.cancel();
    };

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setCurrentDate(`${day}/${month}/${year}`);
            setCurrentTime(`${hours}:${minutes}`);
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    const time = 2 * 60 * 1000;

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
            console.log("Data fetched");
        }, time);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        dashboardstore.forEach(row => {
            if (row["PESANAN_SUDAH_BISA_DIAMBIL"] === 'Y') {
                speak(`Order ${row.NOSTRUK} sudah bisa di ambil.`);
            }
        });
        return()=>{
            stopSpeech();
        }
        
    }, [dashboardstore]);

    const columns = [
        {
            name: 'RECEIPT NO',
            selector: row => (
                <div style={{ color: '#FE8D25', fontWeight:'bold', fontSize:'26px' }}> {/* Change 'red' to your desired color */}
                    {row.NOSTRUK}
                </div>
            ),
            center: true,
            width: '350px',
            
            
        },
        {
            name: 'ORDER RECEIVED',
            selector: row => row["PESANAN_DI_TERIMA"],
            cell: row => (
                <div>
                    {row["PESANAN_DI_TERIMA"] === 'N' && <FaCheckCircle style={{ color: '#D8F7D5AB', marginLeft: '5px' }} size={30} />}
                    {row["PESANAN_DI_TERIMA"] === 'Y' && <FaCheckCircle style={{ color: '#31D622', marginLeft: '5px' }} size={30} />}
                </div>
            ),
            center: true
        },
        {
            name: 'BEING PROCESSED',
            selector: row => row["PESANAN_SEDANG_DI_SIAPKAN"],
            cell: row => (
                <div>
                    {row["PESANAN_SEDANG_DI_SIAPKAN"] === 'N' && <FaCheckCircle style={{ color: '#D8F7D5AB', marginLeft: '5px' }} size={30} />}
                    {row["PESANAN_SEDANG_DI_SIAPKAN"] === 'Y' && <FaCheckCircle style={{ color: '#31D622', marginLeft: '5px' }} size={30} />}
                </div>
            ),
            center: true
        },
        {
            name: 'READY TO PICK UP',
            selector: row => row["PESANAN_SUDAH_BISA_DIAMBIL"],
            cell: row => (
                <div>
                    {row["PESANAN_SUDAH_BISA_DIAMBIL"] === 'N' && <FaCheckCircle style={{ color: '#D8F7D5AB', marginLeft: '5px' }} size={30} />}
                    {row["PESANAN_SUDAH_BISA_DIAMBIL"] === 'Y' && <FaCheckCircle style={{ color: '#31D622', marginLeft: '5px' }} size={30} />}
                </div>
            ),
            // width: '200px',
            center: true
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#8B8B8B',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'normal'
            },
        },
        rows: {
            style: {
                minHeight: '90px',
                backgroundColor: '#24292F',
                color: 'white',
                fontSize: '20px',
                justifyContent: 'center'
            },
        },
        cells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px'
            },
        },
    };

    return (
        <React.Fragment>
            <div className="full-body-container">
                <div className="container mt-5 mb-5 custom-background">
                    <div className="datetime-container">
                        <span id="current-time" className="current-time">{currentDate}</span>
                        <span id="current-time" className="current-time">{currentTime}</span>
                    </div>
                    <div className="time-container text-right">
                        <h1 className="title">RKM STORE WAITING LIST CASH & CARRY</h1>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            {/* <div className="card border-0 rounded shadow-sm border-top-success"> */}
                                <div className="card-body">
                                    <DataTable
                                        columns={columns}
                                        data={dashboardstore}
                                        customStyles={customStyles}
                                        noDataComponent={
                                            <div className="alert alert-primary mb-0">
                                                <Wave text="Data Belum Tersedia!" effect="stretch" effectChange={4.0} />
                                            </div>
                                        }
                                    />
                                {/* </div> */}
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
              
            </div>
            {/* < FooterText speed={5} /> */}
           
        </React.Fragment>
    );
}

export default DashboardStoreIndex;
