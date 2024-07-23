// import React from "react"
// import Sidebar from "../../../components/dcv1.2/sidebar"
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
// } from "react-router-dom";
// // import LoadingData from "../../../components/utilites/loading";

// function HomeDc(){
//     return(
//         <React.Fragment>
//         <Sidebar />
//         <div className="tes">
// <h1>home</h1>
// <LoadingData />
// </div>
// </React.Fragment>
//     )
// }
// export default HomeDc

import React from 'react';
import SidebarDc from '../../../components/dcv1.2/layouts/sidebar';

const HomeDc= () => {
  return (
    <React.Fragment>
      <SidebarDc/>
      </React.Fragment>
  );
 
};

export default HomeDc;

