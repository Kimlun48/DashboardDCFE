import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Api from '../../../../api';
import {Card} from "react-bootstrap";
import { ResponsiveContainer } from 'recharts';

function TableGrpo() {
    const [grpotoplate, setGrpotoplate] = useState([]);

    const fetchData = async () => {
        try {
            const response = await Api.get('api/v2grpotoplate');
            console.log('API Response:', response.data);
            setGrpotoplate(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const time = 2 * 60 * 1000;

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
            console.log("Data fetched");
        }, time);

        return () => clearInterval(interval);
    }, []);

    const columns = [
        {
            name: 'Receipt ID',
            selector: row => (
                <div style={{ color: '#FFFFFF', fontWeight: 'normal', fontSize: '12px' }}>
                    {row.RECEIPT_ID}
                </div>
            ),
            center: true,            
        },
        {
            name: 'Late',
            selector: row => (
                <div style={{ color: '#FFFFFF', fontWeight: 'normal', fontSize: '12px' }}>
                    {row.DEADLINE}
                </div>
            ),
            center: true,            
        },
        
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#000638',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 'bold',
               
            },
        },
        rows: {
            style: {
               
                backgroundColor: '#000638',
                color: 'white',
                fontSize: '20px',
                
            },
        },
      
    };
  

    return (
        <React.Fragment>
          
        
            
            {/* <div className="container mt-4 mb-5">
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div>
                                       
                                        <span className="font-weight-bold">Goods Receipt PO</span>
                                       
                                    </div>
                                </div>
                                <div className="card-body">
                                 
                                  
                                    <DataTable
                                        columns={columns}
                                        // pagination
                                        // paginationPerPage={5}
                                        // paginationRowsPerPageOptions={[5, 10, 15, 20]}
                                        highlightOnHover
                                        data={grpotoplate}
                                      
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
                </div> */}


            <div className="row mt-4">
                    <div className="text">
                        <h4 className="chart-title-po">Top 5 Late Today Document</h4>
                        
                    </div>
                </div>
                <div className="col-12 mb-2">
                  
                    <div className="chart-container">
                    <div className="card-body">
                    <div className="data-table-container">
                    
                                 <DataTable
                                     columns={columns}
                                    // highlightOnHover
                                     data={grpotoplate}
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
                {/* </div> */}
                
                
        </React.Fragment>
    );
}

export default TableGrpo;
