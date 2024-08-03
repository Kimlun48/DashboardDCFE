// //import react  
// import React,{useEffect, useState} from "react";
// import AdminLayout from "../../../../../components/dcv1.2/layouts/adminlayout";
// import useFormatDate from "../../../../../components/utilites/useFormatDate";
// import DataTable from "react-data-table-component";
// import Api from "../../../../../api";
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// function ListPickingReport() {

//     //title page
//     document.title = "admin-listpicking";

//     const [grpo, setGrpo] = useState ([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [search, setSearch] = useState('');
//     const { formatDate } = useFormatDate();
//     const [loading, setLoading] = useState(true);

//     const time = 2 * 60 * 1000; 

//     const fetchData = async () => {
//         try {
//             const response = await Api.get('api/v2listpicking')
//             setGrpo(response.data.data)
//             setFilteredData(response.data.data)
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     }

//     useEffect (() => {
//         fetchData();
//         const interval = setInterval(() => {
//             fetchData();
//             console.log("ok");
//           }, time);
//           return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         const lowercasedSearch = search.toLowerCase();
//         const filtered = grpo.filter(item =>
//             item.ITEM_DESC.toLowerCase().includes(lowercasedSearch)||
//             item.DOCNUM.toLowerCase().includes(lowercasedSearch)||
//             item.WAVENO.toLowerCase().includes(lowercasedSearch)||
//             item.CUSTOMERNAME.toLowerCase().includes(lowercasedSearch)
//         );
//         setFilteredData(filtered);
//     }, [search, grpo]);

//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(filteredData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "CashPicking");
//         const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//         const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
//         saveAs(data, 'Cash Picking report.xlsx');
//     };

//     const columns = [
       
//         { name: 'No Document', selector: row => row.DOCNUM, sortable: true, width:'200px' },
//        // { name: 'No Receipt', selector: row => row.ERP_ORDER, sortable: true ,width:'200px'},  
//         { name: 'Wave', selector: row => row.WAVENO, sortable: true , width:'100px'},
//         { name: 'Status', selector: row => row.STATUS, sortable: true ,width:'200px'},  
//         { name: 'DeadLine', selector: row => row.DEADLINE, sortable: true ,width:'200px'}, 
//         { name: 'Condition', selector: row => row.CONDITION, sortable: true ,width:'200px'},   
//         // { name: 'RECEIPT_DATE', selector: row => row.RECEIPT_DATE ? formatDate(row.RECEIPT_DATE) : 'No Data', sortable: true }, 
//         { name: 'Item', selector: row => row.ITEM, sortable: true ,width:'150px'},  
//         { name: 'Description', selector: row => row.ITEM_DESC, sortable: true ,width:'400px'},
//         { name: 'Av', selector: row => row.AV, sortable: true ,width:'400px'},
//         { name: 'QTY', selector: row => row.TOTAL_QTY, sortable: true ,width:'100px'}, 
//         { name: 'Weight', selector: row => row.WEIGHT, sortable: true ,width:'150px'}, 
//         { name: 'Customer', selector: row => row.CUSTOMERNAME, sortable: true ,width:'300px'}, 
//         // { name: 'Available', selector: row => row.Available ? formatDate(row.DATE_TIME_STAMP_PLUS_7H) : 'No Data', sortable: true }, 
//         { name: 'Remark', selector: row => row.REMARKS, sortable: true ,width:'500px'},
//         { name: 'Remark_2', selector: row => row.REMARKS2, sortable: true ,width:'500px'},
               
//     ];

//     const customStyles = {
//         headCells: {
//             style: {
//                 backgroundColor: '#0e0f65', // Custom header color
//                 color: 'white',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//             },
//         },
//     };

//     return(
//         <React.Fragment>
//             <AdminLayout>
//                 <div className="containers mt-4 mb-5">
//                     <div className="row mt-4">
//                         <div className="col-md-12">
//                             <div className="card border-0 rounded shadow-sm border-top-success">
//                                 <div className="card-header d-flex justify-content-between align-items-center">
//                                     <div>
                                       
//                                         <span className="font-weight-bold">List Picking</span>
                                       
//                                     </div>
//                                 </div>
//                                 <div className="card-body">
//                                  <div className="card-excel">
//                                  <div className="icon" onClick={exportToExcel}>
//                                  <ContentCopyIcon />
//                                  <br />
//                                  To Excel
//                                  </div>
//                                 </div>
//                                     <input
//                                         type="text"
//                                         placeholder="Search"
//                                         className="form-control mb-3"
//                                         value={search}
//                                         onChange={e => setSearch(e.target.value)}
//                                     />
//                                     <DataTable
//                                         columns={columns}
//                                         data={filteredData}
//                                         pagination
//                                         paginationPerPage={5}
//                                         paginationRowsPerPageOptions={[5, 10, 15, 20]}
//                                         highlightOnHover
//                                         customStyles={customStyles}
//                                         noDataComponent={
//                                             <div className="alert alert-danger mb-0">
//                                                 Data Belum Tersedia!
//                                             </div>
//                                         }
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </AdminLayout>
//         </React.Fragment>
//     )
// }

// export default ListPickingReport;
//import react  
// import React, { useEffect, useState } from "react";
// import AdminLayout from "../../../../../components/dcv1.2/layouts/adminlayout";
// import useFormatDate from "../../../../../components/utilites/useFormatDate";
// import DataTable from "react-data-table-component";
// import Api from "../../../../../api";
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { ThreeDots } from 'react-loader-spinner'; // Import loader

// function ListPickingReport() {
//     document.title = "admin-listpicking";

//     const [grpo, setGrpo] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [search, setSearch] = useState('');
//     const { formatDate } = useFormatDate();
//     const [loading, setLoading] = useState(true);
//     const time = 2 * 60 * 1000; 

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             const response = await Api.get('api/v2listpicking');
//             setGrpo(response.data.data);
//             setFilteredData(response.data.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//         const interval = setInterval(() => {
//             fetchData();
//             console.log("ok");
//         }, time);
//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         const lowercasedSearch = search.toLowerCase();
//         const filtered = grpo.filter(item =>
//             item.ITEM_DESC.toLowerCase().includes(lowercasedSearch) ||
//             item.DOCNUM.toLowerCase().includes(lowercasedSearch) ||
//             item.WAVENO.toLowerCase().includes(lowercasedSearch) ||
//             item.CUSTOMERNAME.toLowerCase().includes(lowercasedSearch)
//         );
//         setFilteredData(filtered);
//     }, [search, grpo]);

//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(filteredData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "CashPicking");
//         const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//         const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
//         saveAs(data, 'Cash Picking report.xlsx');
//     };

//     const columns = [
//         { name: 'No Document', selector: row => row.DOCNUM, sortable: true, width: '200px' },
//         { name: 'Wave', selector: row => row.WAVENO, sortable: true, width: '100px' },
//         { name: 'Status', selector: row => row.STATUS, sortable: true, width: '200px' },
//         { name: 'DeadLine', selector: row => row.DEADLINE, sortable: true, width: '200px' },
//         { name: 'Condition', selector: row => row.CONDITION, sortable: true, width: '200px' },
//         { name: 'Item', selector: row => row.ITEM, sortable: true, width: '150px' },
//         { name: 'Description', selector: row => row.ITEM_DESC, sortable: true, width: '400px' },
//         { name: 'Av', selector: row => row.AV, sortable: true, width: '400px' },
//         { name: 'QTY', selector: row => row.TOTAL_QTY, sortable: true, width: '100px' },
//         { name: 'Weight', selector: row => row.WEIGHT, sortable: true, width: '150px' },
//         { name: 'Customer', selector: row => row.CUSTOMERNAME, sortable: true, width: '300px' },
//         { name: 'Remark', selector: row => row.REMARKS, sortable: true, width: '500px' },
//         { name: 'Remark_2', selector: row => row.REMARKS2, sortable: true, width: '500px' },
//     ];

//     const customStyles = {
//         headCells: {
//             style: {
//                 backgroundColor: '#0e0f65',
//                 color: 'white',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//             },
//         },
//     };

//     return (
//         <React.Fragment>
//             <AdminLayout>
//                 <div className="containers mt-4 mb-5">
//                     <div className="row mt-4">
//                         <div className="col-md-12">
//                             <div className="card border-0 rounded shadow-sm border-top-success">
//                                 <div className="card-header d-flex justify-content-between align-items-center">
//                                     <div>
//                                         <span className="font-weight-bold">List Picking</span>
//                                     </div>
//                                 </div>
//                                 <div className="card-body">
//                                     <div className="card-excel">
//                                         <div className="icon" onClick={exportToExcel}>
//                                             <ContentCopyIcon />
//                                             <br />
//                                             To Excel
//                                         </div>
//                                     </div>
//                                     <input
//                                         type="text"
//                                         placeholder="Search"
//                                         className="form-control mb-3"
//                                         value={search}
//                                         onChange={e => setSearch(e.target.value)}
//                                     />
//                                     {loading ? (
//                                         <div className="d-flex justify-content-center">
//                                             <ThreeDots 
//                                                 height="80" 
//                                                 width="80" 
//                                                 radius="9"
//                                                 color="#0e0f65" 
//                                                 ariaLabel="three-dots-loading"
//                                                 visible={true}
//                                             />
//                                         </div>
//                                     ) : (
//                                         <DataTable
//                                             columns={columns}
//                                             data={filteredData}
//                                             pagination
//                                             paginationPerPage={5}
//                                             paginationRowsPerPageOptions={[5, 10, 15, 20]}
//                                             highlightOnHover
//                                             customStyles={customStyles}
//                                             noDataComponent={
//                                                 <div className="alert alert-danger mb-0">
//                                                     Data Belum Tersedia!
//                                                 </div>
//                                             }
//                                         />
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </AdminLayout>
//         </React.Fragment>
//     );
// }

// export default ListPickingReport;
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../../components/dcv1.2/layouts/adminlayout";
import useFormatDate from "../../../../../components/utilites/useFormatDate";
import DataTable from "react-data-table-component";
import Api from "../../../../../api";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


function ListPickingReport() {
    document.title = "admin-listpicking";

    const [grpo, setGrpo] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();
    const [loading, setLoading] = useState(true);
    // const time = 2 * 60 * 1000; 

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await Api.get('api/v2listpicking');
            setGrpo(response.data.data);
            setFilteredData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // const interval = setInterval(() => {
        //     fetchData();
        //     console.log("ok");
        // }, time);
        // return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const lowercasedSearch = search.toLowerCase();
        const filtered = grpo.filter(item =>
            item.ITEM_DESC.toLowerCase().includes(lowercasedSearch) ||
            item.DOCNUM.toLowerCase().includes(lowercasedSearch) ||
           // item.WAVENO.toLowerCase().includes(lowercasedSearch) ||
            item.CUSTOMERNAME.toLowerCase().includes(lowercasedSearch)
        );
        setFilteredData(filtered);
    }, [search, grpo]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "CashPicking");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Cash Picking report.xlsx');
    };

    const columns = [
        { name: 'No Document', selector: row => row.DOCNUM, sortable: true, width: '200px' },
        { name: 'Wave', selector: row => row.WAVENO, sortable: true, width: '100px' },
        { name: 'Status', selector: row => row.STATUS, sortable: true, width: '200px' },
        { name: 'DeadLine', selector: row => row.DEADLINE, sortable: true, width: '200px' },
        { name: 'Condition', selector: row => row.CONDITION, sortable: true, width: '200px' },
        { name: 'Item', selector: row => row.ITEM, sortable: true, width: '150px' },
        { name: 'Description', selector: row => row.ITEM_DESC, sortable: true, width: '400px' },
        { name: 'Av', selector: row => row.AV, sortable: true, width: '400px' },
        { name: 'QTY', selector: row => row.TOTAL_QTY, sortable: true, width: '100px' },
        { name: 'Weight', selector: row => row.WEIGHT, sortable: true, width: '150px' },
        { name: 'Customer', selector: row => row.CUSTOMERNAME, sortable: true, width: '300px' },
        { name: 'Remark', selector: row => row.REMARKS, sortable: true, width: '500px' },
        { name: 'Remark_2', selector: row => row.REMARKS2, sortable: true, width: '500px' },
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#0e0f65',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
            },
        },
    };

    return (
        <React.Fragment>
            <AdminLayout>
                <div className="containers mt-4 mb-5">
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="font-weight-bold">List Picking</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="card-excel">
                                        <div className="icon" onClick={exportToExcel}>
                                            <ContentCopyIcon />
                                            <br />
                                            To Excel
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="form-control mb-3"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                    {loading ? (
                                     <div class="spinner">
                                     <div class="spinner-border"></div>
                                     <img src="/icons/Group 1146.png" alt="Icon" class="icon"></img>
                                   </div>
                                   
                                        
                                    ) : (
                                        <DataTable
                                            columns={columns}
                                            data={filteredData}
                                            pagination
                                            paginationPerPage={5}
                                            paginationRowsPerPageOptions={[5, 10, 15, 20]}
                                            highlightOnHover
                                            customStyles={customStyles}
                                            noDataComponent={
                                                <div className="alert alert-danger mb-0">
                                                    Data Belum Tersedia!
                                                </div>
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
}

export default ListPickingReport;



