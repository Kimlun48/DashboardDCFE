import React, {useState, useEffect} from "react";
import Api from "../../../../../../../api";
import DataTable from "react-data-table-component";
import useFormatDate from "../../../../../../../components/utilites/useFormatDate";


function KaliurangDetailCashCarryOrderReceived ()
{
    document.title = "Report-DetailKaliurangCashCarryOrderReceived"

    const [detailitrin, setDetailItrIn] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { formatDate } = useFormatDate();

    const fetchData = async () => {
        try {
            const response = await Api.get('api/kaliurangcashcarryorderreceived');
            const data = response.data.data; 
            setDetailItrIn(data);
            setFilteredData(data);
            console.log('Data received from API:', data);
        } catch (error) {
           
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (Array.isArray(detailitrin)) { // Ensure detailbinin is an array
            const lowercasedSearch = search.toLowerCase();
            const filtered = detailitrin.filter(item =>
                item.CABANG_PENERIMA.toLowerCase().includes(lowercasedSearch) ||
                // item.NODOKUMEN.toLowerCase().includes(lowercasedSearch) ||
                item.ITEMNAME.toLowerCase().includes(lowercasedSearch) 
              //  item.UOM.toLowerCase().includes(lowercasedSearch) 
                // item.QTY.toLowerCase().includes(lowercasedSearch)
            );
            setFilteredData(filtered);
        }
    }, [search, detailitrin]);

    const columns = [
     
        { name: 'NO DOCUMENT', selector: row => row.NODOKUMEN, sortable: true, width: '200px'  },
        { name: 'DOC DATE', selector: row => row.DOCDATE ? formatDate(row.DOCDATE) : 'No Data', sortable: true, width: '150px' },
        { name: 'DEADLINE', selector:row => row.DEADLINE_DATE ? formatDate(row.DEADLINE_DATE) : 'No Data', sortable: true ,width: '150px'},
        { name: 'RECEIVER BRANCH', selector: row => row.CABANG_PENERIMA, sortable: true, width: '250px'},
        { name: 'ITEM CODE', selector: row => row.ITEMCODE, sortable: true, width: '150px'},
        { name: 'ITEM NAME', selector: row => row.ITEMNAME, sortable: true, width: '450px'},
        { name: 'QTY', selector: row => row.QTY, sortable: true},
       
        { name: 'DELIVERED', selector: row => row.DELIVERED, sortable: true, width: '150px'},
        { name: 'OPEN', selector: row => row.OPEN, sortable: true},
        { name: 'RELEASED', selector: row => row.RELEASED, sortable: true, width: '150px'},
        { name: 'PICKED', selector: row => row.PICKED, sortable: true},
        { name: 'STATUS', selector: row => row.STATUS, sortable: true, width: '150px'},



         // { name: 'RECEIPT_DATE', selector: row => row.RECEIPT_DATE ? formatDate(row.RECEIPT_DATE) : 'No Data', sortable: true }, 
        
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
                                    <span className="font-weight-bold">Detail Cash Carry Order Received</span>
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
    );
}
export default KaliurangDetailCashCarryOrderReceived;