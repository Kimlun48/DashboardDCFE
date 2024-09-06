import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import GenerateScheduleForm from "../../../components/dcv1.2/inbound/logistic/generateScheduleForm";
import LeadTimes from "../../../components/dcv1.2/inbound/logistic/leadTimes";
import Transports from "../../../components/dcv1.2/inbound/logistic/transports";
import AdminLayout from "../../../components/dcv1.2/layouts/adminlayout";
import TransaksiRequest from "../../../components/dcv1.2/inbound/logistic/TransaksiRequest";
import QrScannerInbound from "../../../components/dcv1.2/inbound/logistic/QrScannerInbound";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function Logistic() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <AdminLayout>
                <div className="containers mt-4 mb-5">
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="font">Receiving Management</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            aria-label="basic tabs example"
                                            variant="scrollable"
                                            scrollButtons="auto"
                                            sx={{
                                                '& .MuiTab-root': {
                                                  color: 'white', /* Mengubah warna font tab */
                                                  fontWeight:'normal',
                                                },
                                                '& .MuiTab-root.Mui-selected': {
                                                  color: '#fff', /* Mengubah warna font untuk tab yang aktif */
                                                  fontWeight:'normal',
                                                },
                                                '& .MuiTabs-indicator': {
                                                  backgroundColor: '#fff', /* Warna indikator tab */
                                                },
                                              }}
                                        >
                                            <Tab label="Schedules" {...a11yProps(0)} />
                                            <Tab label="Lead Times" {...a11yProps(1)} />
                                            <Tab label="Conveyance" {...a11yProps(2)} />
                                            <Tab label="Vendor Transaction" {...a11yProps(3)} />
                                            <Tab label="QR Scan" {...a11yProps(4)} />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value={value} index={0}>
                                        <GenerateScheduleForm />
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <LeadTimes />
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        <Transports />
                                    </TabPanel>
                                    <TabPanel value={value} index={3}>
                                         <TransaksiRequest />     
                                    </TabPanel>
                                    <TabPanel value={value} index={4}>
                                        <QrScannerInbound />
                                    </TabPanel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
}

export default Logistic;


// import React, { useState } from "react";
// import GenerateScheduleForm from "../../../components/dcv1.2/inbound/logistic/generateScheduleForm";
// import AdminLayout from "../../../components/dcv1.2/layouts/adminlayout";


// function Logistic() {
//     const [activeTab, setActiveTab] = useState(0);

//     const handleTabClick = (index) => {
//         setActiveTab(index);
//     };

//     return (
//         <React.Fragment>
//             <AdminLayout>
//                 <div className="containers mt-4 mb-5">
//                     <div className="row mt-4">
//                         <div className="col-md-12">
//                             <div className="card border-0 rounded shadow-sm border-top-success">
//                                 <div className="card-header d-flex justify-content-between align-items-center">
//                                     <div>
//                                         <span className="font-weight-bold">Logistics Management</span>
//                                     </div>
//                                 </div>
//                                 <div className="card-body">
//                                     <div className="tabs">
//                                         <div className="tab-buttons">
//                                             <button
//                                                 className={`tab-button ${activeTab === 0 ? "active" : ""}`}
//                                                 onClick={() => handleTabClick(0)}
//                                             >
//                                                 Generate Schedule
//                                             </button>
//                                             <button
//                                                 className={`tab-button ${activeTab === 1 ? "active" : ""}`}
//                                                 onClick={() => handleTabClick(1)}
//                                             >
//                                                 Other Tab 1
//                                             </button>
//                                             <button
//                                                 className={`tab-button ${activeTab === 2 ? "active" : ""}`}
//                                                 onClick={() => handleTabClick(2)}
//                                             >
//                                                 Other Tab 2
//                                             </button>
//                                             <button
//                                                 className={`tab-button ${activeTab === 3 ? "active" : ""}`}
//                                                 onClick={() => handleTabClick(3)}
//                                             >
//                                                 Other Tab 3
//                                             </button>
//                                         </div>
//                                         <div className="tab-content">
//                                             {activeTab === 0 && <GenerateScheduleForm />}
//                                             {activeTab === 1 && <div>Content for Other Tab 1</div>}
//                                             {activeTab === 2 && <div>Content for Other Tab 2</div>}
//                                             {activeTab === 3 && <div>Content for Other Tab 3</div>}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </AdminLayout>
//         </React.Fragment>
//     );
// }

// export default Logistic;
