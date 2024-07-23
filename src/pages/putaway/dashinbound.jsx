
import React, { useState, useEffect } from 'react';
import api from '../../api';
import AdminLayout from '../../layouts/AdminInbound';
import useFormatDate from '../../components/utilites/useFormatDate';
import DataTable, { createTheme} from 'react-data-table-component';

function DashInboundIndex() {
    // document.title = "RECEIPT ALL";

    const [dashinbound, setDashinbound] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();
    const time = 30 * 60 * 1000; //30 menit
    const fetchData = async () => {
        try {
            const response = await api.get('api/dashinbound');
            setDashinbound(response.data.data);
            setFilteredData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect (()=>{
        fetchData();
        const interval = setInterval(() => {
            fetchData();
            console.log("ok");
          }, time);
      
          return () => clearInterval(interval);
    },[]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const lowercasedSearch = search.toLowerCase();
        const filtered = dashinbound.filter(item =>
            item.NO_DOCUMENT.toLowerCase().includes(lowercasedSearch) ||
            item.ITEM.toLowerCase().includes(lowercasedSearch) ||
            item.DESCRIPTION.toLowerCase().includes(lowercasedSearch) ||
            item.QTY.toString().toLowerCase().includes(lowercasedSearch) ||
            item.AVAILABLE.toString().toLowerCase().includes(lowercasedSearch) ||
            item.STATUS.toLowerCase().includes(lowercasedSearch) ||
            (item.DOC_DATE && formatDate(item.DOC_DATE).toLowerCase().includes(lowercasedSearch)) ||
            (item.DUE_DATE && formatDate(item.DUE_DATE).toLowerCase().includes(lowercasedSearch)) ||
            item.LATE.toString().toLowerCase().includes(lowercasedSearch) ||
            item.CATATAN.toLowerCase().includes(lowercasedSearch)
        );
        setFilteredData(filtered);
    }, [search, dashinbound, formatDate]);

    const columns = [
        { name: 'No.Document', selector: row => row.NO_DOCUMENT, sortable: true, width:'200px' },
        { name: 'Item', selector: row => row.ITEM, sortable: true, width:'150px' },
        { name: 'Description', selector: row => row.DESCRIPTION, sortable: true, width:'450px' },
        { name: 'QTY', selector: row => row.QTY, sortable: true ,width:'100px'},
        { name: 'Available', selector: row => row.AVAILABLE, sortable: true, width:'150px' },
        { name: 'Status', selector: row => row.STATUS, sortable: true, width:'150px' },
        { name: 'Doc Date', selector: row => row.DOC_DATE ? formatDate(row.DOC_DATE) : 'No Data', sortable: true , width:'150px'},
        { name: 'Due Date', selector: row => row.DUE_DATE ? formatDate(row.DUE_DATE) : 'No Data', sortable: true , width:'150px'},
        { name: 'Late', selector: row => row.LATE, sortable: true, width:'100px' },
        { name: 'Remark', selector: row => row.CATATAN, sortable: true, width:'450px' }
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#3399FF',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'normal',
            },
        },
    };

    createTheme('dark', {
        background: {
          default: 'blue',
        },
      });

    return (
        <React.Fragment>
          
                <div className="container mt-5 mb-5">
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                {/* <div className="card-header">
                                    <span className='font-weight-bold'>
                                        <i className='fa fa-folder'></i> Inbound
                                    </span>
                                </div> */}
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
                                        theme="solarized"
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
                  {/* <div className="containers mt-5 mb-5">
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className='font-weight-bold'><i className='fa fa-folder'></i> STORAGE</span>
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
            </div> */}
           
        </React.Fragment>
    );
}

export default DashInboundIndex;

// import React, { useState, useEffect } from 'react';
// import api from '../../api';
// import AdminLayout from '../../layouts/AdminInbound';
// import useFormatDate from '../../components/utilites/useFormatDate';
// import DataTable from 'react-data-table-component';

// function DashInboundIndex() {
//     const [dashinbound, setDashinbound] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [search, setSearch] = useState('');
//     const { formatDate } = useFormatDate();
//     const time = 30 * 60 * 1000; // 30 minutes

//     const fetchData = async () => {
//         try {
//             const response = await api.get('api/dashinbound');
//             setDashinbound(response.data.data);
//             setFilteredData(response.data.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//         const interval = setInterval(() => {
//             fetchData();
//             console.log("Data refreshed");
//         }, time);

//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         const lowercasedSearch = search.toLowerCase();
//         const filtered = dashinbound.filter(item =>
//             item.NO_DOCUMENT.toLowerCase().includes(lowercasedSearch) ||
//             item.ITEM.toLowerCase().includes(lowercasedSearch) ||
//             item.DESCRIPTION.toLowerCase().includes(lowercasedSearch) ||
//             item.QTY.toString().toLowerCase().includes(lowercasedSearch) ||
//             item.AVAILABLE.toString().toLowerCase().includes(lowercasedSearch) ||
//             item.STATUS.toLowerCase().includes(lowercasedSearch) ||
//             (item.DOC_DATE && formatDate(item.DOC_DATE).toLowerCase().includes(lowercasedSearch)) ||
//             (item.DUE_DATE && formatDate(item.DUE_DATE).toLowerCase().includes(lowercasedSearch)) ||
//             item.LATE.toString().toLowerCase().includes(lowercasedSearch) ||
//             item.CATATAN.toLowerCase().includes(lowercasedSearch)
//         );
//         setFilteredData(filtered);
//     }, [search, dashinbound, formatDate]);

//     const columns = [
//         { name: 'No.Document', selector: row => row.NO_DOCUMENT, sortable: true, width:'200px' },
//         { name: 'Item', selector: row => row.ITEM, sortable: true, width:'150px' },
//         { name: 'Description', selector: row => row.DESCRIPTION, sortable: true, width:'450px' },
//         { name: 'QTY', selector: row => row.QTY, sortable: true ,width:'100px'},
//         { name: 'Available', selector: row => row.AVAILABLE, sortable: true, width:'150px' },
//         { name: 'Status', selector: row => row.STATUS, sortable: true, width:'150px' },
//         { name: 'Doc Date', selector: row => row.DOC_DATE ? formatDate(row.DOC_DATE) : 'No Data', sortable: true , width:'150px'},
//         { name: 'Due Date', selector: row => row.DUE_DATE ? formatDate(row.DUE_DATE) : 'No Data', sortable: true , width:'150px'},
//         { name: 'Late', selector: row => row.LATE, sortable: true, width:'100px' },
//         { name: 'Remark', selector: row => row.CATATAN, sortable: true, width:'450px' }
//     ];

//     const customStyles = {
//         headCells: {
//             style: {
//                 backgroundColor: '#3399FF',
//                 color: 'white',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//             },
//         },
//         rows: {
//             style: {
//                 minHeight: '72px', // override the row height
//             },
//         },
//         cells: {
//             style: {
//                 paddingLeft: '8px', // override the cell padding for data cells
//                 paddingRight: '8px',
//             },
//         },
//     };

//     return (
//         <React.Fragment>
//             <div className="container-fluid mt-5 mb-5">
//                 <div className="row mt-4">
//                     <div className="col-md-12">
//                         <div className="card border-0 rounded shadow-sm border-top-success">
//                             <div className="card-header bg-primary text-white">
//                                 <span className='font-weight-bold'>
//                                     <i className='fa fa-folder'></i> Inbound
//                                 </span>
//                             </div>
//                             <div className="card-body">
//                                 <input
//                                     type="text"
//                                     placeholder="Search"
//                                     className="form-control mb-3"
//                                     value={search}
//                                     onChange={e => setSearch(e.target.value)}
//                                 />
//                                 <DataTable
//                                     columns={columns}
//                                     data={filteredData}
//                                     pagination
//                                     highlightOnHover
//                                     customStyles={customStyles}
//                                     noDataComponent={
//                                         <div className="alert alert-danger mb-0">
//                                             Data Belum Tersedia!
//                                         </div>
//                                     }
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// }

// export default DashInboundIndex;
