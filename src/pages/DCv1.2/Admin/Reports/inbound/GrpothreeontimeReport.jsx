
import React, {useState, useEffect} from "react";
import Api from "../../../../../api";
import DataTable from "react-data-table-component";
import useFormatDate from "../../../../../components/utilites/useFormatDate";

function GrpothreeontimeReport() {
    document.title = "Report-grpothreeontime"

    const [grpothreeontime, setGrpothreeontime] =  useState ([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();

    const fetchData = async () => {
        try {
            const response = await Api.get('api/v2grpothreeontime')
            setGrpothreeontime(response.data.data)
            setFilteredData(response.data.data)
        } catch (error){
            console.error('error fatching data:', error);
        }
    }

    useEffect (() => {
        fetchData();
    },[]);

    useEffect (() => {
        const lowercasedSearch = search.toLocaleLowerCase();
        const filtered = grpothreeontime.filter(item => 
            item.ITEM_DESC.toLocaleLowerCase().includes(lowercasedSearch)
        );
        setFilteredData(filtered);
    }, [search, grpothreeontime]);

    const columns = [
        {name : 'TRAILING STS', selector: row => row.TRAILING_STS, sortable:true, width:'150px'},
        {name : 'RECEIPT ID', selector: row => row.RECEIPT_ID, sortable:true, width:'150px'},
        {name : 'RECEIPT ID TYPE', selector: row => row.RECEIPT_ID_TYPE, sortable:true, width:'200px'},
        //{name : 'RECEIPT_DATE', selector: row => row.RECEIPT_DATE, sortable:true, width:'100px'},
        { name: 'RECEIPT DATE', selector: row => row.RECEIPT_DATE ? formatDate(row.RECEIPT_DATE) : 'No Data', sortable: true },
        {name : 'SOURCE NAME', selector: row => row.SOURCE_NAME, sortable:true, width:'300px'},
        {name : 'ITEM', selector: row => row.ITEM, sortable:true, width:'150px'},
        {name : 'ITEM DESC', selector: row => row.ITEM_DESC, sortable:true, width:'400px'},
        {name : 'OPEN QTY', selector: row => row.OPEN_QTY, sortable:true, width:'150px'},
        //{name : 'DATE_TIME_STAMP', selector: row => row.DATE_TIME_STAMP, sortable:true, width:'100px'},
        { name: 'DATE_TIME_STAMP', selector: row => row.DATE_TIME_STAMP ? formatDate(row.DATE_TIME_STAMP) : 'No Data', sortable: true },
        {name : 'DEADLINE', selector: row => row.DEADLINE, sortable:true, width:'150px'},
        {name : 'CLOSE_DATE', selector: row => row.CLOSE_DATE, sortable:true, width:'150px'}, 
        {name : 'DAYS_TO_CLOSE', selector: row => row.DAYS_TO_CLOSE, sortable:true, width:'150px'},              
    ];

    const customStyles = {
        headCells:{
            style : {
                backgroundColor : '#0e0f65',
                color : 'white',
                fontSize : '14px',
                fontWeight : 'normal',
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

    return (
        <React.Fragment>
             <div className="containers mt-4 mb-5">
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div>
                                       
                                        <span className="font-weight-bold">Goods Receipt 3 Ontime</span>
                                       
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
    )

}
export default GrpothreeontimeReport;