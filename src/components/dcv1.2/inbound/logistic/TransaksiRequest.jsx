import React, { useEffect, useState } from "react";
import useFormatDate from "../../../utilites/useFormatDate";
import DataTable from "react-data-table-component";
import Api from "../../../../api";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FormatTime from "../../../utilites/FormatTime";
import moment from 'moment-timezone';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Modal, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function TransaksiRequest() {
    const [transaksirequest, setTransaksiRequest] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();
    const { formatTime } = FormatTime();
    const convertToGMT7 = (date) => {
        return moment(date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    };
    const [showModal, setShowModal] = useState(false);
    const [transaksiLogDoc, setTransaksiLogDoc] = useState([]);

    const fetchData = async () => {
        try {
            const response = await Api.get('api/transaksireq');
            setTransaksiRequest(response.data.data);
            setFilteredData(response.data.data);
            console.log('API Response transaksireq:', response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const lowercasedSearch = search.toLowerCase();
        const filtered = transaksirequest.filter(item => {
            const idReq = item.id_req ? String(item.id_req) : '';
           // const idJadwal = item.id_req ? item.id_req.toLowerCase() : '';
            const namaVendor = item.nama_vendor ? item.nama_vendor.toLowerCase() : '';
            const suratJalan = item.surat_jalan ? item.surat_jalan.toLowerCase() : '';
            const status = item.status ? item.status.toLowerCase() : '';
        
            return idReq.includes(lowercasedSearch) ||
                   namaVendor.includes(lowercasedSearch) ||
                   suratJalan.includes(lowercasedSearch) ||
                   status.includes(lowercasedSearch);
        });
        
        setFilteredData(filtered);
    }, [search, transaksirequest]);

    const updatedFilteredData = filteredData.map(item => ({
        ...item,
        updated_at: item.updated_at ? convertToGMT7(item.updated_at) : ''
    }));

    const exportToExcel = () => {
        const exportData = updatedFilteredData.map(item => ({
            'Vendor': item.nama_vendor,
            'No Receipt': item.surat_jalan,
            'Status': item.status,
            'Driver': item.sopir,
            'Truck': item.nama_kendaraan,
            'Booking Date': item.schedule.hari ? formatDate(item.schedule.hari) : 'No Data',
            'Booking Time': item.schedule.mulai,
            'Date CI Security': item.date_arrived ? formatDate(item.date_arrived) : 'No Data',
            'Time CI Security': item.date_arrived ? moment(item.date_arrived).format('HH:mm:ss') : 'No Data',
            'Date CI Inbound': item.date_loading_goods ? formatDate(item.date_loading_goods) : 'No Data',
            'Time CI Inbound': item.date_loading_goods ? moment(item.date_loading_goods).format('HH:mm:ss') : 'No Data',
            'Date CO Inbound': item.date_completed ? formatDate(item.date_completed) : 'No Data',
            'Time CO Inbound': item.date_completed ? moment(item.date_completed).format('HH:mm:ss') : 'No Data',
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "shipping vendor");

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'shipping_vendor_report.xlsx');
    };

    const columns = [
        { name: 'Booking ID', selector: row => row.id_req, sortable: true, width: '150px' },
        { name: 'Vendor', selector: row => row.nama_vendor, sortable: true, width: '350px' },
        { name: 'Status', selector: row => row.status, sortable: true, width: '150px' },
        { name: 'Date Boking', selector: row => row.schedule?.hari ? formatDate(row.schedule.hari) : 'No Data', sortable: true, width: '140px' },
        { name: 'Jam Boking', selector: row => row.schedule?.mulai ? row.schedule.mulai : 'No Data', sortable: true, width: '140px' },
        { name: 'Date CI Security', selector: row => row.date_arrived ? formatDate(row.date_arrived) : 'No Data', sortable: true, width: '200px' },
        { name: 'Time CI Security', selector: row => row.date_arrived ? moment(row.date_arrived).format('HH:mm:ss') : 'No Data', sortable: true, width: '200px' },
        { name: 'Date CI Inbound', selector: row => row.date_loading_goods ? formatDate(row.date_loading_goods) : 'No Data', sortable: true, width: '200px' },
        { name: 'Time CI Inbound', selector: row => row.date_loading_goods ? moment(row.date_loading_goods).format('HH:mm:ss') : 'No Data', sortable: true, width: '200px' },
        { name: 'Date CO Inbound', selector: row => row.date_completed ? formatDate(row.date_completed) : 'No Data', sortable: true, width: '200px' },
        { name: 'Time CO Inbound', selector: row => row.date_completed ? moment(row.date_completed).format('HH:mm:ss') : 'No Data', sortable: true, width: '200px' },
        { name: 'Date CO Security', selector: row => row.date_checkout_security ? formatDate(row.date_checkout_security) : 'No Data', sortable: true, width: '200px' },
        { name: 'Time CO Security', selector: row => row.date_checkout_security ? moment(row.date_checkout_security).format('HH:mm:ss') : 'No Data', sortable: true, width: '200px' },
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#0e0f65',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'normal',
            },
        },
        rows: {
            style: {
                backgroundColor: '#f2f2f2',
                '&:nth-of-type(odd)': {
                    backgroundColor: '#e6e6e6',
                },
                fontSize: '14px',
                color: '#333',
            },
        },
    };

    // const handleRowClick = async (id_req) => {
    //     try {
    //         const response = await Api.get(`api/transaksilogdoc/${id_req}`);
    //         setTransaksiLogDoc(response.data.data);
    //         setShowModal(true);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error('Error fetching request transaksi data:', error);
    //     }
    // };
    // const handleRowClick = async (id_req) => {
    //     try {
    //         const response = await Api.get(`api/transaksilogdoc/${id_req}`);
    //         console.log(response.data); // Untuk memastikan bahwa datanya ada
    //         setTransaksiLogDoc(response.data.data);
    //         console.log(transaksiLogDoc); // Pastikan state diperbarui
    //         setShowModal(true);
    //     } catch (error) {
    //         console.error('Error fetching request transaksi data:', error);
    //     }
    // };
    // useEffect(() => {
    //     if (transaksiLogDoc.length > 0) {
    //         console.log('Updated transaksiLogDoc:', transaksiLogDoc); // Pastikan state sudah di-update
    //     }
    // }, [transaksiLogDoc]);
    const handleRowClick = async (id_req) => {
        try {
            const response = await Api.get(`api/transaksilogdoc/${id_req}`);
            console.log('Response data:', response.data); // Cek struktur data
            setTransaksiLogDoc(response.data.data[0].logdoc); // Simpan logdoc ke state
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching request transaksi data:', error);
        }
    };
    useEffect(() => {
        if (transaksiLogDoc.length > 0) {
            console.log('Updated transaksiLogDoc:', transaksiLogDoc);
        }
    }, [transaksiLogDoc]);
    
    
    

    return (
        <React.Fragment>
            <div className="containers mt-4 mb-5">
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
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
                                    onRowClicked={row => handleRowClick(row.id_req)} // Menangani klik baris
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

         

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Request Transaksi</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {Array.isArray(transaksiLogDoc) && transaksiLogDoc.length > 0 ? (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Driver</th>
            <th>ID Booking</th>
            <th>No PO</th>
            <th>No SJ</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Qty</th>
            <th>UoM</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {transaksiLogDoc.map((logdoc) => (
            <tr key={logdoc.id}> 
              <td>{logdoc.cp_driver}</td>
              <td>{logdoc.id_trans_req}</td>
              <td>{logdoc.no_po}</td> 
              <td>{logdoc.no_sj}</td>
              <td>{logdoc.kode_barang}</td>
              <td>{logdoc.nama_barang}</td>
              <td>{logdoc.qty}</td>
              <td>{logdoc.uom}</td>
              <td>{logdoc.keterangan}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      <div>No data available</div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


        </React.Fragment>
    );
}

export default TransaksiRequest;





// import React,{useEffect, useState} from "react";
// import useFormatDate from "../../../utilites/useFormatDate";
// import DataTable from "react-data-table-component";
// import Api from "../../../../api";
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import FormatTime from "../../../utilites/FormatTime";
// import moment from 'moment-timezone';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { Modal, Button, Table} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';


// function TransaksiRequest() {
//     const [transaksirequest, setTransaksiRequest] = useState ([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [search, setSearch] = useState('');
//     const { formatDate } = useFormatDate();
//     const { formatTime } = FormatTime();
//     const convertToGMT7 = (date) => {
//         return moment(date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
//     };
//     const [showModal, setShowModal] = useState(false);
//     const [transaksiLogDoc, setTransaksiLogDoc] = useState([]);

//    // const time = 2 * 60 * 1000; 

//     const fetchData = async () => {
//         try {
//             const response = await Api.get('api/transaksireq')
//             setTransaksiRequest(response.data.data)
//             setFilteredData(response.data.data)
//             console.log('API Response transaksireq:', response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     }

//     useEffect (() => {
//         fetchData();
       
//     }, []);

//     useEffect(() => {
//         const lowercasedSearch = search.toLowerCase();
//         const filtered = transaksirequest.filter(item => {
//             const namaVendor = item.nama_vendor ? item.nama_vendor.toLowerCase() : '';
//             const suratJalan = item.surat_jalan ? item.surat_jalan.toLowerCase() : '';
//             const status = item.status ? item.status.toLowerCase() : '';
        
//             return namaVendor.includes(lowercasedSearch) ||
//                    suratJalan.includes(lowercasedSearch) ||
//                    status.includes(lowercasedSearch);
//         });
        
//         setFilteredData(filtered);
//     }, [search, transaksirequest]);

//     const updatedFilteredData = filteredData.map(item => ({
//         ...item,
//         updated_at: item.updated_at ? convertToGMT7(item.updated_at) : ''
//     }));

//     const exportToExcel = () => {
//         // Menyiapkan data yang akan diekspor
//         const exportData = updatedFilteredData.map(item => {
//             // Fungsi untuk memformat waktu dengan pemeriksaan validitas
//             // const safeFormatDate = date => date ? formatDate(date) : 'No Data';
//             // const safeFormatTime = date => date ? moment(date).format('HH:mm:ss') : 'No Data';
    
//             return {
//                 'Vendor': item.nama_vendor,
//                 'No Receipt': item.surat_jalan,
//                 'Status': item.status,
//                 'Driver': item.sopir,
//                 'Truck': item.nama_kendaraan,
//                 'Booking Date': item.schedule.hari ? formatDate(item.schedule.hari) : 'No Data',
//                 'Booking Time': item.schedule.mulai ,
//                 'Date CI Security': item.date_arrived ? formatDate(item.date_arrived) : 'No Data',
//                 'Time CI Security': item.date_arrived ? moment(item.date_arrived).format('HH:mm:ss') : 'No Data',
//                 'Date CI Inbound': item.date_loading_goods ? formatDate(item.date_loading_goods) : 'No Data',
//                 'Time CI Inbound': item.date_loading_goods ? moment(item.date_loading_goods).format('HH:mm:ss') : 'No Data',
//                 'Date CO Inbound': item.date_completed ? formatDate(item.date_completed) : 'No Data',
//                 'Time CO Inbound': item.date_completed ? moment(item.date_completed).format('HH:mm:ss') : 'No Data',
//             };
//         });
    
//         // Membuat worksheet dan workbook
//         const worksheet = XLSX.utils.json_to_sheet(exportData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "shipping vendor");
    
//         // Menulis file excel
//         const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//         const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
//         saveAs(data, 'shipping_vendor_report.xlsx');
//     };
    

//     const accordionStyle = {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: '10px', // Jarak antara kolom
// };

// const columnStyle = {
//     borderLeft: '1px solid #ddd', // Garis pemisah vertikal
//     paddingLeft: '10px',
//     paddingRight: '10px',
// };

// const noBorderLeft = {
//     paddingLeft: '0',
// };


   
//     // const columns = [
//     //     { name: 'Vendor', selector: row => row.nama_vendor, sortable: true, width: '400px' },
//     //     // { name: 'No Receipt', selector: row => row.surat_jalan, sortable: true, width: '300px' },
//     //     // { name: 'Status', selector: row => row.status, sortable: true, width: '150px' },
//     //     {
//     //         name: 'Details',
//     //         cell: row => (
//     //             <Accordion style={{ width: '100%' }}>
//     //                 <AccordionSummary
//     //                     expandIcon={<ExpandMoreIcon />}
//     //                     aria-controls={`panel-content-${row.id_req}`}
//     //                     id={`panel-header-${row.id_req}`}
//     //                     style={{ minWidth: '500px' }} // Mengatur lebar minimum summary
//     //                 >
//     //                     View Details
//     //                 </AccordionSummary>
//     //                 <AccordionDetails style={{ width: '100%' }}>
//     //                     <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
//     //                         <div style={{ flex: 1, paddingRight: '10px' }}>
//     //                             <p><strong>Status:</strong> {row.status}</p>
//     //                             <p><strong>Driver:</strong> {row.sopir}</p>
//     //                             <p><strong>Booking Date:</strong> {row.schedule.hari ? formatDate(row.schedule.hari): 'No Data'} </p>
//     //                             <p><strong>Booking Time:</strong> {row.schedule.mulai} </p>
//     //                             <p><strong>Date CI Inbound:</strong> {row.date_loading_goods ? formatDate(row.date_loading_goods) : 'No Data'}</p>
//     //                             <p><strong>Time CI Inbound:</strong> {row.date_loading_goods && moment(row.date_loading_goods).format('HH:mm:ss')}</p>
//     //                         </div>
//     //                         <div style={{ flex: 1, paddingLeft: '10px' }}>
//     //                             <p><strong>No Receipt:</strong> {row.surat_jalan}</p>
//     //                             <p><strong>Truck:</strong> {row.nama_kendaraan}</p>
//     //                             <p><strong>Date CI Security:</strong> {row.date_arrived ? formatDate(row.date_arrived) : 'No Data'}</p>
//     //                             <p><strong>Time CI Security:</strong> {row.date_arrived && moment(row.date_arrived).format('HH:mm:ss')}</p>
//     //                             <p><strong>Date CO Inbound:</strong> {row.date_completed ? formatDate(row.date_completed) : 'No Data'}</p>
//     //                             <p><strong>Time Co Inbound:</strong> {row.date_completed && moment(row.date_completed).format('HH:mm:ss')}</p>
//     //                         </div>
//     //                     </div>
//     //                 </AccordionDetails>
//     //             </Accordion>
//     //         ),
//     //         // width: '550px' 
//     //     }
        
//     // ];
//     const columns = [
//         { name: 'Booking ID', selector: row => row.id_req, sortable: true, width: '150px' },
//         { name: 'Vendor', selector: row => row.nama_vendor, sortable: true, width: '350px' },
//         // { name: 'No Receipt', selector: row => row.surat_jalan, sortable: true, width: '200px' },
//         { name: 'Status', selector: row => row.status, sortable: true, width: '150px' },
//         { name: 'Date Boking', selector: row => row.schedule?.hari ? formatDate(row.schedule.hari) : 'No Data', sortable: true, width: '140px' },
//         { name: 'Jam Boking', selector: row => row.schedule?.mulai ? row.schedule.mulai : 'No Data', sortable: true, width: '140px' },
//         { name: 'Date CI Security', selector: row => row.date_arrived ? formatDate(row.date_arrived) : 'No Data', sortable: true, width: '200px' },
//         { name: 'Time CI Security', selector: row => row.date_arrived ? moment(row.date_arrived).format('HH:mm:ss') : 'No Data', sortable: true, width: '200px' },
//         { name: 'Date CI Inbound', selector: row => row.date_loading_goods ? formatDate(row.date_loading_goods) : 'No Data', sortable: true, width: '200px' },
//         { name: 'Time CI Inbound', selector: row => row.date_loading_goods ? moment(row.date_loading_goods).format('HH:mm:ss') : 'No Data', sortable: true, width: '200px' },
//         { name: 'Date CO Inbound', selector: row => row.date_arrived ? formatDate(row.date_arrived) : 'No Data', sortable: true, width: '200px' },
//         { name: 'Time CO Inbound', selector: row => row.date_arrived ? moment(row.date_arrived).format('HH:mm:ss') : 'No Data', sortable: true, width: '200px' },
//         { name: 'Date CO Security', selector: row => row.date_completed ? formatDate(row.date_completed) : 'No Data', sortable: true, width: '200px' },
//         { name: 'Time CO Security', selector: row => row.date_completed ? moment(row.date_completed).format('HH:mm:ss') : 'No Data', sortable: true, width: '200px' },
       
       
//     ];

//     const customStyles = {
//         headCells: {
//             style: {
//                 backgroundColor: '#0e0f65', // Custom header color
//                 color: 'white',
//                 fontSize: '16px',
//                 fontWeight: 'normal',
//             },
//         },
//         rows: {
//             style: {
//                 backgroundColor: '#f2f2f2', // Custom row background color
//                 '&:nth-of-type(odd)': {
//                     backgroundColor: '#e6e6e6', // Custom alternating row background color
//                 },
//                 fontSize: '14px', // Custom font size for rows
//                 color: '#333', // Custom font color for rows
//             },
//         },
//     };

//     const handleRowClick = async (id_req) => {
//         try {
//           const response = await Api.get(`api/transaksilogdoc/${id_req}`);
//           setTransaksiLogDoc(response.data.data);
//         //   console.log('Request Transaksi Data:', response.data.data);
//           setShowModal(true);
//         } catch (error) {
//           console.error('Error fetching request transaksi data:', error);
//         }
//       };
    
//       useEffect(() => {
//         // console.log('Current Request Transaksi State:', requestTransaksi);
//       }, [transaksiLogDoc]);

//     return(
//         <React.Fragment>
           
//                 <div className="containers mt-4 mb-5">
//                     <div className="row mt-4">
//                         <div className="col-md-12">
//                             <div className="card border-0 rounded shadow-sm border-top-success">
                                
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
          
//         </React.Fragment>
//     )
// }

// export default TransaksiRequest;


// import React, { useEffect, useState } from "react";
// import useFormatDate from "../../../utilites/useFormatDate";
// import DataTable from "react-data-table-component";
// import Api from "../../../../api";
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import FormatTime from "../../../utilites/FormatTime";
// import moment from 'moment-timezone';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Pagination from '@mui/material/Pagination';

// function TransaksiRequest() {
//     const [transaksirequest, setTransaksiRequest] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [search, setSearch] = useState('');
//     const { formatDate } = useFormatDate();
//     const { formatTime } = FormatTime();
//     const convertToGMT7 = (date) => {
//         return moment(date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
//     };

//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(5);

//     const fetchData = async () => {
//         try {
//             const response = await Api.get('api/transaksireq');
//             setTransaksiRequest(response.data.data);
//             setFilteredData(response.data.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     useEffect(() => {
//         const lowercasedSearch = search.toLowerCase();
//         const filtered = transaksirequest.filter(item => {
//             const namaVendor = item.nama_vendor ? item.nama_vendor.toLowerCase() : '';
//             const suratJalan = item.surat_jalan ? item.surat_jalan.toLowerCase() : '';
//             const status = item.status ? item.status.toLowerCase() : '';

//             return namaVendor.includes(lowercasedSearch) ||
//                    suratJalan.includes(lowercasedSearch) ||
//                    status.includes(lowercasedSearch);
//         });

//         setFilteredData(filtered);
//     }, [search, transaksirequest]);

//     const updatedFilteredData = filteredData.map(item => ({
//         ...item,
//         updated_at: item.updated_at ? convertToGMT7(item.updated_at) : ''
//     }));

//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(updatedFilteredData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "shipping vendor");
//         const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//         const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
//         saveAs(data, 'shipping vendor report.xlsx');
//     };

//     const columns = [
//         { name: 'Vendor', selector: row => row.nama_vendor, sortable: true, width:'300px'},
//         { name: 'No Receipt', selector: row => row.surat_jalan, sortable: true, width:'300px'},
//         { name: 'Booking Date', selector: row => row.created_at ? formatDate(row.created_at) : 'No Data', sortable: true, width:'200px' },
//         { name: 'Date Arrived', selector: row => row.date_arrived ? formatDate(row.date_arrived) : 'No Data', sortable: true, width:'150px'},
//         { name: 'Time Arrived', selector: row => row.date_arrived ? formatTime(row.date_arrived) : 'No Data', sortable: true, width:'150px' },
//         { name: 'Status', selector: row => row.status, sortable: true, width:'150px' },  
//     ];

//     const customStyles = {
//         headCells: {
//             style: {
//                 backgroundColor: '#0e0f65',
//                 color: 'white',
//                 fontSize: '16px',
//                 fontWeight: 'normal',
//             },
//         },
//         rows: {
//             style: {
//                 backgroundColor: '#f2f2f2',
//                 '&:nth-of-type(odd)': {
//                     backgroundColor: '#e6e6e6',
//                 },
//                 fontSize: '14px',
//                 color: '#333',
//             },
//         },
//     };

//     // Menghitung data yang akan ditampilkan berdasarkan pagination
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentData = updatedFilteredData.slice(indexOfFirstItem, indexOfLastItem);

//     // Mengubah halaman
//     const handlePageChange = (event, value) => {
//         setCurrentPage(value);
//     };

//     return (
//         <React.Fragment>
//             <div className="containers mt-4 mb-5">
//                 <div className="row mt-4">
//                     <div className="col-md-12">
//                         <div className="card border-0 rounded shadow-sm border-top-success">
//                             <div className="card-body">
//                                 <div className="card-excel">
//                                     <div className="icon" onClick={exportToExcel}>
//                                         <ContentCopyIcon />
//                                         <br />
//                                         To Excel
//                                     </div>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     placeholder="Search"
//                                     className="form-control mb-3"
//                                     value={search}
//                                     onChange={e => setSearch(e.target.value)}
//                                 />
//                                 {currentData.map((item, index) => (
//                                     <Accordion key={index}>
//                                         <AccordionSummary
//                                             expandIcon={<ExpandMoreIcon />}
//                                             aria-controls={`panel${index}-content`}
//                                             id={`panel${index}-header`}
//                                         >
//                                             {item.status} - {item.surat_jalan}
//                                         </AccordionSummary>
//                                         <AccordionDetails>
//                                             <DataTable
//                                                 columns={columns}
//                                                 data={[item]}
//                                                 customStyles={customStyles}
//                                                 noHeader
//                                                 noDataComponent={
//                                                     <div className="alert alert-danger mb-0">
//                                                         Data Belum Tersedia!
//                                                     </div>
//                                                 }
//                                             />
//                                         </AccordionDetails>
//                                     </Accordion>
//                                 ))}
//                                 <Pagination
//                                     count={Math.ceil(updatedFilteredData.length / itemsPerPage)}
//                                     page={currentPage}
//                                     onChange={handlePageChange}
//                                     color="primary"
//                                     className="mt-3"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// }

// export default TransaksiRequest;
