

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, CartesianGrid } from 'recharts';
import Api from "../../../api";
import TableGrpo from "../inbound/grpo/tablegrpo";
import ChartGrpoLastMonth from "../inbound/grpo/chartgrpo";

const ChartInboundPo = () => {
    const [totalqtylate, setTotalQtyLate] = useState(0);
    const [totalqtyontime, setTotalQtyOntime] = useState(0);
    const [totaldoclate, setTotalDocLate] = useState(0);
    const [totaldocontime, setTotalDocOntime] = useState(0);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const time = 2 * 60 * 1000; // 2 minutes

    const fetchData = async () => {
        try {
            const response = await Api.get('api/v2statisticpo');
            const data = response.data.data;
            setTotalQtyLate(data.TOTAL_QTY_LATE);
            setTotalQtyOntime(data.TOTAL_QTY_ONTIME);
            setTotalDocLate(data.TOTAL_DOC_LATE);
            setTotalDocOntime(data.TOTAL_DOC_ONTIME);
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
        { name: 'DOC LATE', value: totaldoclate },
        { name: 'DOC ON TIME', value: totaldocontime },
    ];

    const handleClick = (entry) => {
        if (entry.name === 'QTY LATE' || entry.name === 'DOC LATE') {
            navigate('#');
        } else if (entry.name === 'QTY ON TIME' || entry.name === 'DOC ON TIME') {
            navigate('#');
        }
    };

    const isDataEmpty = totalqtylate === 0 && totalqtyontime === 0 && totaldoclate === 0 && totaldocontime === 0;

    return (
        <React.Fragment>
    <div className="col-12 mb-2">
                <div className="card-total">
                    <div className="text">
                        <h4 className="chart-title">Goods Receipt PO</h4>
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
            <div className="legend">
                <div className="legend-item">
                    <div className="square-icon ontime"></div> OnTime
                </div>
                <div className="legend-item">
                    <div className="square-icon late"></div> Late
                </div>
            </div>
           
            
               
            
             {/* <div className="col-12 mb-2">
                            
                                <div className="card-header">
                                <div className="row mt-4">
                                <div className="title-dash">
                                 <h4 className="chart-title-dash">Goods Receipt PO</h4>
                                
                                </div>
                                        <div className="col-md-6">
                                            <TableGrpo />
                                        </div>
                                        <div className="col-md-6">
                                            <ChartGrpoLastMonth />
                                        </div>
                                       
                                    </div>
                                    </div>
                               
                            
            </div> */}
        </React.Fragment>
    );
};

export default ChartInboundPo;

