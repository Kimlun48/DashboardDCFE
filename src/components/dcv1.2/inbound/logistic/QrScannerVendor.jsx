import React, { useEffect, useState } from 'react';
import Api from '../../../../api';
import toast from 'react-hot-toast';
import useFormatDate from '../../../utilites/useFormatDate';
import FormatTime from '../../../utilites/FormatTime';
import DataTable from "react-data-table-component";
import moment from 'moment-timezone';
import SearchInput from '../../../utilites/SearchInput';
import ScannerInput from '../../../utilites/ScannerInput';

const QrScannerVendor = () => {
    const [barcodeData, setBarcodeData] = useState('');
    const [requestTransaksiQr, setRequestTransaksiQr] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();
    const { formatTime } = FormatTime();
    const [updatedId, setUpdatedId] = useState(null);
    const time = 1 * 60 * 1000; // 1 minute

    const fetchData = async () => {
        try {
            const response = await Api.get('api/transaksireq_qr');
            setRequestTransaksiQr(response.data.data);
            setFilteredData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

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
            const idJadwal = item.id_jadwal ? item.id_jadwal.toLowerCase() : '';
            const idStatus = item.status ? item.status.toLowerCase() : '';

            return (updatedId === null || item.id_jadwal === updatedId) &&
                (namaVendor.includes(lowercasedSearch) ||
                    suratJalan.includes(lowercasedSearch) ||
                    idJadwal.includes(lowercasedSearch) ||
                    idStatus.includes(lowercasedSearch)
                ) ;
                   
        });
        setFilteredData(filtered);
    }, [search, requestTransaksiQr, updatedId]);

    const columns = [
        { name: 'Booking ID', selector: row => row.id_jadwal, sortable: true, width: '150px' },
        { name: 'Vendor', selector: row => row.nama_vendor, sortable: true, width: '350px' },
        { name: 'No Receipt', selector: row => row.surat_jalan, sortable: true, width: '200px' },
        { name: 'Status', selector: row => row.status, sortable: true, width: '150px' },
        { name: 'Date Boking', selector: row => row.schedule.hari ? formatDate(row.schedule.hari) : 'No Data', sortable: true, width: '140px' },
        { name: 'Date Arrived', selector: row => row.date_arrived ? formatDate(row.date_arrived) : 'No Data', sortable: true, width: '140px' },
        { name: 'Time Arrived', selector: row => row.date_arrived && moment(row.date_arrived).format('HH:mm:ss'), sortable: true, width: '150px' },
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

    const updateStatusToArrived = async (id_jadwal) => {
        try {
            const response = await Api.put(`/api/transaksireq_qr/${id_jadwal}`, {
                status: 'ARRIVED',
                date_arrived: getCurrentDateTime(),
            });

            if (response.data.success) {
                setUpdatedId(id_jadwal);
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
                updateStatusToArrived(barcodeData);
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
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
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

export default QrScannerVendor;