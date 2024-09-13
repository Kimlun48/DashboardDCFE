// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
// import Api from "../../../../api";

// const ChartKaliurangGrpo = () => {
//     const [onhandin, setOnhandin] = useState(0);
//     const [onhandtransit, setOnhandtransit] = useState(0);
//     const navigate = useNavigate();
//     const time = 2 * 60 * 1000; // 2 minutes

//     const fetchData = async () => {
//         try {
//             const response = await Api.get('api/grpokaliurangheaderstatistic');
//             const data = response.data;
//             setOnhandin(data.ONHANDIN || 0);
//             setOnhandtransit(data.ONHANDTRANSIT || 0);
//             console.log('Data received from API:', data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
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
//         { name: 'Bin IN', value: onhandin },
//         { name: 'Bin Transit', value: onhandtransit },
//     ];

    

//     const handleClick = (entry) => {
//         if (entry.name === 'Bin IN') {
//             // navigate('/putawaystoragelate');
//             window.open('/kaliurang/bininreport', '_blank');
//         } else if (entry.name === 'Bin Transit') {
//             // navigate('/putawaystorageunlate');
//             window.open('/kaliurang/bintransitreport', '_blank');
//         }
//     };


//     return (
//         <React.Fragment>
//             <div className="col-12 mb-2">
//                 {/* Card total and other elements can be added here */}
//             </div>
//             <div className="col-12 mb-2">
//                 <div className="card border-0 overflow-hidden">
//                     <div className="chart-container-chart">
//                         <ResponsiveContainer width="100%" height={300}>
//                             <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
//                                 <XAxis 
//                                 type="number" 
//                                 tick={{ fontSize: 12 }} 
//                                 className="chart-x-axis" 
//                                 domain={[0, 'dataMax + 1500']} 
//                                 textAnchor="end"
//                                // angle={-45}
//                                 />
//                                 <YAxis 
//                                 dataKey="name" 
//                                 type="category" 
//                                 tick={{ fontSize: 12 }} 
//                                 className="chart-y-axis"
//                                 textAnchor="end"
//                                // angle={-45} 
//                                 />
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
//                                 <Bar dataKey="value" radius={[0, 10, 10, 0]} onClick={handleClick} className="chart-bar" barSize={100}>
//                                     <LabelList dataKey="value" position="right" style={{ fontSize: 16, fill: '#fff' }} className="chart-label-list" />
//                                     {data.map((entry, index) => {
//                                         let fillColor;
//                                         switch (entry.name) {
//                                             case 'Bin IN':
//                                                 fillColor = '#FF6259';
//                                                 break;
//                                             case 'Bin Transit':
//                                                 fillColor = '#32ADE6';
//                                                 break;
//                                             default:
//                                                 fillColor = '#8884d8'; // Default color if needed
//                                         }
//                                         return <Cell key={`cell-${index}`} fill={fillColor} />;
//                                     })}
//                                 </Bar>
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>
//             </div>
//             <div className="legend">
//                 <div className="legend-item">
//                     <div className="square-icon" style={{ backgroundColor: '#FF6259' }}></div> Bin IN
//                 </div>
//                 <div className="legend-item">
//                     <div className="square-icon" style={{ backgroundColor: '#32ADE6' }}></div> Bin Transit
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// };

// export default ChartKaliurangGrpo;

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import Api from "../../../../api";

const ChartKaliurangGrpo = () => {
    const [onhandin, setOnhandin] = useState(0);
    const [onhandout, setOnhandout] = useState(0);
    const [onhandtransit, setOnhandtransit] = useState(0);
    
    const navigate = useNavigate();
    const time = 2 * 60 * 1000; // 2 minutes

    const fetchData = async () => {
        try {
            const response = await Api.get('api/grpokaliurangheaderstatistic');
            const data = response.data;
           
            // setOnhandin(120);
            // setOnhandout(120);
            // setOnhandtransit(120);
            setOnhandin(data.ONHANDIN || 0);
            setOnhandout(data.ONHANDOUT || 0);
            setOnhandtransit(data.ONHANDTRANSIT || 0);
            console.log('Data received from API:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
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
        { name: 'Bin IN WHS', value: onhandin },
        { name: 'Bin OUT WHS', value: onhandout },
        { name: 'Bin Transit WHS', value: onhandtransit },
    ];

    // const datax = [
    //     { name: 'Bin IN WHS', value: onhandin },
    //     { name: 'Bin OUT WHS', value: onhandout },
    //     { name: 'Bin Transit WHS', value: onhandtransit },
    // ];

    const dataMax = Math.max(...data.map(item => item.value));

    const handleClick = (entry) => {
        if (entry.name === 'Bin IN WHS') {
            // navigate('/putawaystoragelate');
            window.open('/kaliurang/bininreport', '_blank');
        } else if (entry.name === 'Bin OUT WHS') {
            // navigate('/putawaystorageunlate');
            window.open('/kaliurang/binoutreport', '_blank');
        } else if (entry.name === 'Bin Transit WHS') {
            // navigate('/putawaystorageunlate');
            window.open('/kaliurang/bintransitreport', '_blank');
        }
    };


    return (
        <React.Fragment>
            <div className="col-12 mb-2">
                {/* Card total and other elements can be added here */}
            </div>
            <div className="col-12 mb-2">
                <div className="card border-0 overflow-hidden">
                    <div className="chart-container-chart">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                            <defs>
                                    <linearGradient id="colorBinINWHS" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#32ADE6" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#32ADE6" stopOpacity={0.5}/>
                                    </linearGradient>
                                    <linearGradient id="colorBinOUTWHS" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#0857bf" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#0857bf" stopOpacity={0.5}/>
                                    </linearGradient>
                                    <linearGradient id="colorBinTransitWHS" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#4F1787" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#4F1787" stopOpacity={0.5}/>
                                    </linearGradient>
                                </defs>
                                {/* <XAxis 
                                type="number" 
                                tick={{ fontSize: 12 }} 
                                className="chart-x-axis" 
                                domain={[0, 'dataMax + 2000']} 
                                //domain={[0, 'dataMax + 500']} 
                                textAnchor="end"
                               // angle={-45}
                                /> */}
                                 <XAxis
                                    type="number"
                                    tick={{ fontSize: 12}}
                                    className="chart-x-axis"
                                    // domain={[0, dataMax / 2]} 
                                   domain={[0, 'dataMax + 480']} 
                                    textAnchor="end"
                                    />

                                <YAxis 
                                dataKey="name" 
                                type="category" 
                                tick={{ fontSize: 12 }} 
                                className="chart-y-axis"
                                textAnchor="end"
                               // angle={-45} 
                                />
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
                                <Bar dataKey="value" radius={[0, 10, 10, 0]} onClick={handleClick} className="chart-bar" barSize={100}>
                                    <LabelList dataKey="value" position="right" style={{ fontSize: 16, fill: '#fff' }} className="chart-label-list" />
                                    {data.map((entry, index) => {
                                        let fillColor;
                                        switch (entry.name) {
                                            case 'Bin IN WHS':
                                                fillColor = 'url(#colorBinINWHS)';
                                                break;
                                            case 'Bin OUT WHS': 
                                                fillColor = 'url(#colorBinOUTWHS)';
                                                break;
                                            case 'Bin Transit WHS':
                                                fillColor = 'url(#colorBinTransitWHS)';
                                                break;
                                            default:
                                                fillColor = '#8884d8'; // Default color if needed
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
             <div 
            className="square-icon" 
            style={{ backgroundColor: '#32ADE6', cursor: 'pointer' }} 
            onClick={() => window.open('/kaliurang/bininreport', '_blank')}
            >
            </div> 
             Bin IN WHS
            </div>

            <div className="legend-item">
             <div 
            className="square-icon" 
            style={{ backgroundColor: '#0857bf', cursor: 'pointer' }} 
            onClick={() => window.open('/kaliurang/binoutreport', '_blank')}
            >
            </div> 
             Bin OUT WHS
            </div>

            <div className="legend-item">
             <div 
            className="square-icon" 
            style={{ backgroundColor: '#4F1787', cursor: 'pointer' }} 
            onClick={() => window.open('/kaliurang/bintransitreport', '_blank')}
            >
            </div> 
             Bin Transit WHS
            </div>

            
            </div>

        </React.Fragment>
    );
};

export default ChartKaliurangGrpo;
