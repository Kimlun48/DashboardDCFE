import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import Api from "../../../../api";


const ChartStoreGrpo = () => {
    const [onhandin, setOnhandin] = useState(0);
    const [onhandout, setOnhandout] = useState(0);
    const [onhandtransit, setOnhandtransit] = useState(0);
    
    const navigate = useNavigate();
    const time = 2 * 60 * 1000; // 2 minutes

    const fetchData = async () => {
        try {
            const response = await Api.get('api/grpokaliurangheaderstatisticstore');
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
        { name: 'Bin IN Store', value: onhandin },
        { name: 'Bin OUT Store', value: onhandout },
        { name: 'Bin Transit Store', value: onhandtransit },
    ];

    

    const handleClick = (entry) => {
        if (entry.name === 'Bin IN Store') {
            window.open('/kaliurang/bininreportstore', '_blank');
        } else if (entry.name === 'Bin OUT Store') {
            window.open('/kaliurang/binoutreportstore', '_blank');
        } else if (entry.name === 'Bin Transit Store') {
            window.open('/kaliurang/bintransitreportstore', '_blank');
        }
    };

      
      const dataMax = Math.max(...data.map(item => item.value));


    return (
        <React.Fragment>

            <div className="col-12 mb-2">
            <div className="card-title">
                    <div className="text">
                        <h4 className="chart-title">Bin Progress</h4>
                    </div>
                </div>
            </div>
            <div className="col-12 mb-2">
                <div className="card border-0 overflow-hidden">
                    <div className="chart-container-chart">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                            <defs>
                                    <linearGradient id="colorBinINStore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#32ADE6" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#32ADE6" stopOpacity={0.5}/>
                                    </linearGradient>
                                    <linearGradient id="colorBinOUTStore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#0857bf" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#0857bf" stopOpacity={0.5}/>
                                    </linearGradient>
                                    <linearGradient id="colorBinTransitStore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#4F1787" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#4F1787" stopOpacity={0.5}/>
                                    </linearGradient>
                                </defs>

                             

                                <XAxis
                                    type="number"
                                    tick={{ fontSize: 12}}
                                    className="chart-x-axis"
                                    // domain={[0, dataMax / 2]} 
                                    domain={[0, 'dataMax + 465']} 
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
                                            case 'Bin IN Store':
                                                fillColor = 'url(#colorBinINStore)';
                                                break;
                                            case 'Bin OUT Store': 
                                                fillColor = 'url(#colorBinOUTStore)';
                                                break;
                                            case 'Bin Transit Store':
                                                fillColor = 'url(#colorBinTransitStore)';
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
            onClick={() => window.open('/kaliurang/bininreportstore', '_blank')}
            >
            </div> 
             Bin IN Store
            </div>

            <div className="legend-item">
             <div 
            className="square-icon" 
            style={{ backgroundColor: '#0857bf', cursor: 'pointer' }} 
            onClick={() => window.open('/kaliurang/binoutreportstore', '_blank')}
            >
            </div> 
             Bin OUT Store
            </div>

            <div className="legend-item">
             <div 
            className="square-icon" 
            style={{ backgroundColor: '#4F1787', cursor: 'pointer' }} 
            onClick={() => window.open('/kaliurang/bintransitreportstore', '_blank')}
            >
            </div> 
             Bin Transit Store
            </div>

            
            </div>

        </React.Fragment>
    );
};

export default ChartStoreGrpo;