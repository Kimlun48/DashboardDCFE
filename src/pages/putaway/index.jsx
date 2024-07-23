//import useState dan useEffect


import React, { useState, useEffect } from 'react';

//import api
import Api from '../../api';

//import Link
import { Link } from 'react-router-dom';

import AdminLayout from '../../layouts/AdminInbound';

import useFormatDate from '../../components/utilites/useFormatDate';

import DataTable from 'react-data-table-component';



function PutAwayIndex() {

    document.title = "ReceiptInbound";

    const [putaway, setPutaway] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();

const fetchData = async () => {
    try {
        const response = await Api.get('api/putaway');
        setPutaway(response.data.data);
        setFilteredData(response.data.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const time = 2 * 60 * 1000; 

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
    const filtered = putaway.filter(item =>
        // item.TypeDokumen.toLowerCase().includes(lowercasedSearch) ||
      
       // item.CustomerName.toLowerCase().includes(lowercasedSearch) ||
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
}, [search, putaway, formatDate]);

const columns = [
   
   
    { name: 'Item', selector: row => row.ITEM, sortable: true,width:'150px' },
    { name: 'Description', selector: row => row.ITEM_DESC, sortable: true , width:'450px'},
    { name: 'QTY', selector: row => row.TOTAL_QTY, sortable: true , width:'100px'},
    { name: 'UOM', selector: row => row.OPEN_QTY, sortable: true , width:'100px'},
    { name: 'Status', selector: row => row.STATUS, sortable: true , width:'150px'},
    { name: 'To Location', selector: row => row.TO_LOCATION, sortable: true , width:'200px'},
    { name: 'No Container', selector: row => row.CONTAINER_ID, sortable: true , width:'200px'},
    { name: 'Receipt Date', selector: row => row.RECEIPT_DATE ? formatDate(row.RECEIPT_DATE) : 'No Data', sortable: true }, 
    { name: 'Late', selector: row => row.LATE, sortable: true ,width:'100px'},
    
    
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
                                <span className='font-weight-bold'><i className='fa fa-folder'></i> RECEIPT INBOUND ALL</span>
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
            </div>
        </AdminLayout>
    </React.Fragment>
);
}


export default PutAwayIndex