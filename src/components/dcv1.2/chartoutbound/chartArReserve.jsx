// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, CartesianGrid } from 'recharts';
// import Api from "../../../api";

// const ChartArReserve = () => {
//     // const [totalqtylate, setTotalQtyLate] = useState(0);
//     // const [totalqtyontime, setTotalQtyOntime] = useState(0);
//     const [totaldoclate, setTotalDocLate] = useState(0);
//     const [totaldoctoday, setTotalDocToday] = useState(0);
//     const [totaldday, setTotalDday] = useState(0);
//     const [total, setTotal] = useState(0);
//     const navigate = useNavigate();
//     const time = 2 * 60 * 1000; // 2 minutes

//     const fetchData = async () => {
//         try {
//             const response = await Api.get('api/v2statisticarreserve');
//             const data = response.data.data;
//             setTotalDocLate(data.Total_Doc_late);
//             setTotalDocToday(data.Total_Doc_today);
//             setTotalDday(data.Total_Doc_dDay);
//             setTotal(data.total);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             // Display error to the user
//         }
//     };

//     useEffect(() => {
//         fetchData();
//         const interval = setInterval(() => {
//             fetchData();
//         }, time);

//         return () => clearInterval(interval);
//     }, []);

//     const data = [
//         // { name: 'QTY LATE', value: totalqtylate },
//         // { name: 'QTY ON TIME', value: totalqtyontime },
//         // { name: 'DOC LATE', value: totaldoclate },
//         // { name: 'DOC ON TIME', value: totaldocontime },
//         { name: 'DOC LATE', value: totaldoclate },
//         { name: 'DOC TODAY', value: totaldoctoday },
//         { name: 'DOC H-1', value: totaldday },
//     ];

//     // const handleClick = (entry) => {
//     //     if (entry.name === 'QTY LATE' || entry.name === 'DOC LATE') {
//     //         navigate('/late-details'); // Adjust navigation path
//     //     } else if (entry.name === 'QTY ON TIME' || entry.name === 'DOC ON TIME') {
//     //         navigate('/ontime-details'); // Adjust navigation path
//     //     }
//     // };

//     return (
//         <React.Fragment>
//             <div className="col-12 mb-2">
//                 <div className="card-total">
//                     <div className="text">
//                         <h4 className="chart-title">A/R Reserve Invoice</h4>
//                         {total}
//                     </div>
//                 </div>
//             </div>
//             <div className="col-12 mb-2">
//                 <div className="card border-0 overflow-hidden">
//                     <div className="chart-container-chart">
//                         <ResponsiveContainer width="100%" height={300}>
//                             <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
//                                 <defs>
//                                     <linearGradient id="colorLate" x1="0" y1="0" x2="1" y2="0">
//                                         <stop offset="50%" stopColor="#fe6600" />
//                                         <stop offset="100%" stopColor="#ff9900" />
//                                     </linearGradient>
//                                     <linearGradient id="colorToday" x1="0" y1="0" x2="1" y2="0">
//                                         <stop offset="50%" stopColor="#044f9f" />
//                                         <stop offset="100%" stopColor="#0066ff" />
//                                     </linearGradient>
//                                     <linearGradient id="colorH-12" x1="0" y1="0" x2="1" y2="0">
//                                     <stop offset="50%" stopColor="#9edd0f" />
//                                     <stop offset="100%" stopColor="#38761d" />
//                                     </linearGradient>
                                   
//                                 </defs>
//                                 <XAxis type="number" tick={{ fontSize: 12 }} className="chart-x-axis" />
//                                 <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} className="chart-y-axis" />
//                                 <Tooltip 
//                            contentStyle = {{ 
//                             fontSize: 12, 
//                             backgroundColor: '#fff', 
//                             color: '#444',
//                             border:'none',
//                             borderRadius:'5px',
//                             padding: '8px' }} />
//                                 {/* <CartesianGrid stroke="#ccc" strokeDasharray="1 1" /> */}
//                                 <Bar dataKey="value" radius={[0, 10, 10, 0]} onClick={(data) => handleClick(data)} className="chart-bar">
//                                     <LabelList dataKey="value" position="right" style={{ fontSize: 16, fill: '#fff' }} className="chart-label-list" />
//                                     {data.map((entry, index) => {
//                                         let fillId;
//                                         switch (entry.name) {
//                                             case 'DOC LATE':
//                                                 fillId = 'colorLate';
//                                                 break;
//                                             case 'DOC TODAY':
//                                                 fillId = 'colorToday';
//                                                 break;
//                                             case 'DOC H-1':
//                                                 fillId = 'colorH-12';
//                                                 break;
                                           
                                           
//                                         }
//                                         return <Cell key={`cell-${index}`} fill={`url(#${fillId})`} />;
//                                     })}
//                                 </Bar>
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-12 mb-2">
//                 <div className="card-total-bawah">
//                     <div className="text-center">
//                         <div className="total-text">
//                              <div className="square-icon orange">Late</div>
//                             <div className="square-icon blue">Today</div>
//                             <div className="square-icon green">H-1</div>
                           
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// };

// export default ChartArReserve;

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, CartesianGrid } from 'recharts';
import Api from "../../../api";

const ChartArReserve = () => {
    const [totaldoclate, setTotalDocLate] = useState(0);
    const [totaldoctoday, setTotalDocToday] = useState(0);
    const [totaldday, setTotalDday] = useState(0);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const time = 2 * 60 * 1000; // 2 minutes

    const fetchData = async () => {
        try {
            const response = await Api.get('api/v2statisticarreserve');
            const data = response.data.data;
            setTotalDocLate(data.TOTAL_DOC_LATE);
            setTotalDocToday(data.TOTAL_DOC_TODAY);
            setTotalDday(data.TOTAL_DOC_DDAY);
            setTotal(data.TOTAL);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Display error to the user
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, time);

        return () => clearInterval(interval);
    }, []);

    const data = [
        { name: 'DOC LATE', value: totaldoclate },
        { name: 'DOC TODAY', value: totaldoctoday },
        { name: 'DOC H-1', value: totaldday },
    ];

    const handleClick = (entry) => {
        if (entry.name === 'DOC LATE') {
            navigate('#'); // Adjust navigation path
        } else if (entry.name === 'DOC TODAY') {
            navigate('#'); // Adjust navigation path
        } else if (entry.name === 'DOC H-1') {
            navigate('#'); // Adjust navigation path
        }
    };

    return (
        <React.Fragment>
            <div className="col-12 mb-2">
                <div className="card-total">
                    <div className="text">
                        <h4 className="chart-title">A/R Reserve Invoice</h4>
                        {total}
                    </div>
                </div>
            </div>
            <div className="col-12 mb-2">
                <div className="card border-0 overflow-hidden">
                    <div className="chart-container-chart">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                                <XAxis type="number" tick={{ fontSize: 12 }} className="chart-x-axis" />
                                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} className="chart-y-axis" />
                                <Tooltip 
                                    contentStyle = {{ 
                                        fontSize: 12, 
                                        backgroundColor: '#fff', 
                                        color: '#444',
                                        border:'none',
                                        borderRadius:'5px',
                                        padding: '8px' 
                                    }} />
                                {/* <CartesianGrid stroke="#ccc" strokeDasharray="1 1" /> */}
                                <Bar dataKey="value" radius={[0, 10, 10, 0]} onClick={(data) => handleClick(data)} className="chart-bar">
                                    <LabelList dataKey="value" position="right" style={{ fontSize: 16, fill: '#fff' }} className="chart-label-list" />
                                    {data.map((entry, index) => {
                                        let fillColor;
                                        switch (entry.name) {
                                            case 'DOC LATE':
                                                fillColor = '#FF6259';
                                                break;
                                            case 'DOC TODAY':
                                                fillColor = '#32ADE6';
                                                break;
                                            case 'DOC H-1':
                                                fillColor = '#00FFA3';
                                                break;
                                            default:
                                                fillColor = '#000'; // Fallback color
                                                break;           
                                        }
                                        return <Cell key={`cell-${index}`} fill={fillColor} />;
                                    })}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
               
            </div>
            <div className="legend">
                <div className="legend-item">
                    <div className="square-icon late"></div> Late
                </div>
                <div className="legend-item">
                    <div className="square-icon today"></div> Today
                </div>
                <div className="legend-item">
                    <div className="square-icon H-1"></div> H-1
                </div>
            </div>
            {/* <div className="col-12 mb-2">
                <div className="card-total-bawah">
                    <div className="text-center">
                        <div className="total-text">
                        <div className="square-icon" style={{ backgroundColor: '#FF6259' }}>Late</div>
                        <div className="square-icon" style={{ backgroundColor: '#32ADE6' }}>Today</div>
                        <div className="square-icon" style={{ backgroundColor: '#00FFA3' }}>H-1</div>
                        </div>
                    </div>
                </div>
            </div> */}
        </React.Fragment>
    );
};

export default ChartArReserve;

