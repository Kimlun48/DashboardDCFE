import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, LabelList, ResponsiveContainer } from "recharts";
import Api from "../../../../api";

function ChartGrpoLastMonth() {
    const [lates, setLates] = useState(0);
    const [ontime, setOntime] = useState(0);
    const [all, setAll] = useState(0);

    const navigate = useNavigate();
    const time = 30 * 60 * 1000; // 30 menit

    const fetchData = async () => {
        try {
            const response = await Api.get('api/v2grpochart');
            const data = response.data.data;
            setLates(data.late);
            setOntime(data.ontime);
            setAll(data.all);
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
        { name: 'Lates last 3 month', value: lates },
        { name: 'On Times last 3 month', value: ontime },
    ];

    const handleClick = (entry) => {
        if (entry.name === 'Lates last 3 month') {
            // navigate('/putawaystoragelate');
            window.open('/inbound/report/grpothreelate', '_blank');
        } else if (entry.name === 'On Times last 3 month') {
            // navigate('/putawaystorageunlate');
            window.open('/inbound/report/grpothreeontime', '_blank');
        }
    };

    const isDataEmpty = lates === 0 && ontime === 0;

    return (
        <React.Fragment>
            {/* <div className="row mt-4">
                <div className="text">
                    <h4 className="chart-title-po">Good Receipt PO Last 3 Month</h4>
                    <div className="total-value">Total: {all}</div>
                </div>
            </div>
            <div className="col-12 mb-2">
                <div className="chart-container">
                    {isDataEmpty ? (
                        <div className="text-center p-5">
                            <h3>No Data</h3>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={240}>
                            <PieChart width={800} height={400}>
                                <defs>
                                    <linearGradient id="colorLate" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#FF4B3D" />
                                        <stop offset="100%" stopColor="#FF4B3D" />
                                    </linearGradient>
                                    <linearGradient id="colorOntime" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#3399FF" />
                                        <stop offset="100%" stopColor="#33CCFF" />
                                    </linearGradient>
                                </defs>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    stroke="none"
                                    innerRadius="40%"
                                    fill="#8884d8"
                                    dataKey="value"
                                    paddingAngle={3}
                                    onClick={(data, index) => handleClick(data)}
                                    className="pointer-cursor"
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.name === 'Lates last 3 month' ? 'url(#colorLate)' : 'url(#colorOntime)'}
                                        />
                                    ))}
                                    <LabelList dataKey="value" position="inside" className="custom-label" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
            <div className="col-12 mb-2">
                <div className="card-total-bawah">
                    <div className="text-center">
                        <div className="total-text">
                            <div className="square-icon" style={{ backgroundColor: '#32ADE6' }}>OnTime</div>
                            <div className="square-icon" style={{ backgroundColor: '#FF4B3D' }}>Late</div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="container-po mt-4">
            <div className="header">
                <h4 className="chart-title-po">Good Receipt PO Last 3 Month</h4>
                
            </div>
            <div className="chart-section">
                {isDataEmpty ? (
                    <div className="no-data">
                        <h3>No Data</h3>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={240}>
                        <PieChart width={800} height={400}>
                            <defs>
                                <linearGradient id="colorLate" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#FF4B3D" />
                                    <stop offset="100%" stopColor="#FF4B3D" />
                                </linearGradient>
                                <linearGradient id="colorOntime" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#3399FF" />
                                    <stop offset="100%" stopColor="#33CCFF" />
                                </linearGradient>
                            </defs>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius="100%"
                                stroke="none"
                                innerRadius="60%"
                                fill="#8884d8"
                                dataKey="value"
                                paddingAngle={3}
                                onClick={(data, index) => handleClick(data)}
                                className="pointer-cursor"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.name === 'Lates last 3 month' ? 'url(#colorLate)' : 'url(#colorOntime)'}
                                    />
                                ))}
                                <LabelList dataKey="value" position="inside" className="custom-label" />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                       
                    </ResponsiveContainer>
                )}
            </div>
            
        </div>
        <div className="legend">
                         <div className="legend-item">
                         <div className="square-icon ontime"></div> OnTime
                         </div>
                        <div className="legend-item">
                         <div className="square-icon late"></div> Late
                        </div>
                     </div>
        </React.Fragment>
    );
}

export default ChartGrpoLastMonth;
