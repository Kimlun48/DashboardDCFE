import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import Api from "../../../../../api";


const ChartWarehouseGrpo = () => {
    const [onhandin, setOnhandin] = useState(0);
    const [onhandout, setOnhandout] = useState(0);
    const [onhandtransit, setOnhandtransit] = useState(0);
    
    const navigate = useNavigate();
    const time = 2 * 60 * 1000; // 2 minutes  

    const fetchData = async () => {
        try {
            const response = await Api.get('api/grpokaliurangheaderstatisticwarehouse');
            const data = response.data;
           
            setOnhandin(data.ONHANDIN || 0);
            setOnhandout(data.ONHANDOUT || 0);
            setOnhandtransit(data.ONHANDTRANSIT || 0);
            // console.log('Data received from API:', data);
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

    // Ensure data is 0 if not provided
    const data = [
        { name: 'Bin IN WH', value: onhandin || 0 },
        { name: 'Bin OUT WH', value: onhandout || 0 },
        { name: 'Bin Transit WH', value: onhandtransit || 0 },
    ];

    const handleClick = (entry) => {
        if (entry.name === 'Bin IN WH') {
            window.open('/kaliurang/bininreportwarehouse', '_blank');
        } else if (entry.name === 'Bin OUT WH') {
            window.open('/kaliurang/binoutreportwarehouse', '_blank');
        } else if (entry.name === 'Bin Transit WH') {
            window.open('/kaliurang/bintransitreportwarehouse', '_blank');
        }
    };

    // Ensure dataMax is at least 1 to avoid rendering issues
    const dataMax = Math.max(1, ...data.map(item => item.value));

    return (
        <React.Fragment>

            <div className="col-12 mb-2">
                <div className="card-title">
                    <div className="text">
                        <h4 className="chart-title">Bin Progress</h4>
                    </div>
                </div>
            </div>
            
            
                   
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart layout="vertical" data={data} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorBinINWH" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#01FEFF" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#01FEFF" stopOpacity={0.5}/>
                                    </linearGradient>
                                    <linearGradient id="colorBinOUTWH" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#CD0099" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#CD0099" stopOpacity={0.5}/>
                                    </linearGradient>
                                    <linearGradient id="colorBinTransitWH" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#FF6608" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#FF6608" stopOpacity={0.5}/>
                                    </linearGradient>
                                </defs>

                                <XAxis
                                    type="number"
                                    tick={{ fontSize: 10 }}
                                    className="chart-x-axis"
                                    domain={[0, dataMax + 465]} 
                                    textAnchor="end"
                                />

                                <YAxis 
                                    dataKey="name" 
                                    type="category" 
                                    tick={{ fontSize: 9 }} 
                                    className="chart-y-axis"
                                    textAnchor="end"
                                />
                                
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

                                <Bar dataKey="value" radius={[0, 10, 10, 0]} onClick={handleClick} className="chart-bar" barSize={50}>
                                    <LabelList dataKey="value" position="right" style={{ fontSize: 10, fill: '#fff' }} className="chart-label-list" />
                                    {data.map((entry, index) => {
                                        let fillColor;
                                        switch (entry.name) {
                                            case 'Bin IN WH':
                                                fillColor = 'url(#colorBinINWH)';
                                                break;
                                            case 'Bin OUT WH': 
                                                fillColor = 'url(#colorBinOUTWH)';
                                                break;
                                            case 'Bin Transit WH':
                                                fillColor = 'url(#colorBinTransitWH)';
                                                break;
                                            default:
                                                fillColor = '#8884d8'; // Default color if needed
                                        }
                                        return <Cell key={`cell-${index}`} fill={fillColor} />;
                                    })}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    
                

            <div className="legend-store">
                <div className="legend-item-store">
                    <div 
                        className="square-icon" 
                        style={{ backgroundColor: '#01FEFF', cursor: 'pointer' }} 
                        onClick={() => window.open('/kaliurang/bininreportwarehouse', '_blank')}
                    >
                    </div> 
                    IN WareHouse
                </div>

                <div className="legend-item">
                    <div 
                        className="square-icon" 
                        style={{ backgroundColor: '#CD0099', cursor: 'pointer' }} 
                        onClick={() => window.open('/kaliurang/binoutreportwarehouse', '_blank')}
                    >
                    </div> 
                    OUT WareHouse
                </div>

                <div className="legend-item">
                    <div 
                        className="square-icon" 
                        style={{ backgroundColor: '#FF6608', cursor: 'pointer' }} 
                        onClick={() => window.open('/kaliurang/bintransitreportwarehouse', '_blank')}
                    >
                    </div> 
                    Transit WareHouse
                </div>
            </div>

        </React.Fragment>
    );
};

export default ChartWarehouseGrpo;
