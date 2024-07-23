import React, {useState, useEffect, useRef} from "react";

import Api from "../../api";
import LayoutAdmin from "../../layouts/Admin";
import ChartPie from "../../components/chartpie";
import PlaySound from "../../components/utilites/sound";
import { Link } from "react-router-dom";
import Home from "./Home";

function Dashboard() {
    document.title = "Home";

   
      
          

    return(
        <React.Fragment>
        
                <div className="home">
            <Home />
            </div>
                
          
        </React.Fragment>
    )
}

export default Dashboard