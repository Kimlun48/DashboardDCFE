


// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';
// import Api from "../../../../api";

// const ChartStoreGrpoLate = () => {
//     const [data, setData] = useState([]);

//     const fetchData = async () => {
//         try {
//             const response = await Api.get("/api/grpokaliurangheaderstatisticstorebinlate");
//             if (response.status === 200 && response.data.data.length > 0) {
//                 const transformedData = response.data.data.map(item => {
//                     let name;
//                     switch (item.BinCode) {
//                         case '01021001-STORE-IN':
//                             name = 'Bin IN Store Late';
//                             break;
//                         case '01021001-TRANSIT':
//                             name = 'Bin Transit Store Late';
//                             break;
//                         case '01021001-STORE-OUT':
//                             name = 'Bin OUT Store Late';
//                             break;
//                         default:
//                             name = 'Unknown';
//                     }
//                     return { name, value: parseInt(item.ONHAND, 10) };
//                 });

//                 // Cek jika semua ONHAND adalah 0
//                 const allZero = transformedData.every(item => item.value === 0);
//                 if (allZero) {
//                     setData([
//                         { name: 'No Data IN', value: 1 },
//                         { name: 'No Data OUT', value: 1 },
//                         { name: 'No Data Transit', value: 1 },
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

//     return (
//         <React.Fragment>
//             <div className="col-12 mb-2">
//                 <div className="card-title">
//                     <div className="text">
//                         <h4 className="chart-title">Bin Late</h4>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-12 mb-2">
//                 <div className="card border-0 overflow-hidden">
//                     <div className="chart-container-chart">
//                         <ResponsiveContainer width="100%" height={300}>
//                             <PieChart>
//                                 <Pie
//                                     data={data}
//                                     dataKey="value"
//                                     nameKey="name"
//                                     cx="50%"
//                                     cy="50%"
//                                     outerRadius={120}
//                                     fill="#8884d8"
//                                  //   label
//                                     stroke="none"
//                                     innerRadius={60}

//                                 >
//                                     {data.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                     ))}
//                                     {/* <Label value="Bin Late Data" position="center" /> */}
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
//                         onClick={() => window.open('/kaliurang/bininlatedetail', '_blank')}
//                     />
//                     Bin IN Store Late
//                 </div>

//                 <div className="legend-item">
//                     <div
//                         className="square-icon"
//                         style={{ backgroundColor: '#0857bf', cursor: 'pointer' }}
//                         onClick={() => window.open('/kaliurang/binoutlatedetail', '_blank')}
//                     />
//                     Bin OUT Store Late
//                 </div>

//                 <div className="legend-item">
//                     <div
//                         className="square-icon"
//                         style={{ backgroundColor: '#4F1787', cursor: 'pointer' }}
//                         onClick={() => window.open('/kaliurang/bintransitlatedetail', '_blank')}
//                     />
//                     Bin Transit Store Late
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// };

// export default ChartStoreGrpoLate;




import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';
import Api from "../../../../api";

const ChartStoreGrpoLate = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await Api.get("/api/grpokaliurangheaderstatisticstorebinlate");
            if (response.status === 200 && response.data.data.length > 0) {
                const transformedData = response.data.data.map(item => {
                    let name;
                    switch (item.BinCode) {
                        case '01021001-STORE-IN':
                            name = 'Bin IN Store Late';
                            break;
                        case '01021001-TRANSIT':
                            name = 'Bin Transit Store Late';
                            break;
                        case '01021001-STORE-OUT':
                            name = 'Bin OUT Store Late';
                            break;
                        default:
                            name = 'Unknown';
                    }
                    return { name, value: parseInt(item.ONHAND, 10) };
                });

                // Cek jika semua ONHAND adalah 0
                const allZero = transformedData.every(item => item.value === 0);
                if (allZero) {
                    setData([
                        { name: 'No Data IN', value: 1 },
                        { name: 'No Data OUT', value: 1 },
                        { name: 'No Data Transit', value: 1 },
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

    const COLORS = ['#01FEFF', '#CD0099', '#FF6608'];

    // const handleClick = (entry) => {
    //     if (entry.name === 'Bin IN Store Late') {
    //         window.open('/kaliurang/bininlatedetail', '_blank');
    //     } else if (entry.name === 'Bin OUT Store Late') {
    //         // navigate('/putawaystorageunlate');
    //         window.open('/kaliurang/binoutlatedetail', '_blank');
    //     } else if (entry.name === 'Bin Transit Store Late') {
    //         // navigate('/putawaystorageunlate');
    //         window.open('/kaliurang/bintransitlatedetail', '_blank');
    //     }
    // };

    const handleClick = (entry) => {
        const urlMap = {
            'Bin IN Store Late': '/kaliurang/bininlatedetail',
            'Bin OUT Store Late': '/kaliurang/binoutlatedetail',
            'Bin Transit Store Late': '/kaliurang/bintransitlatedetail',
        };
    
        const url = urlMap[entry.name];
        if (url) {
            window.open(url, '_blank');
        }
    };

    return (
        <React.Fragment>
            <div className="col-12 mb-2">
                <div className="card-title">
                    <div className="text">
                        <h4 className="chart-title">Bin Late</h4>
                    </div>
                </div>
            </div>
           
                   
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    fill="#8884d8"
                                   //label
                                    stroke="none"
                                    innerRadius={60}
                                     onClick={(data, index) => handleClick(data)}
                                    className="pointer-cursor"
                                    paddingAngle={1}

                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                     <Label value={`${data.find(item => item.name === 'Late')?.value || 0} Late`} position="center" />
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

export default ChartStoreGrpoLate;



