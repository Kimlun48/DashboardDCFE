//import react  
import React,{useEffect, useState} from "react";
import AdminLayout from "../../../../../components/dcv1.2/layouts/adminlayout";
import useFormatDate from "../../../../../components/utilites/useFormatDate";
import DataTable from "react-data-table-component";
import Api from "../../../../../api";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function CashPickingReport() {

    //title page
    document.title = "admin-cashpicking";

    const [grpo, setGrpo] = useState ([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();

   // const time = 2 * 60 * 1000; 

    const fetchData = async () => {
        try {
            const response = await Api.get('api/v2cashpicking')
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
            item.ITEM_DESC.toLowerCase().includes(lowercasedSearch)||
            item.DOCNUM.toLowerCase().includes(lowercasedSearch)||
            item.NOWAVE.toLowerCase().includes(lowercasedSearch)
        );
        setFilteredData(filtered);
    }, [search, grpo]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "CashPicking");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Cash Picking report.xlsx');
    };

    const columns = [
       
        { name: 'No Document', selector: row => row.DOCNUM, sortable: true, width:'200px' },
        { name: 'No Receipt', selector: row => row.ERP_ORDER, sortable: true ,width:'200px'},  
        { name: 'Wave', selector: row => row.NOWAVE, sortable: true , width:'100px'},
        // { name: 'RECEIPT_DATE', selector: row => row.RECEIPT_DATE ? formatDate(row.RECEIPT_DATE) : 'No Data', sortable: true }, 
        { name: 'Item', selector: row => row.ITEM, sortable: true ,width:'150px'},  
        { name: 'Description', selector: row => row.ITEM_DESC, sortable: true ,width:'400px'},
        { name: 'QTY', selector: row => row.TOTAL_QTY, sortable: true ,width:'100px'}, 
        // { name: 'Available', selector: row => row.Available ? formatDate(row.DATE_TIME_STAMP_PLUS_7H) : 'No Data', sortable: true }, 
        { name: 'Remark', selector: row => row.REMARKS, sortable: true ,width:'800px'},
               
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#0e0f65', // Custom header color
                color: 'white',
                fontSize: '16px',
                fontWeight: 'normal',
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

    return(
        <React.Fragment>
            <AdminLayout>
                <div className="containers mt-4 mb-5">
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div>
                                       
                                        <span className="font-weight-bold">Cash Picking</span>
                                       
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

export default CashPickingReport;
