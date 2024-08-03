
import React, {useState, useEffect} from "react";
import Api from "../../../../../api";
import DataTable from "react-data-table-component";
import useFormatDate from "../../../../../components/utilites/useFormatDate";

function GrpothreelateReport() {
    document.title = "Report-grpothreelate"

    const [grpothreelate, setGrpothreelate] =  useState ([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();

    const fetchData = async () => {
        try {
            const response = await Api.get('api/v2grpothreelate')
            setGrpothreelate(response.data.data)
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
        const filtered = grpothreelate.filter(item => 
            item.ITEM_DESC.toLocaleLowerCase().includes(lowercasedSearch)
        );
        setFilteredData(filtered);
    }, [search, grpothreelate]);

    const columns = [
        {name : 'TRAILING_STS', selector: row => row.TRAILING_STS, sortable:true, width:'100px'},
        {name : 'RECEIPT_ID', selector: row => row.RECEIPT_ID, sortable:true, width:'100px'},
        {name : 'RECEIPT_ID_TYPE', selector: row => row.RECEIPT_ID_TYPE, sortable:true, width:'100px'},
        //{name : 'RECEIPT_DATE', selector: row => row.RECEIPT_DATE, sortable:true, width:'100px'},
        { name: 'RECEIPT_DATE', selector: row => row.RECEIPT_DATE ? formatDate(row.RECEIPT_DATE) : 'No Data', sortable: true },
        {name : 'SOURCE_NAME', selector: row => row.SOURCE_NAME, sortable:true, width:'100px'},
        {name : 'ITEM', selector: row => row.ITEM, sortable:true, width:'100px'},
        {name : 'ITEM_DESC', selector: row => row.ITEM_DESC, sortable:true, width:'100px'},
        {name : 'OPEN_QTY', selector: row => row.OPEN_QTY, sortable:true, width:'100px'},
        //{name : 'DATE_TIME_STAMP', selector: row => row.DATE_TIME_STAMP, sortable:true, width:'100px'},
        { name: 'DATE_TIME_STAMP', selector: row => row.DATE_TIME_STAMP ? formatDate(row.DATE_TIME_STAMP) : 'No Data', sortable: true },
        {name : 'DEADLINE', selector: row => row.DEADLINE, sortable:true, width:'100px'},
        {name : 'CLOSE_DATE', selector: row => row.CLOSE_DATE, sortable:true, width:'100px'}, 
        {name : 'DAYS_TO_CLOSE', selector: row => row.DAYS_TO_CLOSE, sortable:true, width:'100px'},              
    ];

    const customStyles = {
        headCells:{
            style : {
                backgroundColor : '#0e0f65',
                color : 'white',
                // fontSize : '16px',
                // fontWeight : 'bold',
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
                                       
                                        <span className="font-weight-bold">Goods Receipt 3 Late</span>
                                       
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
export default GrpothreelateReport;