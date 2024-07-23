//import useState dan useEffect


import React, { useState, useEffect, useRef } from 'react';
import Api from '../../../api';
import AdminLayout from '../../../layouts/AdminStorage';
import useFormatDate from '../../../components/utilites/useFormatDate';
import DataTable from 'react-data-table-component';

function CashStorageLate() {
    document.title = "AR CASH LATE";

    const [cashstorage, setCashstorage] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();
    const time = 2 * 60 *1000;

    const fetchData = async () => {
        try {
            const response = await Api.get('api/alertcasstoragelate');
            setCashstorage(response.data.data);
            setFilteredData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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
        if (cashstorage.length > 0) {
            playSound();
        } else {
            stopSound();
        }
    }, [cashstorage]);

    useEffect (()=>{
        fetchData();
        const interval = setInterval(() => {
            fetchData();
            console.log("ok");
          }, time);
      
          return () => clearInterval(interval);
    },[]);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    useEffect(() => {
        const lowercasedSearch = search.toLowerCase();
        const filtered = cashstorage.filter(item =>
            // item.TypeDokumen.toLowerCase().includes(lowercasedSearch) ||
          
            item.CustomerName.toLowerCase().includes(lowercasedSearch) ||
            // item.DocNum.toLowerCase().includes(lowercasedSearch) ||
            // item.NoWave.toLowerCase().includes(lowercasedSearch) ||
           
            item.ITEM_DESC.toLowerCase().includes(lowercasedSearch) 
            // item.Total_QTY.toString().toLowerCase().includes(lowercasedSearch) ||
           
            // item.Status.toLowerCase().includes(lowercasedSearch) ||
            // item.erp_order.toLowerCase().includes(lowercasedSearch) ||
            // item.Cabang.toLowerCase().includes(lowercasedSearch) ||
            // (item.DocDate && formatDate(item.DocDate).toLowerCase().includes(lowercasedSearch)) ||
          
            // item.Deadline2.toLowerCase().includes(lowercasedSearch) ||
            // item.Catatan.toLowerCase().includes(lowercasedSearch)
        );
        setFilteredData(filtered);
    }, [search, cashstorage, formatDate]);

    const columns = [
       
       
        { name: 'Customer', selector: row => row.CustomerName, sortable: true },
        { name: 'DocNum', selector: row => row.DocNum, sortable: true },
        { name: 'NoWave', selector: row => row.NoWave, sortable: true },
        { name: 'Item', selector: row => row.ITEM_DESC, sortable: true,width:'400px' },
        { name: 'QTY', selector: row => row.Total_QTY, sortable: true,width:'100px'},
        { name: 'Erp Order', selector: row => row.erp_order, sortable: true },
        { name: 'DocDate', selector: row => row.DocDate ? formatDate(row.DocDate) : 'No Data', sortable: true }, 
        { name: 'Remark', selector: row => row.Catatan, sortable: true }
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#3399FF', // Custom header color
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
            },
        },
    };

    return (
        <React.Fragment>
            <AdminLayout>
                <div className="containers mt-5 mb-5">
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-header">
                                    <span className='font-weight-bold'><i className='fa fa-folder'></i> AR CASH LATE</span>
                                </div>
                                <div className="card-body">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="form-control mb-3"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                    <DataTable
                                        columns={columns}
                                        data={filteredData}
                                        pagination
                                        highlightOnHover
                                        customStyles={customStyles}
                                        noDataComponent={
                                            <div className="alert alert-danger mb-0">
                                                Data Belum Tersedia!
                                            </div>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <audio ref={audioRef} src="/sounds/Alert Voice.mp3" />
                </div>
            </AdminLayout>
        </React.Fragment>
    );
}

export default CashStorageLate;
