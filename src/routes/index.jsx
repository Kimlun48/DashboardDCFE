
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

import Logistic from '../pages/DCv1.2/Inbound/Logistic.jsx';

//storage
import CashPickingReport from '../pages/DCv1.2/Admin/Reports/storage/CashPickingReport.jsx';
import DeliveryPickingReport from '../pages/DCv1.2/Admin/Reports/storage/DeliveryPickingReport.jsx';
import PutAwayReport from '../pages/DCv1.2/Admin/Reports/storage/PutawayReport.jsx';
import ReplenishmentReport from '../pages/DCv1.2/Admin/Reports/storage/ReplenishmentReport.jsx';
//outbound
import ArReserveInReport from '../pages/DCv1.2/Admin/Reports/outbound/ArReserveInvoiceReport.jsx';
import InventoryOutReport from '../pages/DCv1.2/Admin/Reports/outbound/InventoryTroReport.jsx';
import SalesOrderReport from '../pages/DCv1.2/Admin/Reports/outbound/SalesOrderReport.jsx';
import QrCodeScanner from '../pages/DCv1.2/Inbound/QrCodeScanner.jsx';

//admin
import Login from '../pages/DCv1.2/Admin/Auth/Login.jsx';

//kaliurang
import ChartKaliurang from '../pages/DCv1.2/Store/Kaliurang/Chart.jsx';
import KaliurangBinINReport from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailBinIN.jsx';
import KaliurangBinTransitReport from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailBinTransit.jsx';
import KaliurangBinOUTReport from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailBinOUT.jsx';
import KaliurangBinInLateDetail from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailBinInLate.jsx';
import KaliurangBinOutLateDetail from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailBinOutLate.jsx';
import KaliurangBinInTransitDetail from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailBinTransitLate.jsx';

import ChartStoreKaliurang from '../pages/DCv1.2/Store/Kaliurang/ChartStore.jsx';
import KaliurangDetailBinINStore from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailBinINStore.jsx';
import KaliurangDetailBinOutStore from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailBinOutStore.jsx';
import KaliurangDetailBinTransitStore from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailBinTransitStore.jsx';
import StorePndKaliurang from '../pages/DCv1.2/Store/Kaliurang/PndStore.jsx';
import KaliurangCashCarryLateDetail from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailCashCarryLate.jsx';
import KaliurangCashCarryOnScheduleDetail from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailCashCarryOnSchedule.jsx';
import KaliurangDelivCustLateDetail from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailDelivCustLate.jsx';
import KaliurangDelivCustOnScheduleDetail from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailDelivCustOnSchedule.jsx';
import KaliurangItrInLateDetail from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailItrInLate.jsx';
import KaliurangItrInOnScheduleDetail from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailItrInOnSchedule.jsx';
import KaliurangItrOutLateDetail from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailItrOutLate.jsx';
import KaliurangItrOutOnScheduleDetail from '../pages/DCv1.2/Admin/Reports/store/kaliurang/DetailItrOutOnSchedule.jsx';

import ChartWareHouseKaliurang from '../pages/DCv1.2/Store/Kaliurang/ChartWareHouse.jsx';
import KaliurangDetailBinInWarehouse from '../pages/DCv1.2/Admin/Reports/store/kaliurang/warehouse/detailBinInWarehouse.jsx';
import KaliurangDetailBinOutWarehouse from '../pages/DCv1.2/Admin/Reports/store/kaliurang/warehouse/detailBinOutWarehouse.jsx';
import KaliurangDetailBinTransitWarehouse from '../pages/DCv1.2/Admin/Reports/store/kaliurang/warehouse/detailBinTransitWarehouse.jsx';
import KaliurangBinInLateDetailWarehouse from '../pages/DCv1.2/Admin/Reports/store/kaliurang/warehouse/detailBinInLateWarehouse.jsx';

//user
import User from '../pages/DCv1.2/Admin/User/User.jsx';

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

               {/* route "/qrcode" */}
               <Route path="/qrcode" element={<QrCodeScanner />}/>


           

             {/* route "/das" */}
             <Route path="/" element={<Dashboard />} />

              {/* route "/dashboardstore" */}
             <Route path="/dashboardstore" element={<DashboardStoreIndex />} />


             
              {/* route "/kaliurang/bininreport" */}
              <Route path="/kaliurang/bininreport" element={<KaliurangBinINReport />} />
              {/* route "/kaliurang/binoutreport" */}
              <Route path="/kaliurang/binoutreport" element={<KaliurangBinOUTReport />} />
              {/* route "/kaliurang/binreport" */}
              <Route path="/kaliurang/bintransitreport" element={<KaliurangBinTransitReport />} />
              {/* route "/kaliurang/bininlatedetail" */}
              <Route path="/kaliurang/bininlatedetail" element={<KaliurangBinInLateDetail />} />
              {/* route "/kaliurang/binoutlatedetail" */}
              <Route path="/kaliurang/binoutlatedetail" element={<KaliurangBinOutLateDetail />} />
              {/* route "/kaliurang/bintransitlatedetail" */}
              <Route path="/kaliurang/bintransitlatedetail" element={<KaliurangBinInTransitDetail />} />
              {/* route "/kaliurang/cashcarrylatedetail" */}
              <Route path="/kaliurang/cashcarrylatedetail" element={<KaliurangCashCarryLateDetail />} />
              {/* route "/kaliurang/cashcarryonscheduledetail" */}
              <Route path="/kaliurang/cashcarryonscheduledetail" element={<KaliurangCashCarryOnScheduleDetail />} />
              {/* route "/kaliurang/deliverycustomerlatedetail" */}
              <Route path="/kaliurang/deliverycustomerlatedetail" element={<KaliurangDelivCustLateDetail />} />
              {/* route "/kaliurang/deliverycustomeronscheduledetail" */}
              <Route path="/kaliurang/deliverycustomeronscheduledetail" element={<KaliurangDelivCustOnScheduleDetail />} />
              {/* route "/kaliurang/itrinlatedetail" */}
              <Route path="/kaliurang/itrinlatedetail" element={<KaliurangItrInLateDetail />} />
              {/* route "/kaliurang/itrinonscheduledetail" */}
              <Route path="/kaliurang/itrinonscheduledetail" element={<KaliurangItrInOnScheduleDetail />} />
              {/* route "/kaliurang/itroutlatedetail" */}
              <Route path="/kaliurang/itroutlatedetail" element={<KaliurangItrOutLateDetail />} />
              {/* route "/kaliurang/itroutonscheduledetail" */}
              <Route path="/kaliurang/itroutonscheduledetail" element={<KaliurangItrOutOnScheduleDetail />} />





              {/* route "/kaliurang/store" */}
              <Route path="/kaliurang/store" element={<ChartStoreKaliurang />} />

              {/* route "/kaliurang/bininreportstore" */}
              <Route path="/kaliurang/bininreportstore" element={<KaliurangDetailBinINStore />} />
              
              {/* route "/kaliurang/binoutreportstore" */}
              <Route path="/kaliurang/binoutreportstore" element={<KaliurangDetailBinOutStore />} />
              {/* route "/kaliurang/binreportstore" */}
              <Route path="/kaliurang/bintransitreportstore" element={<KaliurangDetailBinTransitStore />} />
              {/* route "/kaliurang/pndstore" */}
              <Route path="/kaliurang/pndstore" element={<StorePndKaliurang />} />
              {/* route "/kaliurang/warehouse" */}
              <Route path="/kaliurang/warehouse" element={<ChartWareHouseKaliurang />} />
              {/* route "/kaliurang/inoutwarehouse" */}
             <Route path="/kaliurang/inoutwarehouse" element={<ChartKaliurang />} />
             {/* route "/kaliurang/bininreportwarehouse" */}
             <Route path="/kaliurang/bininreportwarehouse" element={<KaliurangDetailBinInWarehouse />} />
             {/* route "/kaliurang/binoutreportwarehouse" */}
             <Route path="/kaliurang/binoutreportwarehouse" element={<KaliurangDetailBinOutWarehouse />} />
             {/* route "/kaliurang/bintransitreportwarehouse" */}
             <Route path="/kaliurang/bintransitreportwarehouse" element={<KaliurangDetailBinTransitWarehouse />} />
             {/* route "/kaliurang/detailbininlatewarehouse" */}
             <Route path="/kaliurang/detailbininlatewarehouse" element={<KaliurangBinInLateDetailWarehouse />} />
             

               






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

            {/*private route "/admin/inbound/logistic" */}
            <Route 
            path="/admin/inbound/logistic" 
            element={
              <PrivateRoutes>
            <Logistic/>
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

              
            {/*private route "/admin/user" */}
            <Route
            path="/admin/user" 
            element={
              <PrivateRoutes>
            <User/>
            </PrivateRoutes>
            }
            />
                      
           

            </Routes>
    )
}

export default RoutesIndex