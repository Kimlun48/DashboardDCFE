//import useState dan useEffect


import React, { useState, useEffect, useRef } from 'react';
import Api from '../../../api';
import AdminLayout from '../../../layouts/AdminStorage';
import useFormatDate from '../../../components/utilites/useFormatDate';
import DataTable from 'react-data-table-component';

function ReplenishmentLate() {
    document.title = "putawaystoragelate";

    const [replenishment, setreplenishment] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();
    const time = 2 * 60 * 1000;

    const fetchData = async () => {
        try {
            const response = await Api.get('api/replenishmentlate');
            setreplenishment(response.data.data);
            setFilteredData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // useEffect(() => {
    //     fetchData();
    // }, []);

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
        if (replenishment.length > 0) {
            playSound();
        } else {
            stopSound();
        }
    }, [replenishment]);

    useEffect (()=>{
        fetchData();
        const interval = setInterval(() => {
            fetchData();
            console.log("ok");
          }, time);
      
          return () => clearInterval(interval);
    },[]);

    useEffect(() => {
        const lowercasedSearch = search.toLowerCase();
        const filtered = replenishment.filter(item =>
            // item.TypeDokumen.toLowerCase().includes(lowercasedSearch) ||
          
            item.DESCRIPTION.toLowerCase().includes(lowercasedSearch) 
            // item.DocNum.toLowerCase().includes(lowercasedSearch) ||
            // item.NoWave.toLowerCase().includes(lowercasedSearch) ||
           
            // item.ITEM_DESC.toLowerCase().includes(lowercasedSearch) 
            // item.Total_QTY.toString().toLowerCase().includes(lowercasedSearch) ||
           
            // item.Status.toLowerCase().includes(lowercasedSearch) ||
            // item.erp_order.toLowerCase().includes(lowercasedSearch) ||
            // item.Cabang.toLowerCase().includes(lowercasedSearch) ||
            // (item.DocDate && formatDate(item.DocDate).toLowerCase().includes(lowercasedSearch)) ||
          
            // item.Deadline2.toLowerCase().includes(lowercasedSearch) ||
            // item.Catatan.toLowerCase().includes(lowercasedSearch)
        );
        setFilteredData(filtered);
    }, [search, replenishment, formatDate]);

    const columns = [
       
       
        { name: 'Work Unit', selector: row => row.NO_DOCUMENT, sortable: true ,width:'100px' },
        { name: 'Item', selector: row => row.ITEM, sortable: true, width:'150px' },
        { name: 'Description', selector: row => row.DESCRIPTION, sortable: true, width:'400px' },
        { name: 'Qty', selector: row => row.QTY, sortable: true,width:'100px' },
        { name: 'Status', selector: row => row.STATUS, sortable: true },
        { name: 'Start Date', selector: row => row.START_DATE ? formatDate(row.START_DATE) : 'No Data', sortable: true },
        { name: 'Late', selector: row => row.late, sortable: true,width:'80px' },
        // { name: 'DocDate', selector: row => row.DocDate ? formatDate(row.DocDate) : 'No Data', sortable: true }, 
        // { name: 'Remark', selector: row => row.Catatan, sortable: true }
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
                                    <span className='font-weight-bold'><i className='fa fa-folder'></i> REPLENISHMENT LATE</span>
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

export default ReplenishmentLate;