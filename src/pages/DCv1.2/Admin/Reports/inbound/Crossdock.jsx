//import react  
import React,{useEffect, useState} from "react";
import AdminLayout from "../../../../../components/dcv1.2/layouts/adminlayout";
import useFormatDate from "../../../../../components/utilites/useFormatDate";
import DataTable from "react-data-table-component";
import Api from "../../../../../api";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function CrossdockReport() {

    //title page
    document.title = "admin-crossdock";

    const [grpo, setGrpo] = useState ([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();

   // const time = 2 * 60 * 1000; 

    const fetchData = async () => {
        try {
            const response = await Api.get('api/v2crossdock')
            setGrpo(response.data.data)
            setFilteredData(response.data.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect (() => {
        fetchData();
        // const interval = setInterval(() => {
        //     fetchData();
        //     console.log("ok");
        //   }, time);
        //   return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const lowercasedSearch = search.toLowerCase();
        const filtered = grpo.filter(item =>
            item.ITEM_DESC.toLowerCase().includes(lowercasedSearch) 
        );
        setFilteredData(filtered);
    }, [search, grpo]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Crossdock");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Crossdock report.xlsx');
    };

    const columns = [
        
        { name: 'Item', selector: row => row.ITEM, sortable: true ,width:'150px'},
        { name: 'Description', selector: row => row.ITEM_DESC, sortable: true ,width:'500px'}, 
        { name: 'QTY', selector: row => row.QTY, sortable: true ,width:'100px'}, 
        { name: 'Date Time', selector: row => row.LATES_DATE_TIME_STAMP ? formatDate(row.LATES_DATE_TIME_STAMP) : 'No Data', sortable: true }, 
        { name: 'Late', selector: row => row.LATE, sortable: true ,width:'100px'},        
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#0e0f65', // Custom header color
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
            },
        },
    };

    return(
        <React.Fragment>
            <AdminLayout>
                <div className="containers mt-4 mb-5">
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div>
                                       
                                        <span className="font-weight-bold">Crossdock</span>
                                       
                                    </div>
                                </div>
                                <div className="card-body">
                                 <div className="card-excel">
                                 <div className="icon" onClick={exportToExcel}>
                                 <ContentCopyIcon />
                                 <br />
                                 To Excel
                                 </div>
                                </div>
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
            </AdminLayout>
        </React.Fragment>
    )
}

export default CrossdockReport;
