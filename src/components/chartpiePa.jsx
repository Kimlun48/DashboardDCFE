
import React, { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, LabelList, ResponsiveContainer } from 'recharts';
import Api from "../api";

const DEFAULT_COLOR = '#00C49F'; // Default color green
const COLORS = ['#FF4B3D', '#3399FF']; // Red for late, Blue for on time

function ChartPA() {
    const [lates, setLates] = useState(0);
    const [unlates, setUnLates] = useState(0);
    const audioRef = useRef(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await Api.get('api/chartpa');
            const data = response.data.data;
            setLates(data.late);
            setUnLates(data.unlate);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const data = [
        { name: 'Lates', value: lates },
        { name: 'On Times', value: unlates },
    ];

    const handleClick = (entry) => {
        if (entry.name === 'Lates') {
            navigate('/palate');
        } else if (entry.name === 'On Times') {
            navigate('/paunlate');
        }
    };

    const renderCustomizedLabel = ({ name, value }) => {
        const route = name === 'Lates' ? '/palate' : '/paunlate';
        // return (
        //     <foreignObject x={0} y={0} width="100" height="30" style={{ overflow: 'visible' }}>
        //         <Link to={route} style={{ textDecoration: 'none', color: 'inherit' }}>
        //             {name}: {value}
        //         </Link>
        //     </foreignObject>
        // );
    };
    const isDataEmpty = lates === 0 && unlates === 0;

    return (
        <React.Fragment>
            
                
                    <h4 className="text-center">RECEIPT INBOUND</h4> 
                    <div className="row mt-4">
                        <div className="col-12 col-lg-6 mb-4">
                            <div className="card border-0  overflow-hidden">
                                <div className="card-body p-0 d-flex align-items-center">
                                    <Link to="/palate" className="d-flex align-items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className="bg-danger py-4 px-4 mfe-3" style={{ width: "20px" }}>
                                            <i className="fas fa fa-exclamation-triangle text-white"></i>
                                        </div>
                                        <div>
                                            <div className="text-value text-danger">{lates}</div>
                                            <div className="text-muted text-uppercase font-weight-bold small text-danger">
                                                LATES
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 mb-4">
                            <div className="card border-0 overflow-hidden ">
                                <div className="card-body p-0 d-flex align-items-center">
                                    <Link to="/paunlate" className="d-flex align-items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className="bg-primary py-4 px-4 mfe-3" style={{ width: "20px" }}>
                                            <i className="fas fa fa-check-square text-white"></i>
                                        </div>
                                        <div>
                                            <div className="text-value text-success">{unlates}</div>
                                            <div className="text-muted text-uppercase font-weight-bold small">
                                                ON TIMES
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mb-2">
                    <div className="card border-0 overflow-hidden ">
                    <div className="chart-container">
                    {isDataEmpty ? (
                            <div className="text-center p-5">
                                <h3>No Data</h3>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        labelLine={false}
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius="20%"
                                        outerRadius="80%"
                                        fill="#8884d8"
                                        dataKey="value"
                                        onClick={(data, index) => handleClick(data)}
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.value === 0 ? DEFAULT_COLOR : COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                    </div>
                    </div>
                    <audio ref={audioRef} src="/sounds/notification.mp3" />
               
          
        </React.Fragment>
    );
}

export default ChartPA;




