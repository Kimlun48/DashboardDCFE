// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';
// import Api from "../../../../api";

// const ChartItrOutLate = () => {
//     const [data, setData] = useState([]);

//     const fetchData = async () => {
//         try {
//             const response = await Api.get("/api/kaliurangstorestatisticitroutlate");
//             if (response.status === 200 && response.data.data.length > 0) {
//                 const transformedData = response.data.data.map(item => {
//                     let name;
//                     switch (item.TYPE) {
//                         case 'ORDER_RECEIVED':
//                             name = 'Order Received Late';
//                             break;
//                         case 'BEING_PROCESSED':
//                             name = 'Being Process Late';
//                             break;
//                         case 'READY_TO_PICK_UP':
//                             name = 'Ready To PickUp Late';
//                             break;
//                         default:
//                             name = 'Unknown';
//                     }
//                     return { name, value: parseInt(item.ORDER_RECEIVED, 10) };
//                 });
//              //   console.log(transformedData);

//                 // Cek jika semua ONHAND adalah 0
//                 const allZero = transformedData.every(item => item.value === 0);
//                 if (allZero) {
//                     setData([
//                         { name: 'Order Received Late', value: 1 },
//                         { name: 'Being Process Late', value: 1 },
//                         { name: 'Ready To PickUp Late', value: 1 },
//                     ]);
//                 } else {
//                     setData(transformedData);
//                 }
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//         const interval = setInterval(fetchData, 2 * 60 * 1000); // Refresh setiap 2 menit
//         return () => clearInterval(interval);
//     }, []);

//     const COLORS = ['#32ADE6', '#0857bf', '#4F1787'];
//    // console.log(data);
//     const staticData = [
//         { name: 'Order Received Late', value: 1 },
//         { name: 'Being Process Late', value: 2 },
//         { name: 'Ready To PickUp Late', value: 1 }
//     ];

//     return (
//         <React.Fragment>
//             <div className="col-12 mb-2">
//                 <div className="card-title">
//                     <div className="text">
//                         <h4 className="chart-title">ITR Out Late</h4>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-12 mb-2">
//                 <div className="card border-0 overflow-hidden">
//                     <div className="chart-container-chart">
//                         <ResponsiveContainer width="100%" height={300}>
//                             <PieChart>
//                                 <Pie
//                                     data={staticData}
//                                     dataKey="value"
//                                     nameKey="name"
//                                     cx="50%"
//                                     cy="50%"
//                                     outerRadius={120}
//                                     fill="#8884d8"
//                                     label
//                                     stroke="none"
//                                     innerRadius={60}

//                                 >
//                                     {data.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                     ))}
//                                     {/* <Label value="Cash & Carry Data" position="center" /> */}
//                                 </Pie>
//                                 <Tooltip
//                                     contentStyle={{
//                                         fontSize: 12,
//                                         backgroundColor: '#fff',
//                                         color: '#444',
//                                         border: 'none',
//                                         borderRadius: '5px',
//                                         padding: '8px'
//                                     }}
//                                 />
//                             </PieChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>
//             </div>
//             <div className="legend">
//                 <div className="legend-item">
//                     <div
//                         className="square-icon"
//                         style={{ backgroundColor: '#32ADE6', cursor: 'pointer' }}
//                         onClick={() => window.open('/kaliurang/bininreportstore', '_blank')}
//                     />
//                     Order Received Late
//                 </div>

//                 <div className="legend-item">
//                     <div
//                         className="square-icon"
//                         style={{ backgroundColor: '#0857bf', cursor: 'pointer' }}
//                         onClick={() => window.open('/kaliurang/binoutreportstore', '_blank')}
//                     />
//                     Being Process Late
//                 </div>

//                 <div className="legend-item">
//                     <div
//                         className="square-icon"
//                         style={{ backgroundColor: '#4F1787', cursor: 'pointer' }}
//                         onClick={() => window.open('/kaliurang/bintransitreportstore', '_blank')}
//                     />
//                     Ready To PickUp Late
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// };

// export default ChartItrOutLate;

// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';
// import Api from "../../../../api";

// const ChartItrInLate = () => {
//     const [data, setData] = useState([]);

//     const fetchData = async () => {
//         try {
//             const response = await Api.get("/api/kaliurangstorestatisticitrinlate");
//             if (response.status === 200 && response.data.data.length > 0) {
//                 const transformedData = response.data.data.map(item => {
//                     let name;
//                     switch (item.TYPE) {
//                         case 'ORDER_RECEIVED':
//                             name = 'Order Received Late';
//                             break;
//                         case 'BEING_PROCESSED':
//                             name = 'Being Process Late';
//                             break;
//                         case 'READY_TO_PICK_UP':
//                             name = 'Ready To PickUp Late';
//                             break;
//                         case 'ITR_TRANSIT':
//                             name = 'ITR Transit Late';
//                             break;
//                         default:
//                             name = 'Unknown';
//                     }
//                     return { name, value: parseInt(item.ORDER_RECEIVED, 10) };
//                 });
//              //   console.log(transformedData);

//                 // Cek jika semua ONHAND adalah 0
//                 const allZero = transformedData.every(item => item.value === 0);
//                 if (allZero) {
//                     setData([
//                         { name: 'Order Received Late', value: 1 },
//                         { name: 'Being Process Late', value: 1 },
//                         { name: 'Ready To PickUp Late', value: 1 },
//                         { name: 'ITR Transit Late', value: 1 },
//                     ]);
//                 } else {
//                     setData(transformedData);
//                 }
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//         const interval = setInterval(fetchData, 2 * 60 * 1000); // Refresh setiap 2 menit
//         return () => clearInterval(interval);
//     }, []);

//     const COLORS = ['#32ADE6', '#0857bf', '#4F1787', '#EB3678'];
//    // console.log(data);
//     const staticData = [
//         { name: 'Order Received Late', value: 4},
//         { name: 'Being Process Late', value: 2 },
//         { name: 'Ready To PickUp Late', value: 8 },
//         { name: 'ITR Transit Late', value: 10 }
//     ];

//     return (
//         <React.Fragment>
//             <div className="col-12 mb-2">
//                 <div className="card-title">
//                     <div className="text">
//                         <h4 className="chart-title">ITR In Late</h4>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-12 mb-2">
//                 <div className="card border-0 overflow-hidden">
//                     <div className="chart-container-chart">
//                         <ResponsiveContainer width="100%" height={300}>
//                             <PieChart>
//                                 <Pie
//                                     data={staticData}
//                                     dataKey="value"
//                                     nameKey="name"
//                                     cx="50%"
//                                     cy="50%"
//                                     outerRadius={120}
//                                     fill="#8884d8"
//                                     label
//                                     stroke="none"
//                                     innerRadius={60}

//                                 >
//                                     {data.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                     ))}
//                                     {/* <Label value="Cash & Carry Data" position="center" /> */}
//                                 </Pie>
//                                 <Tooltip
//                                     contentStyle={{
//                                         fontSize: 12,
//                                         backgroundColor: '#fff',
//                                         color: '#444',
//                                         border: 'none',
//                                         borderRadius: '5px',
//                                         padding: '8px'
//                                     }}
//                                 />
//                             </PieChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>
//             </div>
//             <div className="legend">
//                 <div className="legend-item">
//                     <div
//                         className="square-icon"
//                         style={{ backgroundColor: '#32ADE6', cursor: 'pointer' }}
//                         onClick={() => window.open('/kaliurang/bininreportstore', '_blank')}
//                     />
//                     Order Received Late
//                 </div>

//                 <div className="legend-item">
//                     <div
//                         className="square-icon"
//                         style={{ backgroundColor: '#0857bf', cursor: 'pointer' }}
//                         onClick={() => window.open('/kaliurang/binoutreportstore', '_blank')}
//                     />
//                     Being Process Late
//                 </div>

//                 <div className="legend-item">
//                     <div
//                         className="square-icon"
//                         style={{ backgroundColor: '#4F1787', cursor: 'pointer' }}
//                         onClick={() => window.open('/kaliurang/bintransitreportstore', '_blank')}
//                     />
//                     Ready To PickUp Late
//                 </div>

//                 <div className="legend-item">
//                     <div
//                         className="square-icon"
//                         style={{ backgroundColor: '#EB3678', cursor: 'pointer' }}
//                         onClick={() => window.open('/kaliurang/bintransitreportstore', '_blank')}
//                     />
//                     ITR Transit Late
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// };

// export default ChartItrInLate;

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';
import Api from "../../../../api";

const ChartItrOutLate = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await Api.get("/api/kaliurangstorestatisticitroutlate");
            if (response.status === 200 && response.data.data.length > 0) {
                const transformedData = response.data.data.map(item => {
                    let name;
                    switch (item.TYPE) {
                        case 'LATE':
                            name = 'Late'; 
                            break;
                        case 'ONSCHEDULED':
                            name = 'On Schedule';
                            break;
                        default:
                            name = 'Unknown';
                    }
                    return { name, value: parseInt(item.LATE, 10) };
                });
             //   console.log(transformedData);

                // Cek jika semua ONHAND adalah 0
                const allZero = transformedData.every(item => item.value === 0);
                if (allZero) {
                    setData([
                        { name: 'Late', value: 1 },
                        { name: 'On Schedule', value: 1 },
                        
                    ]);
                } else {
                    setData(transformedData);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60 * 60 * 1000); // Refresh setiap 2 menit
        return () => clearInterval(interval);
    }, []);

    const COLORS = ['#CC2D24', '#2D67AA'];
   // console.log(data);
    const staticData = [
        { name: 'Late', value: 1 },
        { name: 'On Schedule', value: 2 },
        
    ];

    const handleClick = (entry) => {
        if (entry.name === 'Late') {
            window.open('/kaliurang/itroutlatedetail', '_blank');
        } else if (entry.name === 'On Schedule') {
            // navigate('/putawaystorageunlate');
            window.open('/kaliurang/itroutonscheduledetail', '_blank');
        }
    };

    return (
        <React.Fragment>
            <div className="col-12 mb-2">
                <div className="card-title">
                    <div className="text">
                        <h4 className="chart-title">ITR Out Late</h4>
                    </div>
                </div>
            </div>
           
            <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                            <defs>
                            <linearGradient id="colorLate" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="0%" stopColor="#CC2D24" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#CC2D24" stopOpacity={0.5}/>
                             </linearGradient>
                             <linearGradient id="colorOnScahedule" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="10%" stopColor="#2D67AA" stopOpacity={1}/>
                             <stop offset="100%" stopColor="#2D67AA" stopOpacity={0.5}/>
                             </linearGradient>
                             </defs>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    fill="#8884d8"
                                    label={({ value }) => `${value !== undefined && !isNaN(value) ? value : 0}`} 
                                    stroke="none"
                                    innerRadius={60}
                                    onClick={(data, index) => handleClick(data)}
                                    className="pointer-cursor"

                                    
                                    paddingAngle={1}
                                    

                                >
                                    {/* {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))} */}
                                    {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.name === 'Late' ? 'url(#colorLate)' : 'url(#colorOnScahedule)'}
                                    />
                                ))}
                                    <Label value={`${data.find(item => item.name === 'Late')?.value || 0} Late`}
                                     position="center"
                                     style={{  fill:'whitesmoke', }}
                                      />

                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        fontSize: 10,
                                        backgroundColor: '#fff',
                                        color: '#444',
                                        border: 'none',
                                        borderRadius: '5px',
                                        padding: '8px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                   
        </React.Fragment>
    );
};

export default ChartItrOutLate;