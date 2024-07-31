
import React, { useState, useEffect, useRef } from 'react';

//import api
import Api from '../../api';



import AdminLayout from '../../layouts/AdminInbound';

import useFormatDate from '../../components/utilites/useFormatDate';

import DataTable from 'react-data-table-component';



function DeliveStockLate() {

    document.title = "INDELIVESTOCK";

    const [indelivestock, setindelivestock] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();
    const time = 2 * 60 * 1000; 

const fetchData = async () => {
    try {
        const response = await Api.get('api/indelivestock');
        setindelivestock(response.data.data);
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
        if (indelivestock.length > 0) {
            playSound();
        } else {
            stopSound();
        }
    }, [indelivestock]);

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
    const filtered = indelivestock.filter(item =>
        
       
        item.ITEM_DESC.toLowerCase().includes(lowercasedSearch) 
       
    );
    setFilteredData(filtered);
}, [search, indelivestock, formatDate]);

const columns = [
   
   
    { name: 'No Document', selector: row => row.DocNum, sortable: true,width:'200px' },
    { name: 'Item', selector: row => row.ITEM, sortable: true, width:'200px' },
    { name: 'Description', selector: row => row.ITEM_DESC, sortable: true , width:'450px'},
    { name: 'QTY', selector: row => row.Total_Qty, sortable: true , width:'100px'},
    { name: 'Stock Available', selector: row => row.Available, sortable: true , width:'100px'},
    { name: 'Dock Date', selector: row => row.DocDate ? formatDate(row.DocDate) : 'No Data', sortable: true }, 
    { name: 'Late', selector: row => row.Deadline, sortable: true ,width:'100px'},
    { name: 'Remark', selector: row => row.Catatan, sortable: true ,width:'400px'},
    
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
                                <span className='font-weight-bold'><i className='fa fa-folder'></i> INDELIVESTOCK ALL</span>
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
                <audio ref={audioRef} src="/sounds/notification.mp3" />
            </div>
        </AdminLayout>
    </React.Fragment>
);
}


export default DeliveStockLate