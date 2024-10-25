import React, { useEffect, useState } from "react";
import Api from "../../../../api";
import toast from "react-hot-toast";
import useFormatDate from "../../../utilites/useFormatDate";
import DataTable from "react-data-table-component";
import moment from "moment-timezone";
import SearchInput from "../../../utilites/SearchInput";
import ScannerInput from "../../../utilites/ScannerInput";
import { useQuery } from "@tanstack/react-query";


const QrScannerInbound = () => {
    const [barcodeData, setBarcodeData] = useState('');
    const [requestTransaksiQr, setRequestTransaksiQr] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();
    const time = 1 * 60 * 1000; // Interval untuk fetch data setiap 1 menit

    const { data: userPermissions = [], isLoading } = useQuery({
        queryKey: ['permissions'], 
        queryFn: async () => {
            const response = await Api.get('/api/userpermission');
            return response.data.permissions;
        },
        cacheTime: 10 * 60 * 1000, 
        staleTime: 30000, 
    });

    const hasPermission = (permission) => {
        return userPermissions.includes(permission);
    };

    const fetchData = async () => {
        try {
            const response = await Api.get('api/transaksireq_qr');
            const today = moment().format('YYYY-MM-DD');

            const filteredData = response.data.data.filter(item => {
                const scheduleDate = item.schedule?.hari ? moment(item.schedule.hari).format('YYYY-MM-DD') : null;
                return scheduleDate === today;
            });

            setRequestTransaksiQr(filteredData);
            setFilteredData(filteredData);
           // setRequestTransaksiQr (response.data.data)
        } catch (error) {
            console.log('Error fetching data:', error);
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

            return namaVendor.includes(lowercasedSearch) ||
                suratJalan.includes(lowercasedSearch) ||
                idReq.includes(lowercasedSearch) ||
                idStatus.includes(lowercasedSearch);
        });
        setFilteredData(filtered);
    }, [search, requestTransaksiQr]);

    const columns = [
      //  { name: 'Booking ID', selector: row => row.id_req, sortable: true, width: '140px' },
      // Tambahkan kolom "Booking ID" hanya jika user memiliki izin
      ...(hasPermission('view.idbooking') ? [{
        name: 'Booking ID',
        selector: row => row.id_req,
        sortable: true,
        width: '150px'
         }] : []),
         
        { name: 'Vendor', selector: row => row.nama_vendor, sortable: true, width: '350px' },
        { name: 'Position Status', selector: row => row.status, sortable: true, width: '200px' },
        { name: 'Date Booking', selector: row => row.schedule.hari ? formatDate(row.schedule.hari) : 'No Data', sortable: true, width: '150px' },
        { name: 'Time Booking', selector: row => row.schedule?.mulai ? row.schedule.mulai : 'No Data', sortable: true, width: '160px' },
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

    const updateStatus = async (id_req) => {
        if (!id_req) {
            toast.error('ID tidak boleh kosong', {
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

        try {
            const response = await Api.put(`/api/transaksireq_qr_inbound/${id_req}`);
            toast.success(response.data.message, {
                duration: 4000,
                position: 'top-right',
                style: {
                    borderRadius: '10px',
                    background: '#1f59a1',
                    color: '#fff',
                },
            });
            fetchData();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Terjadi kesalahan';
            toast.error(errorMessage, {
                duration: 4000,
                position: 'top-right',
                style: {
                    borderRadius: '10px',
                    background: '#1f59a1',
                    color: '#fff',
                },
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
            updateStatus(barcodeData);
            setBarcodeData('');
        }
    };

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
                                    customStyles={customStyles}
                                    pagination
                                    paginationPerPage={5}
                                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                                    fixedHeader
                                    highlightOnHover
                                    pointerOnHover
                                    persistTableHead
                                    striped
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



