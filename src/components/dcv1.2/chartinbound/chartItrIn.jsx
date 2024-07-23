import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, CartesianGrid } from 'recharts';
import Api from "../../../api";

const ChartInboundItrIn = () => {
    const [totalqtylate, setTotalQtyLate] = useState(0);
    const [totalqtyontime, setTotalQtyOntime] = useState(0);
    const [totaldoclate, setTotalDocLate] = useState(0);
    const [totaldocontime, setTotalDocOntime] = useState(0);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const time = 2 * 60 * 1000; // 2 minutes

    const fetchData = async () => {
        try {
            const response = await Api.get('api/v2statisticitrin');
            const data = response.data.data;
            setTotalQtyLate(data.total_QTY_late);
            setTotalQtyOntime(data.total_QTY_ontime);
            setTotalDocLate(data.Total_Doc_late);
            setTotalDocOntime(data.Total_Doc_Ontime);
            setTotal(data.total);
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
        { name: 'QTY LATE', value: totalqtylate },
        { name: 'QTY ON TIME', value: totalqtyontime },
        { name: 'DOC LATE', value: totaldoclate },
        { name: 'DOC ON TIME', value: totaldocontime },
    ];

    const handleClick = (entry) => {
        if (entry.name === 'QTY LATE' || entry.name === 'DOC LATE') {
            navigate('/late-details'); // Adjust navigation path
        } else if (entry.name === 'QTY ON TIME' || entry.name === 'DOC ON TIME') {
            navigate('/ontime-details'); // Adjust navigation path
        }
    };

    return (
        <React.Fragment>
            <div className="col-12 mb-2">
                <div className="card-total">
                    <div className="text">
                        <h4 className="chart-title">Inventory Transfer Request IN</h4>
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
                                                case 'DOC LATE':
                                                    fillColor = '#FF6259';
                                                    break;
                                                case 'DOC ON TIME':
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

export default ChartInboundItrIn;
