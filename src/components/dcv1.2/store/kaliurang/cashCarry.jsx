import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import Api from "../../../../api";

const ChartStoreCashCarry = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await Api.get("/api/kaliurangcashcarrystorestatistic");
            if (response.status === 200) {
                // Transformasi data
                const transformedData = response.data.data.map(item => {
                    let name;
                    switch (item.TYPE) {
                        case 'ORDER_RECEIVED':
                            name = 'Order Received';
                            break;
                        case 'BEING_PROCESSED':
                            name = 'Being Process';
                            break;
                        case 'READY_TO_PICK_UP':
                            name = 'Ready To PickUp';
                            break;
                        default:
                            name = 'Unknown';
                    }
                    return { name, value: parseInt(item.ORDER_RECEIVED, 10) };
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

    const handleClick = (entry) => {
        if (entry.name === 'Order Received') {
            window.open('/kaliurang/cashcarryorderreceiveddetail', '_blank');
        } else if (entry.name === 'Being Process') {
            window.open('/kaliurang/cashcarrybeingprocessdetail', '_blank');
        } else if (entry.name === 'Ready To PickUp') {
            window.open('/kaliurang/cashcarryreadypickupdetail', '_blank');
        } 
    };

    return (
        <React.Fragment>
            <div className="col-12 mb-2">
            <div className="card-title">
                    <div className="text">
                        <h4 className="chart-title">Cash & Carry PND</h4>
                    </div>
                </div>
            </div>
            
                        <ResponsiveContainer width="100%" onClick={handleClick} className="chart-bar" height={250}>
                            <BarChart layout="vertical" data={data} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorORDER_RECEIVED" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#01FEFF" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#01FEFF" stopOpacity={0.5}/>
                                    </linearGradient>
                                    <linearGradient id="colorBEING_PROCESSED" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#CD0099" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#CD0099" stopOpacity={0.5}/>
                                    </linearGradient>
                                    <linearGradient id="colorREADY_TO_PICK_UP" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#FF6608" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#FF6608" stopOpacity={0.5}/>
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    type="number"
                                    tick={{ fontSize: 10 }}
                                    domain={[0, 'dataMax + 10']}
                                    className="chart-x-axis"
                                />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tick={{ fontSize: 10 }}
                                    className="chart-y-axis"
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
                                    <LabelList dataKey="value" position="right" style={{ fontSize: 10, fill: '#fff' }} />
                                    {data.map((entry, index) => {
                                        let fillColor;
                                        switch (entry.name) {
                                            case 'Order Received':
                                                fillColor = 'url(#colorORDER_RECEIVED)';
                                                break;
                                            case 'Being Process':
                                                fillColor = 'url(#colorBEING_PROCESSED)';
                                                break;
                                            case 'Ready To PickUp':
                                                fillColor = 'url(#colorREADY_TO_PICK_UP)';
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
            onClick={() => window.open('/kaliurang/cashcarryorderreceiveddetail', '_blank')}
            >
            </div> 
            Order Received
            </div>

            <div className="legend-item">
             <div 
            className="square-icon" 
            style={{ backgroundColor: '#CD0099', cursor: 'pointer' }} 
            onClick={() => window.open('/kaliurang/cashcarrybeingprocessdetail', '_blank')}
            >
            </div> 
            Being Process
            </div>

            <div className="legend-item">
             <div 
            className="square-icon" 
            style={{ backgroundColor: '#FF6608', cursor: 'pointer' }} 
            onClick={() => window.open('/kaliurang/cashcarryreadypickupdetail', '_blank')}
            >
            </div> 
            Ready To PickUp
            </div>
            </div>
        </React.Fragment>
    );
};

export default ChartStoreCashCarry;
