//import useState dan useEffect


import React, { useState, useEffect } from 'react';

//import api
import api from '../../api';

import Api from '../../api';

//import Link
import { Link } from 'react-router-dom';


import AdminLayout from '../../layouts/AdminInbound';

import useFormatDate from '../../components/utilites/useFormatDate';



import DataTable from 'react-data-table-component';



function IlsIndex() {

    document.title = "CROSSDOCK";

    const [ilssp, setIlssp] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();

const fetchData = async () => {
    try {
        const response = await Api.get('api/ilssp');
        setIlssp(response.data.data);
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
    const filtered = ilssp.filter(item =>
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
}, [search, ilssp, formatDate]);

const columns = [
   
   
    { name: 'Item', selector: row => row.item, sortable: true,width:'200px' },
    { name: 'Desc', selector: row => row.ITEM_DESC, sortable: true, width:'400px' },
    { name: 'QTY', selector: row => row.qty, sortable: true , width:'100px'},
    { name: 'Entry Date', selector: row => row.latest_date_time_stamp ? formatDate(row.latest_date_time_stamp) : 'No Data', sortable: true }, 
    { name: 'Late', selector: row => row.late, sortable: true ,width:'100px'},
    
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
                                <span className='font-weight-bold'><i className='fa fa-folder'></i> CROSSDOCK ALL</span>
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



 // const fetchDataIls = async () => {
    //     await api.get('api/ilssp')
    //     .then(response => {
    //         setIlssp(response.data.data);
    //         console.log('API response:', response.data.data);
            
    //     })
        
    // }
    // const {formatDate} = useFormatDate();

    // useEffect (()=>{
    //     fetchDataIls();
       
    // },[]);



//     const fetchData = async () => {
//         try {
//             const response = await Api.get('api/ilssp');
//             setCashstorage(response.data.data);
//             setFilteredData(response.data.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

    
//     return (
//         <React.Fragment>
//             <AdminLayout>
//             <div className="containers mt-5 mb-5">
//             <div className="row mt-4">
//                 <div className="col-md-12">
//                     <div className="card border-0 rounded shadow-sm border-top-success">
//                         <div className="card-header">
//                             <span className='font-weight-bold'><i className='fa fa folder'></i> CROSSDOCK ALL</span>
//                             <div className="table-responsive">
//                             <table className="table table-bordered">
//                                 <thead className="bg-light text-white">
//                                     <tr>
                                       
//                                         <th scope='col'>Item</th>
//                                         <th scope='col'>Desc</th>
//                                         <th scope='col'>QTY</th>
//                                         <th scope='col'>Entry Date</th>
//                                         <th scope='col'>Late</th>

//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                 {
//                                         ilssp.length > 0
//                                         ?   ilssp.map((ils, index) => (
//                                                 <tr key={ index }>
                                                    
//                                                     <td>{ils.item}</td>
//                                                     <td>{ils.ITEM_DESC }</td>
//                                                     <td>{ils.qty }</td>
//                                                     <td>{formatDate(ils.latest_date_time_stamp)}</td>
//                                                     {/* <td>{ils.latest_date_time_stamp}</td> */}
//                                                     <td>{ils.late}</td>
                                                    
//                                                 </tr>
//                                             ))

//                                         :   <tr>
//                                                 <td colSpan="4" className="text-center">
//                                                     <div className="alert alert-danger mb-0">
//                                                         Data Belum Tersedia!
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                     }
                                           
//                                 </tbody>
//                             </table>
//                         </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </AdminLayout>
//         </React.Fragment>
//     )
// }
export default IlsIndex