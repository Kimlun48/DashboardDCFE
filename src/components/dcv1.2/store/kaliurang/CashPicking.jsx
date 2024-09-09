import React, { useState, useEffect } from "react";
import Api from "../../../../api";
import DataTable from "react-data-table-component";
import useFormatDate from "../../../utilites/useFormatDate";


function KaliurangCashPickingReport() {
    document.title = "Report-cashpicking";

    const [cashpicking, setCashPicking] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const { formatDate } = useFormatDate();
    const time = 2 * 60 * 1000; // 2 minutes

    const fetchData = async () => {
        try {
            const response = await Api.get('api/kaliurangcashpicking');
            const data = response.data; 
            setCashPicking(data);
            setFilteredData(data);
            console.log('Data received from API:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
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
        if (Array.isArray(cashpicking)) { // Ensure detailbinin is an array
            const lowercasedSearch = search.toLowerCase();
            const filtered = cashpicking.filter(item =>
                item.NOSTRUK.toLowerCase().includes(lowercasedSearch) ||
                item.CardName.toLowerCase().includes(lowercasedSearch) ||
                item.DocNum.toLowerCase().includes(lowercasedSearch) ||
                item.Dscription.toLowerCase().includes(lowercasedSearch)
                // item.QTY.toString().toLowerCase().includes(lowercasedSearch)
            );
            setFilteredData(filtered);
        }
    }, [search, cashpicking]);

    const columns = [
        { name: 'NO', selector: row => row.NOSTRUK, sortable: true, width:'200px' },
        { name: 'Doc Num', selector: row => row.DocNum, sortable: true,width: '150px' },
        { name: 'Date', selector: row => row.TGLTRANSAKSI ? formatDate(row.TGLTRANSAKSI) : 'No Data',sortable: true, width: '140px' },
        { name: 'Customer', selector: row => row.CardName, sortable: true, width: '150px' },
        { name: 'Item code', selector: row => row.ItemCode, sortable: true, width: '150px' },
        { name: 'Description', selector: row => row.Dscription, sortable: true, width: '500px'},
        { name: 'A.Release', selector: row => row.AVAIL_RELEASE, sortable: true, width: '150px'},
        { name: 'Stock', selector: row => row.STOCK, sortable: true},
        
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#0e0f65',
                color: 'white',
                fontSize: '14px',
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

    return (
        <React.Fragment>
            <div className="containers mt-4 mb-5">
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div>
                                    <span className="font-weight-bold">CASH PICKING</span>
                                </div>
                            </div>
                            <div className="card-body">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="form-control mb-3"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                                {error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )}
                                <DataTable
                                    columns={columns}
                                    data={filteredData}
                                    pagination
                                    paginationPerPage={10}
                                    paginationRowsPerPageOptions={[10, 15, 20, 25]}
                                    highlightOnHover
                                    customStyles={customStyles}
                                    noDataComponent={
                                        <div className="alert alert-danger mb-0">
                                            No orders cash picking
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
}

export default KaliurangCashPickingReport;
