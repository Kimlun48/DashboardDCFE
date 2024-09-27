import React,{useEffect, useState} from "react";
import AdminLayout from "../../../../../components/dcv1.2/layouts/adminlayout";
import useFormatDate from "../../../../../components/utilites/useFormatDate";
import DataTable from "react-data-table-component";
import Api from "../../../../../api";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function NotIntegratedReport() {

    //title page
    document.title = "admin-report not integrated";

    const [grpo, setGrpo] = useState ([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const { formatDate } = useFormatDate();

   // const time = 2 * 60 * 1000; 

    const fetchData = async () => {
        try {
            setLoading (true);
            const response = await Api.get('api/v2outboundnotintgrated')
            setGrpo(response.data.data)
            setFilteredData(response.data.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading (false);
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
            item.JRNLMEMO.toLowerCase().includes(lowercasedSearch) ||
         //   item.NOWAVE.toLowerCase().includes(lowercasedSearch) ||
            item.CARDNAME.toLowerCase().includes(lowercasedSearch) ||
            item.STATUS.toLowerCase().includes(lowercasedSearch)  
        );
        setFilteredData(filtered);
    }, [search, grpo]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "NotIntegrated");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'OutBound Not Intgrated Report.xlsx');
    };

    

    const columns = [
        { name: 'DocNum', selector: row => row.DOCNUM, sortable: true, width:'150px' },  
        { name: 'DocTime', selector: row => row.DOCTIME, sortable: true , width:'150px'},
        { name: 'ID Shipment', selector: row => row.SHIPMENT_ID ?row.SHIPMENT_ID: 'No Data', sortable: true , width:'200px'},
        { name: 'Jurnal Memo', selector: row => row.JRNLMEMO, sortable: true , width:'250px'},
        { name: 'ERP Order', selector: row => row.ERP_ORDER ?row.ERP_ORDER: 'No Data', sortable: true , width:'200px'},
        { name: 'Card Code', selector: row => row.CARDCODE, sortable: true , width:'250px'},
        { name: 'Card Name', selector: row => row.CARDNAME, sortable: true , width:'250px'},
       // { name: 'Time Integrated', selector: row => row.INTEGRATED_TIME, sortable: true , width:'150px'},
        { name: 'Status', selector: row => row.STATUS, sortable: true , width:'200px'},
        // { name: 'State', selector: row => row.KECAMATAN, sortable: true , width:'200px'},
        // { name: 'Address 1', selector: row => row.ALAMAT, sortable: true , width:'400px'},
        // { name: 'Address 2', selector: row => row.ALAMAT2, sortable: true , width:'200px'},
        // { name: 'Phone', selector: row => row.PHONE, sortable: true , width:'150px'},
        // { name: 'Status', selector: row => row.STATUS1, sortable: true , width:'200px'},
       
        // { name: 'Document Date', selector: row => row.DOCDATE ? formatDate(row.DOCDATE) : 'No Data', sortable: true , width:'200px'}, 
        // { name: 'Schedule Date', selector: row => row.DOCDUEDATE ? formatDate(row.DOCDUEDATE) : 'No Data', sortable: true }, 
        // { name: 'TENGGATWAKTU', selector: row => row.TENGGATWAKTU ? formatDate(row.TENGGATWAKTU) : 'No Data', sortable: true }, 
       
        // { name: 'Late', selector: row => row.DEADLINE, sortable: true , width:'100px'},
        // { name: 'Remark', selector: row => row.REMARKS, sortable: true , width:'600px'},
        


          
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
                                       
                                        <span className="font-weight-bold">Out Bound Not Integrated</span>
                                       
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
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </React.Fragment>
    )
}

export default NotIntegratedReport;