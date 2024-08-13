// //import react  
// import React, {useState, useEffect}from "react";
// import AddchartIcon from '@mui/icons-material/Addchart';
// import Api from "../../../../api";
// //import layout admin
// // 
// import AdminLayout from "../../../../components/dcv1.2/layouts/adminlayout";

// function DashboardAdmin() {
//     const [inboundData, setInboundData] = useState([]);
//     const [storageData, setStorageData] = useState([]);
//     const [outboundData, setOutboundData] = useState([]);
//     const [hasLateData, setHasLateData] = useState(false);
//     const time = 2 * 60 * 1000;

//     const fetchData = async () => {
//         try {
//             const responses = await Promise.all([
//                 // inbound
//                 Api.get('api/v2statisticitrin'),
//                 Api.get('api/v2statisticcrossdock'),
//                 Api.get('api/v2statisticpo'),
//                 Api.get('api/v2statisticreturn'),

//                 // storage
//                 Api.get('api/v2statisticcashpicking'),
//                 Api.get('api/v2statisticdeliverypicking'),
//                 Api.get('api/v2statisticputaway'),
//                 Api.get('api/v2statisticreplenishment'),

//                 // outbound
//                 Api.get('api/v2statisticarreserve'),
//                 Api.get('api/v2statisticitrout'),
//                 Api.get('api/v2statisticsalesorder'),
//             ]);

//             const data = responses.map(response => response.data.data);

//             // Mengelompokkan data berdasarkan kategori
//             const inbound = data.slice(0, 4);
//             const storage = data.slice(4, 8);
//             const outbound = data.slice(8, 11);

//             setInboundData(inbound);
//             setStorageData(storage);
//             setOutboundData(outbound);

//             // Debugging: log data received from APIs
//             console.log('Data received from APIs:', data);

//             // Check if there is any late data in any of the responses
//             const lateData = data.some(endpointData =>
//                 endpointData.late > 0
//             );
//             setHasLateData(lateData);

//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//         const interval = setInterval(() => {
//             fetchData();
//             console.log("Data fetched");
//         }, time);
//         return () => clearInterval(interval);
//     }, []);

//     // Fungsi untuk menghitung total dari data kategori
//     const calculateTotal = (data, key) => {
//         return data.reduce((acc, item) => acc + item[key], 0);
//     };

//     // Menghitung total per kategori
//     const totalInbound = calculateTotal(inboundData, 'total');
//     const totalStorage = calculateTotal(storageData, 'total');
//     const totalOutbound = calculateTotal(outboundData, 'total');


// 	//title page
//     document.title = "Dashboard-DC";

//     return(
//         <React.Fragment>
//             <AdminLayout>
//             {/* <div>
//             <h1>Dashboard</h1>
            
//             <h2>Inbound Data</h2>
//             {inboundData.map((data, index) => (
//                 <div key={index}>
//                     <pre>{JSON.stringify(data, null, 2)}</pre>
//                 </div>
//             ))}
//             <p>Total Inbound: {totalInbound}</p>

//             <h2>Storage Data</h2>
//             {storageData.map((data, index) => (
//                 <div key={index}>
//                     <pre>{JSON.stringify(data, null, 2)}</pre>
//                 </div>
//             ))}
//             <p>Total Storage: {totalStorage}</p>

//             <h2>Outbound Data</h2>
//             {outboundData.map((data, index) => (
//                 <div key={index}>
//                     <pre>{JSON.stringify(data, null, 2)}</pre>
//                 </div>
//             ))}
//             <p>Total Outbound: {totalOutbound}</p>

//             {hasLateData && <p>There is some late data!</p>}
//         </div> */}
//              <div className="containers mt-4 mb-5">
//                 <div className="row mt-4">
//                     <div className="col-12">
//                         <div className="card border-0 rounded shadow-sm border-top-success">
//                             <div className="card-header">
//                                 <span className="font-weight-bold"><AddchartIcon /> DASHBOARD</span>
//                                 <div className="row mt-4">
//                     <div className="col-12 col-lg-4 mb-4 dash">
//                     <div className="card border-0 shadow-sm overflow-hidden">
//                         <div className="card-body p-0 d-flex align-items-center">
//                             <div className="bg-primary py-4 px-5 mfe-3" style={{ width: "130px" }}>
//                                 <i className="fas fa fa-sign-in-alt fa-2x text-white"></i>
//                             </div>
//                             <div>
//                                 <div className="text-value text-primary">{totalInbound}</div>
//                                 <div className="text-white text-uppercase font-weight-bold small">
//                                     INBOUND
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     </div>
//                     <div className="col-12 col-lg-4 mb-4 dash">
//                     <div className="card border-0 rounded shadow-sm overflow-hidden">
//                         <div className="card-body p-0 d-flex align-items-center">
//                             <div className="bg-success py-4 px-5 mfe-3" style={{ width: "130px" }}>
//                                 <i className="fas fa fa-database fa-2x text-white"></i>
//                             </div>
//                             <div>
//                                 <div className="text-value text-success">{totalStorage}</div>
//                                 <div className="text-white text-uppercase font-weight-bold small">
//                                     STORAGE
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     </div>
//                     <div className="col-12 col-lg-4 mb-4 dash">
//                     <div className="card border-0 rounded shadow-sm overflow-hidden">
//                         <div className="card-body p-0 d-flex align-items-center">
//                             <div className="bg-danger py-4 px-5 mfe-3" style={{ width: "130px" }}>
//                                 <i className="fas fa fa-sign-out-alt fa-2x text-white"></i>
//                             </div>
//                             <div>
//                                 <div className="text-value text-danger">{totalOutbound}</div>
//                                 <div className="text-white text-uppercase font-weight-bold small">
//                                     OUTBOUND
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     </div>
//                     <div className="col-12 col-lg-3 mb-4">
                   
//                     </div>
//                 </div>

//                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </AdminLayout>
//         </React.Fragment>
//     )

// }

// export default DashboardAdmin
import React, { useState, useEffect } from "react";
import AddchartIcon from '@mui/icons-material/Addchart';
import Api from "../../../../api";
import ChartGrpoLastMonth from "../../../../components/dcv1.2/inbound/grpo/chartgrpo";
import TableGrpo from "../../../../components/dcv1.2/inbound/grpo/tablegrpo";
import AdminLayout from "../../../../components/dcv1.2/layouts/adminlayout";

function DashboardAdmin() {
    const [inboundData, setInboundData] = useState([]);
    const [storageData, setStorageData] = useState([]);
    const [outboundData, setOutboundData] = useState([]);
    const [hasLateData, setHasLateData] = useState(false);
    const time = 30 * 60 * 1000;

    const fetchData = async () => {
        try {
            const responses = await Promise.all([
                Api.get('api/v2statisticitrin'),
                Api.get('api/v2statisticcrossdock'),
                Api.get('api/v2statisticpo'),
                Api.get('api/v2statisticreturn'),
                Api.get('api/v2statisticcashpicking'),
                Api.get('api/v2statisticdeliverypicking'),
                Api.get('api/v2statisticputaway'),
                Api.get('api/v2statisticreplenishment'),
                Api.get('api/v2statisticarreserve'),
                Api.get('api/v2statisticitrout'),
                Api.get('api/v2statisticsalesorder'),
            ]);

            const data = responses.map(response => response.data.data);

            const inbound = data.slice(0, 4);
            const storage = data.slice(4, 8);
            const outbound = data.slice(8, 11);

            setInboundData(inbound);
            setStorageData(storage);
            setOutboundData(outbound);

            console.log('Data received from APIs:', data);

            const lateData = data.some(endpointData =>
                endpointData.late > 0
            );
            setHasLateData(lateData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
            console.log("Data fetched");
        }, time);
        return () => clearInterval(interval);
    }, []);

    const calculateTotal = (data, key) => {
        return data.reduce((acc, item) => acc + item[key], 0);
    };

    const totalInbound = calculateTotal(inboundData, 'TOTAL');
    const totalStorage = calculateTotal(storageData, 'TOTAL');
    const totalOutbound = calculateTotal(outboundData, 'TOTAL');

    document.title = "Dashboard-DC";

    return (
        <React.Fragment>
            <AdminLayout>
                {/* <div className="containers mt-4 mb-5"> */}
                <div className="containers">
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-header">
                                    <span className="font-weight-bold"><AddchartIcon /> DASHBOARD</span>
                                    <div className="row mt-4">
                                        <div className="col-12 col-lg-4 mb-4 dash">
                                            <div className="card border-0 shadow-sm overflow-hidden">
                                                <div className="card-body p-0 d-flex align-items-center">
                                                    <div className="bg-primary py-4 px-5 mfe-3" style={{ width: "130px" }}>
                                                        <i className="fas fa fa-sign-in-alt fa-2x text-white"></i>
                                                    </div>
                                                    <div>
                                                        <div className="text-value text-primary">{totalInbound}</div>
                                                        <div className="text-white text-uppercase font-weight-bold small">
                                                            INBOUND
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-4 mb-4 dash">
                                            <div className="card border-0 rounded shadow-sm overflow-hidden">
                                                <div className="card-body p-0 d-flex align-items-center">
                                                    <div className="bg-success py-4 px-5 mfe-3" style={{ width: "130px" }}>
                                                        <i className="fas fa fa-database fa-2x text-white"></i>
                                                    </div>
                                                    <div>
                                                        <div className="text-value text-success">{totalStorage}</div>
                                                        <div className="text-white text-uppercase font-weight-bold small">
                                                            STORAGE
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-4 mb-4 dash">
                                            <div className="card border-0 rounded shadow-sm overflow-hidden">
                                                <div className="card-body p-0 d-flex align-items-center">
                                                    <div className="bg-danger py-4 px-5 mfe-3" style={{ width: "130px" }}>
                                                        <i className="fas fa fa-sign-out-alt fa-2x text-white"></i>
                                                    </div>
                                                    <div>
                                                        <div className="text-value text-danger">{totalOutbound}</div>
                                                        <div className="text-white text-uppercase font-weight-bold small">
                                                            OUTBOUND
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="containers mt-5 mb-5"> */}
                <div className="containers">
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-header">
                                <div className="row mt-4">
                                        <div className="col-md-6">
                                            <TableGrpo />
                                        </div>
                                        <div className="col-md-6">
                                            <ChartGrpoLastMonth />
                                        </div>
                                        <div className="col-12 col-lg-3 mb-4"></div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </AdminLayout>
        </React.Fragment>
    );
}

export default DashboardAdmin;
