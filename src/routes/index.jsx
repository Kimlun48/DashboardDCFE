
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import PrivateRoutes from './PrivateRoutes.jsx';

import Dashboard from "../pages/dashboard/Index.jsx";
import DashboardStoreIndex from '../pages/dashboardstore/index.jsx';


//DCv1.2
import HomeDc from '../pages/DCv1.2/Home/HomeDc.jsx';
import ChartInbound from '../pages/DCv1.2/Inbound/Chart.jsx';
import ReportInbound from '../pages/DCv1.2/Inbound/Report.jsx';
import ChartStorage from '../pages/DCv1.2/Storage/Chart.jsx';
import ChartOutbound from '../pages/DCv1.2/Outbound/Chart.jsx';


import DashboardAdmin from '../pages/DCv1.2/Admin/Dashboard/DashboardAdmin.jsx';
//inbound
import GrpoReport from '../pages/DCv1.2/Admin/Reports/inbound/GrpoReport.jsx';
import ItrinReport from '../pages/DCv1.2/Admin/Reports/inbound/ItrinReport.jsx';
import ReturnReport from '../pages/DCv1.2/Admin/Reports/inbound/ReturnReport.jsx';
import CrossdockReport from '../pages/DCv1.2/Admin/Reports/inbound/Crossdock.jsx';
import ListPickingReport from '../pages/DCv1.2/Admin/Reports/storage/ListPickingReport.jsx';
import GrpothreelateReport from '../pages/DCv1.2/Admin/Reports/inbound/GrpothreelateReport.jsx';
import GrpothreeontimeReport from '../pages/DCv1.2/Admin/Reports/inbound/GrpothreeontimeReport.jsx';

//storage
import CashPickingReport from '../pages/DCv1.2/Admin/Reports/storage/CashPickingReport.jsx';
import DeliveryPickingReport from '../pages/DCv1.2/Admin/Reports/storage/DeliveryPickingReport.jsx';
import PutAwayReport from '../pages/DCv1.2/Admin/Reports/storage/PutawayReport.jsx';
import ReplenishmentReport from '../pages/DCv1.2/Admin/Reports/storage/ReplenishmentReport.jsx';
//outbound
import ArReserveInReport from '../pages/DCv1.2/Admin/Reports/outbound/ArReserveInvoiceReport.jsx';
import InventoryOutReport from '../pages/DCv1.2/Admin/Reports/outbound/InventoryTroReport.jsx';
import SalesOrderReport from '../pages/DCv1.2/Admin/Reports/outbound/SalesOrderReport.jsx';

//admin
import Login from '../pages/DCv1.2/Admin/Auth/Login.jsx';


function RoutesIndex() {
    return (
        <Routes>

             {/* route "/admin/login" */}
             <Route path="/admin/login" element={<Login />} />

      
             {/* route "/" */}
             <Route path="/HomeDc" element={<HomeDc />} />

             {/* route "/inbound/chart" */}
             <Route path="/inbound/chart" element={<ChartInbound />}/>

             {/* route "/inbound/report" */}
             <Route path="/inbound/report" element={<ReportInbound />}/>

             {/*route "/storage/chart" */}
             <Route path="/storage/chart" element={<ChartStorage />}/>

             {/*route "/outbound/chart" */}
             <Route path="/outbound/chart" element={<ChartOutbound />}/>

             {/* route "/inbound/report/grpothreelate" */}
             <Route path="/inbound/report/grpothreelate" element={<GrpothreelateReport />}/>

              {/* route "/inbound/report/grpothreeontime" */}
              <Route path="/inbound/report/grpothreeontime" element={<GrpothreeontimeReport />}/>

            




           

             {/* route "/das" */}
             <Route path="/" element={<Dashboard />} />

              {/* route "/dashboardstore" */}
             <Route path="/dashboardstore" element={<DashboardStoreIndex />} />      


            {/* private route "/admin/dashboard" */}
            {/* <Route path="admin/dashboard" element={<DashboardAdmin/>}/> */}
            <Route
                path="/admin/dashboard"
                element={
                        <PrivateRoutes>
                            <DashboardAdmin />
                        </PrivateRoutes>
                }
            /> 

            {/*private route "/admin/inbound/grporeport" */}
            <Route 
            path="/admin/inbound/grporeport" 
            element={
              <PrivateRoutes>
            <GrpoReport/>
            </PrivateRoutes>
            }
            /> 

             {/*private route "/admin/inbound/itrinreport" */}
            <Route 
            path="/admin/inbound/itrinreport" 
            element={
              <PrivateRoutes>
            <ItrinReport/>
            </PrivateRoutes>
            }
            />   

             {/*private route "/admin/inbound/returnreport" */}
            <Route 
            path="/admin/inbound/returnreport" 
            element={
              <PrivateRoutes>
            <ReturnReport/>
            </PrivateRoutes>
            }
            />

             {/*private route "/admin/inbound/crossdockreport" */}
            <Route 
            path="/admin/inbound/crossdockreport" 
            element={
              <PrivateRoutes>
            <CrossdockReport/>
            </PrivateRoutes>
            }
            />  

            {/*private route "/admin/storage/cashpicking" */}
            <Route 
            path="/admin/storage/cashpicking" 
            element={
              <PrivateRoutes>
            <CashPickingReport/>
            </PrivateRoutes>
            }
            /> 

            {/*private route "/admin/storage/deliverypicking" */}
            <Route 
            path="/admin/storage/deliverypicking" 
            element={
              <PrivateRoutes>
            <DeliveryPickingReport/>
            </PrivateRoutes>
            }
            />     

             {/*private route "/admin/storage/putaway" */}
             <Route 
            path="/admin/storage/putaway" 
            element={
              <PrivateRoutes>
            <PutAwayReport/>
            </PrivateRoutes>
            }
            />   

             {/*private route "/admin/storage/replenishment" */}
             <Route 
            path="/admin/storage/replenishment" 
            element={
              <PrivateRoutes>
            <ReplenishmentReport/>
            </PrivateRoutes>
            }
            />

            {/*private route "/admin/storage/listpicking" */}
            <Route 
            path="/admin/storage/listpicking" 
            element={
              <PrivateRoutes>
            <ListPickingReport/>
            </PrivateRoutes>
            }
            />

             {/*private route "/admin/outbound/arreservein" */}
             <Route 
            path="/admin/outbound/arreservein" 
            element={
              <PrivateRoutes>
            <ArReserveInReport/>
            </PrivateRoutes>
            }
            />   

            {/*private route "/admin/outbound/inventorytro" */}
             <Route 
            path="/admin/outbound/inventorytro" 
            element={
              <PrivateRoutes>
            <InventoryOutReport/>
            </PrivateRoutes>
            }
            />   

             {/*private route "/admin/outbound/salesorder" */}
             <Route 
            path="/admin/outbound/salesorder" 
            element={
              <PrivateRoutes>
            <SalesOrderReport/>
            </PrivateRoutes>
            }
            />     
                      
           

            </Routes>
    )
}

export default RoutesIndex