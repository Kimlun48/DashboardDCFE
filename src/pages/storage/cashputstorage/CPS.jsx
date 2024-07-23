import React, { useState, useEffect, useRef } from 'react';
import api from '../../../api';
import LayoutAdmin from '../../../layouts/Admin';
import useFormatDate from '../../../components/utilites/useFormatDate';
//import '../../App.css'; // Import your CSS file here

function CpsIndex() {
    document.title = "CASHPUTSTORAGE ALL";

    const tableRef = useRef(null);


    const [cashputstorage, setCashputstorage] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [intervalCount, setIntervalCount] = useState(0);

    const fetchData = async () => {
        try {
            const response = await api.get('api/cashputstorage');
            setCashputstorage(response.data.data);
            console.log('API response:', response.data.data);
            setLoaded(true); // Set loaded to true once data is fetched
            setIntervalCount(intervalCount + 1); // Increment interval count
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const { formatDate } = useFormatDate();

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
            console.log("Interval ok");
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const table = tableRef.current;
        let scrollAmount = 0;
        const scrollStep = 2; // Kecepatan scroll, semakin besar nilainya semakin cepat scrollnya
        const delay = 50; // Waktu delay dalam milidetik antara setiap scroll

        const scrollTable = () => {
            if (table) {
                scrollAmount += scrollStep;
                if (scrollAmount >= table.scrollHeight - table.clientHeight) {
                    scrollAmount = 0; // Reset ke atas ketika mencapai akhir
                }
                table.scrollTop = scrollAmount;
            }
        };

        const intervalId = setInterval(scrollTable, delay);

        return () => clearInterval(intervalId); // Membersihkan interval saat komponen tidak digunakan
    }, []);

    return (
        <React.Fragment>
           
                <div className="containers mt-5 mb-5">
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-header">
                                    <span className='font-weight-bold'>STORAGE ALL</span>
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
                                                    <th scope='col'>Condition</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cashputstorage.length > 0
                                                    ? cashputstorage.map((item, index) => (
                                                        <tr key={index} className={`fade-in interval-${intervalCount}`}>
                                                            <td>{item.NO_DOCUMENT}</td>
                                                            <td>{item.TYPE}</td>
                                                            <td>{item.ITEM}</td>
                                                            <td>{item.DESCRIPTION}</td>
                                                            <td>{item.QTY}</td>
                                                            <td>{item.UM}</td>
                                                            <td>{item.CUSTOMER}</td>
                                                            <td>{item.NO_STRUK}</td>
                                                            <td>{item.STATUS}</td>
                                                            <td>{formatDate(item.START_DATE)}</td>
                                                            <td>{item.late}</td>
                                                            <td>{item.CONDITION}</td>
                                                        </tr>
                                                    ))
                                                    : <tr>
                                                        <td colSpan="11" className="text-center">
                                                            <div className="alert alert-danger mb-0">
                                                                Data Belum Tersedia!
                                                            </div>
                                                        </td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='remart'>
                    
                    
                </div>
           
        </React.Fragment>
    );
}

export default CpsIndex;