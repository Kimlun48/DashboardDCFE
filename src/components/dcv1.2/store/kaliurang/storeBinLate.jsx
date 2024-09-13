import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import Api from "../../../../api";

const ChartStoreGrpoLate = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await Api.get("/api/grpokaliurangheaderstatisticstorebinlate");
            if (response.status === 200) {
                // Transformasi data
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
                setData(transformedData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 2 * 60 * 1000); // Refresh every 2 minutes
        return () => clearInterval(interval);
    }, []);

    return (
        <React.Fragment>
            <div className="col-12 mb-2">
                <div className="card border-0 overflow-hidden">
                    <div className="chart-container-chart">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorBinINStoreLate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#32ADE6" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#32ADE6" stopOpacity={0.5}/>
                                    </linearGradient>
                                    <linearGradient id="colorBinOUTStoreLate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#0857bf" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#0857bf" stopOpacity={0.5}/>
                                    </linearGradient>
                                    <linearGradient id="colorBinTransitStoreLate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#4F1787" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#4F1787" stopOpacity={0.5}/>
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    type="number"
                                    tick={{ fontSize: 12 }}
                                    domain={[0, 'dataMax + 10']}
                                    className="chart-x-axis"
                                />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tick={{ fontSize: 12 }}
                                    className="chart-y-axis"
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
                                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={100}>
                                    <LabelList dataKey="value" position="right" style={{ fontSize: 16, fill: '#fff' }} />
                                    {data.map((entry, index) => {
                                        let fillColor;
                                        switch (entry.name) {
                                            case 'Bin IN Store':
                                                fillColor = 'url(#colorBinINStoreLate)';
                                                break;
                                            case 'Bin OUT Store':
                                                fillColor = 'url(#colorBinOUTStoreLate)';
                                                break;
                                            case 'Bin Transit Store':
                                                fillColor = 'url(#colorBinTransitStoreLate)';
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
             Bin IN Store Late
            </div>

            <div className="legend-item">
             <div 
            className="square-icon" 
            style={{ backgroundColor: '#0857bf', cursor: 'pointer' }} 
            onClick={() => window.open('/kaliurang/binoutreportstore', '_blank')}
            >
            </div> 
             Bin OUT Store Late
            </div>

            <div className="legend-item">
             <div 
            className="square-icon" 
            style={{ backgroundColor: '#4F1787', cursor: 'pointer' }} 
            onClick={() => window.open('/kaliurang/bintransitreportstore', '_blank')}
            >
            </div> 
             Bin Transit Store Late
            </div>
            </div>
        </React.Fragment>
    );
};

export default ChartStoreGrpoLate;
