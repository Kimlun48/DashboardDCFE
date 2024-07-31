

import React, { useState, useEffect } from 'react';

//import api
import Api from '../../api';

//import Link
import { Link } from 'react-router-dom';



import AdminLayout from '../../layouts/AdminInbound';

import useFormatDate from '../../components/utilites/useFormatDate';

import DataTable from 'react-data-table-component';



function IlsUnLate() {

    document.title = "Crosdock On Times";

    const [ilssp, setIlssp] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();

const fetchData = async () => {
    try {
        const response = await Api.get('api/unlate');
        setIlssp(response.data.data);
        setFilteredData(response.data.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

useEffect(() => {
    fetchData();
}, []);

useEffect(() => {
    const lowercasedSearch = search.toLowerCase();
    const filtered = ilssp.filter(item =>
     
        item.ITEM_DESC.toLowerCase().includes(lowercasedSearch)    
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
                                <span className='font-weight-bold'><i className='fa fa-folder'></i> CROSSDOCK ON TIMES</span>
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




//     const [ilsunlate, setIlsunlate] = useState([]);

//     const {formatDate} = useFormatDate(); 

//     const fetchDataIls = async () => {
//         await api.get('api/unlate')
//         .then(response => {
//             setIlsunlate(response.data.data);
//         })
//     }
//     useEffect (()=>{
//         fetchDataIls();
//     },[]);
//     return (
//         <React.Fragment>
//             <AdminLayout>
      

// <div className="containers mt-5 mb-5">
//             <div className="row mt-4">
//                 <div className="col-md-12">
//                     <div className="card border-0 rounded shadow-sm border-top-success">
//                         <div className="card-header">
//                             <span className='font-weight-bold'><i className='fa fa folder'></i> CROSSDOCK ON TIME</span>
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
//                                          ilsunlate.length > 0
//                                          ?   ilsunlate.map((ilsunlate, index) => (
//                                                  <tr key={ index }>
                                                     
//                                                      <td>{ilsunlate.item}</td>
//                                                      <td>{ilsunlate.ITEM_DESC }</td>
//                                                      <td>{ilsunlate.qty }</td>
//                                                      <td>{formatDate(ilsunlate.latest_date_time_stamp)}</td>
//                                                      <td>{ilsunlate.late}</td>
                                                     
//                                                  </tr>
//                                              ))

//                                          :   <tr>
//                                                  <td colSpan="4" className="text-center">
//                                                      <div className="alert alert-danger mb-0">
//                                                          Data Belum Tersedia!
//                                                      </div>
//                                                  </td>
//                                              </tr>
//                                     }
                                           
//                                 </tbody>
//                             </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </AdminLayout>
//         </React.Fragment>
//     )
// }
export default IlsUnLate