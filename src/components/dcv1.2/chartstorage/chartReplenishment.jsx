import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, CartesianGrid } from 'recharts';
import Api from "../../../api";


const ChartReplenishment = () => {
    const [totalqtylate, setTotalQtyLate] = useState(0);
    const [totalqtyontime, setTotalQtyOntime] = useState(0);
    const [totalitemlate, setTotalItemLate] = useState(0);
    const [totalitemontime, setTotalItemOntime] = useState(0);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const time = 2 * 60 * 1000; // 2 minutes

    const fetchData = async () => {
        try {
            const response = await Api.get('api/v2statisticreplenishment');
            const data = response.data.data;
            setTotalQtyLate(data.TOTAL_QTY_LATE);
            setTotalQtyOntime(data.TOTAL_QTY_ONTIME);
            setTotalItemLate(data.TOTAL_ITEM_LATE);
            setTotalItemOntime(data.TOTAL_ITEM_ONTIME);
            setTotal(data.TOTAL);
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
        { name: 'QTY LATE', value: totalqtylate },
        { name: 'QTY ON TIME', value: totalqtyontime },
        { name: 'ITEM LATE', value: totalitemlate },
        { name: 'ITEM ON TIME', value: totalitemontime },
    ];

    const handleClick = (entry) => {
        if (entry.name === 'QTY LATE' || entry.name === 'ITEM LATE') {
            navigate('#');
        } else if (entry.name === 'QTY ON TIME' || entry.name === 'ITEM ON TIME') {
            navigate('#');
        }
    };

    const isDataEmpty = totalqtylate === 0 && totalqtyontime === 0 && totalitemlate === 0 && totalitemontime === 0;

    return (
        <React.Fragment>
            
    {/* <div className="col-12 mb-2">
        <div className="card-total">
        <div className="text">
        <h4 className="chart-title">Replenishment</h4>
        {total}
        </div>
    </div>
</div>

<div className="col-12 mb-2">
    <div className="card border-0 overflow-hidden">
        <div className="chart-container-chart">
            
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorLate" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="50%" stopColor="#fe6600" />
                                <stop offset="100%" stopColor="#ff9900" />
                            </linearGradient>
                            <linearGradient id="colorOntime" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="50%" stopColor="#044f9f" />
                                <stop offset="100%" stopColor="#0066ff" />
                            </linearGradient>
                            
                        </defs>
                        <XAxis type="number" tick={{ fontSize: 12 }} className="chart-x-axis" />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} className="chart-y-axis" />
                        <Tooltip 
                           contentStyle = {{ 
                            fontSize: 12, 
                            backgroundColor: '#fff', 
                            color: '#444',
                            border:'none',
                            borderRadius:'5px',
                            padding: '8px' }} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="1 1" /> 
                        <Bar dataKey="value" radius={[0, 10, 10, 0]} onClick={(data) => handleClick(data)} className="chart-bar">
                            <LabelList dataKey="value" position="right" style={{ fontSize: 16, fill: '#fff' }} className="chart-label-list" />
                            {data.map((entry, index) => {
                                let fillId;
                                switch (entry.name) {
                                    case 'QTY LATE':
                                        fillId = 'colorLate';
                                        break;
                                    case 'QTY ON TIME':
                                        fillId = 'colorOntime';
                                        break;
                                    case 'ITEM LATE':
                                        fillId = 'colorLate';
                                        break;
                                    case 'ITEM ON TIME':
                                        fillId = 'colorOntime';
                                        break;
                                   
                                }
                                return <Cell key={`cell-${index}`} fill={`url(#${fillId})`} />;
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
        
        </div>
    </div>
</div>

<div className="col-12 mb-2">
    <div className="card-total-bawah">
        <div className="text-center">
            <div className="total-text">
                <div className="square-icon blue">Ontime</div>
                <div className="square-icon orange">Late</div>
            </div>
        </div>
    </div>
</div> */}

<div className="col-12 mb-2">
                <div className="card-total">
                    <div className="text">
                        <h4 className="chart-title">Replenishment</h4>
                        {total}
                    </div>
                </div>
            </div>
            <div className="col-12 mb-2">
                <div className="card border-0 overflow-hidden">
                    <div className="chart-container-chart">
                        <ResponsiveContainer width="100%" height={300}>
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
                                           
                                                
                                                case 'QTY LATE':
                                                    fillColor = '#FF6259';
                                                    break;
                                                case 'QTY ON TIME':
                                                    fillColor = '#32ADE6';
                                                    break;
                                                case 'ITEM LATE':
                                                    fillColor = '#FF6259';
                                                    break;
                                                case 'ITEM ON TIME':
                                                    fillColor = '#32ADE6';
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
            <div className="col-12 mb-2">
                <div className="card-total-bawah">
                    <div className="text-center">
                        <div className="total-text">
                           
                            <div className="square-icon" style={{ backgroundColor: '#FF6259' }}>Late</div>
                            <div className="square-icon" style={{ backgroundColor: '#32ADE6' }}>OnTime</div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
};

export default ChartReplenishment;
