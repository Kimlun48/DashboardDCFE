import React, {useState, useEffect} from "react";
import { Card } from "react-bootstrap";


import Api from "../api";

function Chart() {
     
    const [lates, setLates ] = useState(0);
    const [unlates, setUnLates] = useState(0);

    const fetchData = async() => {
        const response = await Api.get('api/chart',)

        const data = await response.data.data;
        setLates(data.late);
        setUnLates(data.unlate)
    };
    useEffect (() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
            // console.log("ok chart");
          }, 30000);
      
          return () => clearInterval(interval);
    }, []);

    return (
        <React.Fragment>
            <Card style={{ width: '40rem', margin: '0 auto', padding: '10px', fontSize:'15px',textAlign:'center', }}>
      <Card.Body>
                <div className="row mt-4">
                    <div className="col-12 col-lg-3 mb-4">
                    <div className="card border-0 shadow-sm overflow-hidden">
                        <div className="card-body p-0 d-flex align-items-center">
                            <div className="bg-danger py-4 px-5 mfe-3" style={{ width: "130px" }}>
                                <i className="fas fa-folder fa-2x text-white"></i>
                            </div>
                            <div>
                                <div className="text-value text-danger">{lates}</div>
                                <div className="text-muted text-uppercase font-weight-bold small text-danger">
                                    LATES
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-12 col-lg-3 mb-4">
                    <div className="card border-0 rounded shadow-sm overflow-hidden">
                        <div className="card-body p-0 d-flex align-items-center">
                            <div className="bg-primary py-4 px-5 mfe-3" style={{ width: "130px" }}>
                                <i className="fas fa-map-marked-alt fa-2x text-white"></i>
                            </div>
                            <div>
                                <div className="text-value text-success">{unlates}</div>
                                <div className="text-muted text-uppercase font-weight-bold small">
                                    ON TIMES
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                   
                    
                </div>
                </Card.Body>
                </Card>
                
        </React.Fragment>
    )
   

}
  
export default Chart