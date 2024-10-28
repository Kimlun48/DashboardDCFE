import React, { useState, useEffect } from "react";
import Api from "../../../../../../api";
import DataTable from "react-data-table-component";
import useFormatDate from "../../../../../../components/utilites/useFormatDate";


function KaliurangDetailBinTransitStore() {
    document.title = "Report-DetailKaliurangBinTransitStore";

    const [detailbinin, setDetailBinIn] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const { formatDate } = useFormatDate();
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await Api.get('api/grpokaliurangdetailtransitstore');
            const data = response.data; 
            setDetailBinIn(data);
            setFilteredData(data);
            console.log('Data received from API:', data);
        } catch (error) {
           
            console.error('Error fetching data:', error);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (Array.isArray(detailbinin)) { // Ensure detailbinin is an array
            const lowercasedSearch = search.toLowerCase();
            const filtered = detailbinin.filter(item =>
                item.BINCODE.toLowerCase().includes(lowercasedSearch) ||
                item.ITEMCODE.toLowerCase().includes(lowercasedSearch) ||
                item.ITEMNAME.toLowerCase().includes(lowercasedSearch) ||
                item.CREATEDBY.toLowerCase().includes(lowercasedSearch) ||
                item.QTY.toString().toLowerCase().includes(lowercasedSearch)
            );
            setFilteredData(filtered);
        }
    }, [search, detailbinin]);

    const columns = [
        { name: 'BINCODE', selector: row => row.BINCODE, sortable: true, width: '200px' },
        { name: 'ITEM CODE', selector: row => row.ITEMCODE, sortable: true },
        { name: 'ITEM NAME', selector: row => row.ITEMNAME, sortable: true, width: '600px' },
        { name: 'QTY', selector: row => row.QTY, sortable: true},
        { name: 'USER', selector: row => row.CREATEDBY, sortable: true },
        
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
                                    <span className="font-weight-bold">Store - Detail Bin Transit Store</span>
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
                                            paginationPerPage={10}
                                            paginationRowsPerPageOptions={[10, 15, 20]}
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
        </React.Fragment>
    );
}

export default KaliurangDetailBinTransitStore;
