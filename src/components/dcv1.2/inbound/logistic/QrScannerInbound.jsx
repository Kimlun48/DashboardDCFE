import React, { useEffect, useState } from "react";
import Api from "../../../../api";
import toast from "react-hot-toast";
import useFormatDate from "../../../utilites/useFormatDate";
import FormatTime from "../../../utilites/FormatTime";
import DataTable from "react-data-table-component";
import moment from "moment-timezone";
import SearchInput from "../../../utilites/SearchInput";
import ScannerInput from "../../../utilites/ScannerInput";

const QrScannerInbound = () => {
    const [barcodeData, setBarcodeData] = useState('');
    const [requestTransaksiQr, setRequestTransaksiQr] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();
    const { formatTime } = FormatTime();
    const [updatedId, setUpdatedId] = useState(null);
    const time = 1 * 60 * 1000;

    const fetchData = async () => {
        try {
            // const response = await Api.get('api/transaksireq_qr');
            // setRequestTransaksiQr(response.data.data);
            // setFilteredData(response.data.data);
            // console.log(response.data);
             const response = await Api.get('api/transaksireq_qr');
        const today = moment().format('YYYY-MM-DD');
        
        const filteredData = response.data.data.filter(item => {
            const scheduleDate = item.schedule?.hari ? moment(item.schedule.hari).format('YYYY-MM-DD') : null;
            return scheduleDate === today;
        });

        setRequestTransaksiQr(filteredData);
       setFilteredData(filteredData);
        } catch (error) {
            console.log('error fetching data :', error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, time);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const lowercasedSearch = search.toLowerCase();
        const filtered = requestTransaksiQr.filter(item => {
            const namaVendor = item.nama_vendor ? item.nama_vendor.toLowerCase() : '';
            const suratJalan = item.surat_jalan ? item.surat_jalan.toLowerCase() : '';
            const idReq = item.id_req ? String(item.id_req) : '';
            const idStatus = item.status ? item.status.toLowerCase() : '';

            return (updatedId === null || item.id_req === updatedId) &&
                (namaVendor.includes(lowercasedSearch) ||
                    suratJalan.includes(lowercasedSearch) ||
                    idReq.includes(lowercasedSearch) ||
                    idStatus.includes(lowercasedSearch));
        });
        setFilteredData(filtered);
    }, [search, requestTransaksiQr, updatedId]);

    const columns = [
        { name: 'Booking ID', selector: row => row.id_req, sortable: true, width: '140px' },
        { name: 'Vendor', selector: row => row.nama_vendor, sortable: true, width: '350px' },
        // { name: 'No Receipt', selector: row => row.surat_jalan, sortable: true, width: '200px' },
        { name: 'Position Status', selector: row => row.status, sortable: true, width: '200px' },
        { name: 'Date Boking', selector: row => row.schedule.hari ? formatDate(row.schedule.hari) : 'No Data', sortable: true, width: '140px' },
        { name: 'Jam Boking', selector: row => row.schedule?.mulai ? row.schedule.mulai : 'No Data', sortable: true, width: '140px' },
        { name: 'Date CI Inbound', selector: row => row.date_loading_goods ? formatDate(row.date_loading_goods) : 'No Data', sortable: true, width: '200px' },
        { name: 'Time CI Inbound', selector: row => row.date_loading_goods ? moment(row.date_loading_goods).format('HH:mm:ss') : 'No Data', sortable: true, width: '200px' },
        { name: 'Date CO Inbound', selector: row => row.date_completed ? formatDate(row.date_completed) : 'No Data', sortable: true, width: '200px' },
        { name: 'Time CO Inbound', selector: row => row.date_completed ? moment(row.date_completed).format('HH:mm:ss') : 'No Data', sortable: true, width: '200px' },
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

    const getCurrentDateTime = () => {
        const now = new Date();
        return moment(now).format('YYYY-MM-DD HH:mm:ss.SSS');
    };

    

    const updateStatus = async (id_req) => {
      //  const data = requestTransaksiQr.find(item => item.id_req === id_req);
        const data = requestTransaksiQr.find(item => Number(item.id_req) === Number(id_req));

        
        if (!data) {
          
            toast.error('Booking ID not found', {
                duration: 4000,
                position: 'top-right',
                style: {
                    borderRadius: '10px',
                    background: '#1f59a1',
                    color: '#fff',
                },
            });
            return;
        }
    
        let newStatus = data.status;
        let updateFields = {};
        //const currentDateTime = new Date().toISOString(); // Mendapatkan waktu saat ini dalam format ISO 8601
        const currentDateTime = getCurrentDateTime();
    
        if (data.date_completed) {
            toast.error('Process is all done cannot be updated', {
                duration: 4000,
                position: 'top-right',
                style: {
                    borderRadius: '10px',
                    background: '#1f59a1',
                    color: '#fff',
                },
            });
            return;
        }
    
        if (data.date_loading_goods) {
            if (data.date_arrived) {
                newStatus = 'CO INBOUND';
            } else {
                toast.error('Process not yet loading', {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        borderRadius: '10px',
                        background: '#1f59a1',
                        color: '#fff',
                    },
                });
                return;
            }
        } else if (data.date_arrived) {
            newStatus = 'CI INBOUND';
            updateFields.date_loading_goods = currentDateTime;
        } else {
            newStatus = 'CI SECURITY';
            updateFields.date_arrived = currentDateTime;
        }
    
        try {
            const response = await Api.put(`/api/transaksireq_qr_all/${id_req}`, {
                status: newStatus,
                ...updateFields,
                currentDateTime, // Kirim currentDateTime dari frontend
            });
    
            if (response.data.success) {
              //  setUpdatedId(id_req);
                fetchData();
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
    
    

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setBarcodeData(value);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (barcodeData) {
                updateStatus(barcodeData);
                setBarcodeData('');
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

    useEffect(() => {
        if (updatedId) {
            const timer = setTimeout(() => {
                setUpdatedId(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [updatedId]);

    return (
        <React.Fragment>
            <div style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>
                <h4>Scan Barcode or QR Code</h4>
                <ScannerInput
                    barcodeData={barcodeData}
                    handleInputChange={handleInputChange}
                    handleKeyDown={handleKeyDown}
                />
            </div>

            <div className="containers mt-4 mb-5">
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-body">
                                <SearchInput
                                    search={search}
                                    setSearch={setSearch}
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

export default QrScannerInbound;



