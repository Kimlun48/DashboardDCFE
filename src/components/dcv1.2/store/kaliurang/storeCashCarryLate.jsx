import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';
import Api from "../../../../api";

const ChartCashCarryLate = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await Api.get("/api/kaliurangstorestatisticcashcarrylate");
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
        const interval = setInterval(fetchData, 2 * 60 * 1000); // Refresh setiap 2 menit
        return () => clearInterval(interval);
    }, []);

    const COLORS = ['#32ADE6', '#0857bf'];
   // console.log(data);
    const staticData = [
        { name: 'Late', value: 1 },
        { name: 'On Schedule', value: 2 },
        
    ];

    const handleClick = (entry) => {
        if (entry.name === 'Late') {
            window.open('/kaliurang/cashcarrylatedetail', '_blank');
        } else if (entry.name === 'On Schedule') {
            // navigate('/putawaystorageunlate');
            window.open('/kaliurang/cashcarryonscheduledetail', '_blank');
        }
    };

    return (
        <React.Fragment>
            <div className="col-12 mb-2">
                <div className="card-title">
                    <div className="text">
                        <h4 className="chart-title">Cash & Carry Late</h4>
                    </div>
                </div>
            </div>
            <div className="col-12 mb-2">
                <div className="card border-0 overflow-hidden">
                    <div className="chart-container-chart">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    fill="#8884d8"
                                    label
                                    stroke="none"
                                    innerRadius={60}
                                    onClick={(data, index) => handleClick(data)}
                                    className="pointer-cursor"

                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                    <Label value={`${data.find(item => item.name === 'Late')?.value || 0} Late`} position="center" />

                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        fontSize: 12,
                                        backgroundColor: '#fff',
                                        color: '#444',
                                        border: 'none',
                                        borderRadius: '5px',
                                        padding: '8px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className="legend">
                <div className="legend-item">
                    <div
                        className="square-icon"
                        style={{ backgroundColor: '#32ADE6', cursor: 'pointer' }}
                        onClick={() => window.open('/kaliurang/cashcarrylatedetail', '_blank')}
                    />
                    Late
                </div>

                <div className="legend-item">
                    <div
                        className="square-icon"
                        style={{ backgroundColor: '#0857bf', cursor: 'pointer' }}
                        onClick={() => window.open('/kaliurang/cashcarryonscheduledetail', '_blank')}
                    />
                    On Schedule
                </div>

               
            </div>
        </React.Fragment>
    );
};

export default ChartCashCarryLate;

// export default ChartCashCarryLate;

// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';
// import Api from "../../../../api";

// const ChartCashCarryLate = () => {
//     const [orderReceivedData, setOrderReceivedData] = useState([]);
//     const [beingProcessedData, setBeingProcessedData] = useState([]);
//     const [readyToPickUpData, setReadyToPickUpData] = useState([]);

//     const fetchData = async () => {
//         try {
//             const response = await Api.get("/api/kaliurangstorestatisticcashcarrylate");
//             console.log('get response semua dari backend', response);

//             if (response.status === 200 && response.data.data.length > 0) {
//                 console.log('get response jika key data.data jumlahnya > 0');

//                 // Pisahkan data berdasarkan TYPE
//                 const orderReceivedData = response.data.data
//                     .filter(item => item.TYPE === 'ORDER_RECEIVED')
//                     .map(item => ({ name: 'Order Received', value: parseInt(item.ORDER_RECEIVED, 10) }));

//                 const beingProcessedData = response.data.data
//                     .filter(item => item.TYPE === 'BEING_PROCESSED')
//                     .map(item => ({ name: 'Being Process', value: parseInt(item.ORDER_RECEIVED, 10) }));

//                 const readyToPickUpData = response.data.data
//                     .filter(item => item.TYPE === 'READY_TO_PICK_UP')
//                     .map(item => ({ name: 'Ready To PickUp', value: parseInt(item.ORDER_RECEIVED, 10) }));

//                 // Set data untuk grafik
//                 setOrderReceivedData(orderReceivedData.length > 0 ? orderReceivedData : [{ name: 'Order Received', value: 1 }]);
//                 setBeingProcessedData(beingProcessedData.length > 0 ? beingProcessedData : [{ name: 'Being Process', value: 1 }]);
//                 setReadyToPickUpData(readyToPickUpData.length > 0 ? readyToPickUpData : [{ name: 'Ready To PickUp', value: 1 }]);
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

//     return (
//         <React.Fragment>
//             <div className="col-12 mb-2">
//                 <div className="card-title">
//                     <div className="text">
//                         <h4 className="chart-title">Cash & Carry Late</h4>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-12 mb-2">
//                 <div className="card border-0 overflow-hidden">
//                     <div className="chart-container-chart">
//                         <ResponsiveContainer width="100%" height={300}>
//                             <PieChart>
//                                 <Pie
//                                     data={orderReceivedData}
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
//                                     {orderReceivedData.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={COLORS[0]} />
//                                     ))}
//                                     {/* <Label value="Order Received Data" position="center" /> */}
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
//             <div className="col-12 mb-2">
//                 <div className="card border-0 overflow-hidden">
//                     <div className="chart-container-chart">
//                         <ResponsiveContainer width="100%" height={300}>
//                             <PieChart>
//                                 <Pie
//                                     data={beingProcessedData}
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
//                                     {beingProcessedData.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={COLORS[1]} />
//                                     ))}
//                                     {/* <Label value="Being Process Data" position="center" /> */}
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
//             <div className="col-12 mb-2">
//                 <div className="card border-0 overflow-hidden">
//                     <div className="chart-container-chart">
//                         <ResponsiveContainer width="100%" height={300}>
//                             <PieChart>
//                                 <Pie
//                                     data={readyToPickUpData}
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
//                                     {readyToPickUpData.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={COLORS[2]} />
//                                     ))}
//                                     {/* <Label value="Ready To PickUp Data" position="center" /> */}
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
//                     Order Received
//                 </div>

//                 <div className="legend-item">
//                     <div
//                         className="square-icon"
//                         style={{ backgroundColor: '#0857bf', cursor: 'pointer' }}
//                         onClick={() => window.open('/kaliurang/binoutreportstore', '_blank')}
//                     />
//                     Being Process
//                 </div>

//                 <div className="legend-item">
//                     <div
//                         className="square-icon"
//                         style={{ backgroundColor: '#4F1787', cursor: 'pointer' }}
//                         onClick={() => window.open('/kaliurang/bintransitreportstore', '_blank')}
//                     />
//                     Ready To PickUp
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// };

// export default ChartCashCarryLate;
