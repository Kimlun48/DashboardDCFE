import React, {useState, useEffect} from "react";
import Api from "../../../../../../../api";
import DataTable from "react-data-table-component";
import useFormatDate from "../../../../../../../components/utilites/useFormatDate";

function KaliurangDetailItrInTransitWarehouse() {
    document.title = "Report-DetailKaliurangDetailItrInTransitWarehouse";

    const [itrintransit, setItrInTransit] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const { formatDate } = useFormatDate();

    const fetchData = async () => {
        try {
            const response = await Api.get('api/kaliurangitrintransitwarehouse');
            const data = response.data;
            setItrInTransit(data);
            setFilteredData(data);
           // console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (Array.isArray(itrintransit)) { // Ensure detailbinin is an array
            const lowercasedSearch = search.toLowerCase();
            const filtered = itrintransit.filter(item =>
               
                item.ITEMCODE.toLowerCase().includes(lowercasedSearch) ||
                item.ITEMNAME.toLowerCase().includes(lowercasedSearch) ||
                item.ONHAND.toLowerCase().includes(lowercasedSearch) 
               
            );
            setFilteredData(filtered);
        }
    }, [search, itrintransit]);

    const columns = [
       
        { name: 'ITEM CODE', selector: row => row.ITEMCODE, sortable: true },
        { name: 'ITEM NAME', selector: row => row.ITEMNAME, sortable: true, width: '600px' },
        { name: 'ONHAND', selector: row => row.ONHAND, sortable: true},
      
        
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

    return(
        <React.Fragment>
            <div className="containers mt-4 mb-5">
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div>
                                    <span className="font-weight-bold">Warehouse - Detail ITR In Transit</span>
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
    )
}
export default KaliurangDetailItrInTransitWarehouse;