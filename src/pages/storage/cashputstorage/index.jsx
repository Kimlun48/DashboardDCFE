

import React, { useState, useEffect, useRef } from 'react';
import api from '../../../api';
import useFormatDate from '../../../components/utilites/useFormatDate';
import DataTable from 'react-data-table-component';

export default function CpsIndex() {
   

    const { formatDate } = useFormatDate();

    const [cashputstorage, setCashputstorage] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');

    const time = 2 * 60 * 1000;

    const fetchData = async () => {
        try {
            const response = await api.get('api/cpsv1');
            setCashputstorage(response.data.data);
            setFilteredData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
            console.log("ok");
        }, time);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const lowercasedSearch = search.toLowerCase();
        const filtered = cashputstorage.filter(item =>
            item.NO_DOCUMENT.toLowerCase().includes(lowercasedSearch) ||
            item.TYPE.toLowerCase().includes(lowercasedSearch) ||
            item.ITEM.toLowerCase().includes(lowercasedSearch) ||
            item.DESCRIPTION.toLowerCase().includes(lowercasedSearch) ||
            item.QTY.toString().toLowerCase().includes(lowercasedSearch) ||
            item.UM.toLowerCase().includes(lowercasedSearch) ||
            item.CUSTOMER.toLowerCase().includes(lowercasedSearch) ||
            item.NO_STRUK.toLowerCase().includes(lowercasedSearch) ||
            item.STATUS.toLowerCase().includes(lowercasedSearch) ||
            (item.START_DATE && formatDate(item.START_DATE).toLowerCase().includes(lowercasedSearch)) ||
            item.late.toString().toLowerCase().includes(lowercasedSearch)
        );
        setFilteredData(filtered);
    }, [search, cashputstorage, formatDate]);

    const columns = [
        { name: 'No Document', selector: row => row.NO_DOCUMENT, sortable: true,width:'150px' },
        { name: 'Type', selector: row => row.TYPE, sortable: true ,width:'200px'},
        { name: 'Item', selector: row => row.ITEM, sortable: true  , width:'150px'},
        { name: 'Description', selector: row => row.DESCRIPTION, sortable: true,width:'450px' },
        { name: 'QTY', selector: row => row.QTY, sortable: true,width:'100px' },
        { name: 'UOM', selector: row => row.UM, sortable: true },
        { name: 'Customer', selector: row => row.CUSTOMER, sortable: true,width:'200px' },
        { name: 'No Struk', selector: row => row.NO_STRUK, sortable: true ,width:'200px'},
        { name: 'Status', selector: row => row.STATUS, sortable: true,width:'200px' },
        { name: 'Date', selector: row => row.START_DATE ? formatDate(row.START_DATE) : 'No Data', sortable: true, width:'150px' },
        { name: 'Late', selector: row => row.late, sortable: true,width:'100px' }
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#3399FF',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'normal',
            },
        },
    };

    return (
        <React.Fragment>
            {/* <div className="containers mt-5 mb-5">
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className='font-weight-bold'><i className='fa fa-folder'></i> STORAGE</span>
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
            </div> */}
              <div className="container mt-5 mb-5">
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                {/* <div className="card-header">
                                    <span className='font-weight-bold'>
                                        <i className='fa fa-folder'></i> Storage
                                    </span>
                                </div> */}
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



