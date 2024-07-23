//import useState dan useEffect
import React, { useState, useEffect,useRef } from 'react';

//import api
import Api from '../../api';

//import Link
import { Link } from 'react-router-dom';


import AdminLayout from '../../layouts/AdminInbound';
import useFormatDate from '../../components/utilites/useFormatDate';
import DataTable from 'react-data-table-component';

function IlsLate() {


    document.title = "Crosdock Late";

    const [ilssp, setIlssp] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { formatDate } = useFormatDate();
    const time = 30 * 60 * 1000; //30 menit

const fetchData = async () => {
    try {
        const response = await Api.get('api/late');
        setIlssp(response.data.data);
        setFilteredData(response.data.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const audioRef = useRef(null);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };
    
    const stopSound = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Reset audio ke awal
        }
    };

    useEffect(() => {
        if (ilssp.length > 0) {
            playSound();
        } else {
            stopSound();
        }
    }, [ilssp]);

    useEffect (()=>{
        fetchData();
        const interval = setInterval(() => {
            fetchData();
            console.log("ok");
          }, time);
      
          return () => clearInterval(interval);
    },[]);

// useEffect(() => {
//     fetchData();
// }, []);

useEffect(() => {
    const lowercasedSearch = search.toLowerCase();
    const filtered = ilssp.filter(item =>
     
        item.ITEM_DESC.toLowerCase().includes(lowercasedSearch)    
    );
    setFilteredData(filtered);
}, [search, ilssp, formatDate]);

const columns = [
   
   
    { name: 'Item', selector: row => row.item, sortable: true,width:'200px' },
    { name: 'Desc', selector: row => row.ITEM_DESC, sortable: true, width:'400px' },
    { name: 'QTY', selector: row => row.qty, sortable: true , width:'100px'},
    { name: 'Entry Date', selector: row => row.latest_date_time_stamp ? formatDate(row.latest_date_time_stamp) : 'No Data', sortable: true }, 
    { name: 'Late', selector: row => row.late, sortable: true ,width:'100px'},
    
];

const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#3399FF', // Custom header color
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
        },
    },
};

return (
    <React.Fragment>
        <AdminLayout>
            <div className="containers mt-5 mb-5">
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className='font-weight-bold'><i className='fa fa-folder'></i> CROSSDOCK LATES</span>
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
                <audio ref={audioRef} src="/sounds/Crossdock.mp3" />
            </div>
        </AdminLayout>
    </React.Fragment>
);
}

//     document.title = "CROSSDOCK LATE";

//     const {formatDate} = useFormatDate();

//     const [ilslate, setIlslate] = useState([]);

//     const time = 30 * 60 * 1000; //30 menit

//     const fetchDataIls = async () => {
//         await api.get('api/late')
//         .then(response => {
//             setIlslate(response.data.data);
//         })
//     }
//     const audioRef = useRef(null);

//     const playSound = () => {
//         if (audioRef.current) {
//             audioRef.current.play();
//         }
//     };
    
//     const stopSound = () => {
//         if (audioRef.current) {
//             audioRef.current.pause();
//             audioRef.current.currentTime = 0; // Reset audio ke awal
//         }
//     };

//     useEffect(() => {
//         if (ilslate.length > 0) {
//             playSound();
//         } else {
//             stopSound();
//         }
//     }, [ilslate]);

//     useEffect (()=>{
//         fetchDataIls();
//         const interval = setInterval(() => {
//             fetchDataIls();
//             console.log("ok");
//           }, time);
      
//           return () => clearInterval(interval);
//     },[]);
//     return (
//         <React.Fragment>
//             <AdminLayout>
//                 {/* <PlaySound /> */}
//         <div className="containers mt-5 mb-5">
//             <div className="row mt-4">
//                 <div className="col-md-12">
//                     <div className="card border-0 rounded shadow-sm border-top-success">
//                         <div className="card-header">
//                             <span className='font-weight-bold'><i className='fa fa folder'></i> CROSSDOCK LATE</span>
//                             <div className="table-responsive">
//                             <table className="table table-bordered">
//                                 <thead className="bg-light text-white">
//                                     <tr>
                                       
//                                         <th scope='col'>Item</th>
//                                         <th scope='col'>Desc</th>
//                                         <th scope='col'>QTY</th>
//                                         <th scope='col'>Entry Date</th>
//                                         <th scope='col'>Late</th>

//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                 {
//                                         ilslate.length > 0
//                                             ?   ilslate.map((ilslate, index) => (
//                                                     <tr key={ index }>
                                                      
//                                                         <td>{ilslate.item}</td>
//                                                         <td>{ilslate.ITEM_DESC }</td>
//                                                         <td>{ilslate.qty }</td>
//                                                         <td>{formatDate(ilslate.latest_date_time_stamp)}</td>
//                                                         <td>{ilslate.late}</td>
                                                        
//                                                     </tr>
//                                                 ))

//                                             :   <tr>
//                                                     <td colSpan="4" className="text-center">
//                                                         <div className="alert alert-danger mb-0">
//                                                             Data Belum Tersedia!
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                     }
                                           
//                                 </tbody>
//                                 <audio ref={audioRef} src="/sounds/Crossdock.mp3" />
//                             </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </AdminLayout>
//         </React.Fragment>
//     )
// }
export default IlsLate