// import React ,{useState} from "react";
// import { QrReader } from "react-qr-reader";
// import Api from "../../../../api";


// const QrScannerComponent = () => {
//   const [scanResult, setScanResult] = useState('');

//     const handleScan = (data) => {
//         if (data) {
//             setScanResult(data);
//             updateStatusToArrived(data); 
//         }
//     };

//     const handleError = (err) => {
//         console.error(err);
//     };

//     const updateStatusToArrived = async (id_jadwal) => {
//         try {
//             const response = await Api.put(`/api/transaksireq_qr/${id_jadwal}`, {
//                 status: 'ARRIVED'
//             });

//             if (response.data.success) {
//                 alert('Status updated to ARRIVED');
//             } else {
//                 alert('Failed to update status');
//             }
//         } catch (error) {
//             console.error('Error updating status:', error);
//         }
//     };

//     return (
//         <div>
//             <QrReader
//                 delay={300}
//                 onError={handleError}
//                 onScan={handleScan}
//                 style={{ width: '100%' }}
//             />
//             <p>Scanned Code: {scanResult}</p>
//         </div>
//     );
// };

// export default QrScannerComponent;
import React, { useEffect, useState } from 'react';
import Api from '../../../../api';
import toast from 'react-hot-toast';
import useFormatDate from '../../../utilites/useFormatDate';
import FormatTime from '../../../utilites/FormatTime';
import DataTable from "react-data-table-component";
import moment from 'moment-timezone';


const BarcodeScanner = () => {
    const [barcodeData, setBarcodeData] = useState('');
    const [requestTransaksiQr, setRequestTransaksiQr] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();
    const { formatTime } = FormatTime();
    const [updatedId, setUpdatedId] = useState(null);
    const time = 2 * 60 * 1000; // 2 minutes


    const fetchData = async () => {
      try {
        const response = await Api.get('api/transaksireq_qr');
        console.log('API response reqQr:', response.data)
        setRequestTransaksiQr(response.data.data);
        setFilteredData(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    useEffect(() => {
      fetchData();
    }, [])

    useEffect(() => {
      const lowercasedSearch = search.toLowerCase();
      const filtered = requestTransaksiQr.filter(item => {
          const namaVendor = item.nama_vendor ? item.nama_vendor.toLowerCase() : '';
          const suratJalan = item.surat_jalan ? item.surat_jalan.toLowerCase() : '';
          const idJadwal = item.id_jadwal ? item.id_jadwal.toLowerCase() : '';
  
          return (updatedId === null || item.id_jadwal === updatedId) &&
                 (namaVendor.includes(lowercasedSearch) ||
                  suratJalan.includes(lowercasedSearch) ||
                  idJadwal.includes(lowercasedSearch));
      });
  
      setFilteredData(filtered);
  }, [search, requestTransaksiQr, updatedId]);
  


  const columns = [
    { name: 'Id Boking', selector: row => row.id_jadwal, sortable: true, width: '150px' },
    { name: 'Vendor', selector: row => row.nama_vendor, sortable: true, width: '350px' },
    { name: 'No Receipt', selector: row => row.surat_jalan, sortable: true, width: '200px' },
    { name: 'Status', selector: row => row.status, sortable: true, width: '150px' },
    { name: 'Date Boking', selector: row => row.schedule.hari ? formatDate(row.schedule.hari) : 'No Data',sortable: true, width: '140px' },
    { name: 'Date Arrived', selector: row => row.date_arrived ? formatDate(row.date_arrived) : 'No Data',sortable: true, width: '140px' },
    { name: 'Time Arrived', selector: row => row.date_arrived && moment(row.date_arrived).format('HH:mm:ss'), sortable: true, width: '150px' },
];

const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#0e0f65', // Custom header color
            color: 'white',
            fontSize: '16px',
            fontWeight: 'normal',
        },
    },
    rows: {
        style: {
            backgroundColor: '#f2f2f2', // Custom row background color
            '&:nth-of-type(odd)': {
                backgroundColor: '#e6e6e6', // Custom alternating row background color
            },
            fontSize: '14px', // Custom font size for rows
            color: '#333', // Custom font color for rows
        },
    },
};

    const handleInputChange = (event) => {
        const value = event.target.value;
        // Validasi hanya integer yang bisa diinput
        if (/^\d*$/.test(value)) {
            setBarcodeData(value);
        }
    };

    // const handleKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         if (barcodeData) {
    //             updateStatusToArrived(barcodeData);
    //             setBarcodeData(''); // Clear input after processing
    //         } else {
    //             toast.error('ID cannot be empty', {
    //                 duration: 4000,
    //                 position: 'top-right',
    //                 style: {
    //                     borderRadius: '10px',
    //                     background: '#1f59a1',
    //                     color: '#fff',
    //                 },
    //             });
    //         }
    //     }
    // };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Mencegah pindah halaman atau pencarian di browser
            if (barcodeData) {
                updateStatusToArrived(barcodeData);
                setBarcodeData(''); // Clear input after processing
            } else {
                toast.error('ID cannot be empty', {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        borderRadius: '10px',
                        background: '#1f59a1',
                        color: '#fff',
                    },
                });
            }
        }
    };
    

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    const updateStatusToArrived = async (id_jadwal) => {
        try {
            const response = await Api.put(`/api/transaksireq_qr/${id_jadwal}`, {
                status: 'ARRIVED',
                date_arrived: getCurrentDateTime(),
                
            });
           
            if (response.data.success) {
              setUpdatedId(id_jadwal); 
              fetchData()
                toast.success(response.data.message, {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        borderRadius: '10px',
                        background: '#1f59a1',
                        color: '#fff',
                    },
                });
            } else {
                toast.error('Failed to update status', {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        borderRadius: '10px',
                        background: '#1f59a1',
                        color: '#fff',
                    },
                });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            toast.error(errorMessage, {
                duration: 4000,
                position: 'top-right',
                style: {
                    borderRadius: '10px',
                    background: '#1f59a1',
                    color: '#fff',
                },
                icon: '❌',
            });
        }
    };

    useEffect(() => {
      if (updatedId) {
          const timer = setTimeout(() => {
              setUpdatedId(null);
          }, 5000); // Reset filter after 3 seconds
  
          return () => clearTimeout(timer);
      }
  }, [updatedId]);
  

    return (
      <React.Fragment>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h4>Scan Barcode or QR Code</h4>
            <input
                type="text"
                value={barcodeData}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                style={{ width: '300px', padding: '10px', fontSize: '16px' }}
                placeholder="ID Boking"
                autoFocus
            />
        </div>

        
        <div className="containers mt-4 mb-5">
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    );
};

export default BarcodeScanner;

