import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import ListUser from "../../../../components/dcv1.2/user/listUser";
import ListPermissions from "../../../../components/dcv1.2/user/listPermissions";
import ListRole from "../../../../components/dcv1.2/user/listRole";
import AdminLayout from "../../../../components/dcv1.2/layouts/adminlayout";
// import TransaksiRequest from "../../../components/dcv1.2/inbound/logistic/TransaksiRequest";
// import QrScannerInbound from "../../../components/dcv1.2/inbound/logistic/QrScannerInbound";
import { useQuery } from "@tanstack/react-query";

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

function User() {
    const [value, setValue] = useState(0);
    const [permissions, setPermissions] = useState([]);
    
    const { data: userPermissions = [], isLoading } = useQuery({
        queryKey: ['permissions'], 
        queryFn: async () => {
            const response = await Api.get('/api/userpermission');
            return response.data.permissions;
        },
        cacheTime: 10 * 60 * 1000, 
        staleTime: 30000, 
    });

    const hasPermission = (permission) => {
        return userPermissions.includes(permission);
    };


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
                                        <span className="font">User Management</span>
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
                                                  color: 'white', 
                                                  fontWeight:'normal',
                                                },
                                                '& .MuiTab-root.Mui-selected': {
                                                  color: '#fff', 
                                                  fontWeight:'normal',
                                                },
                                                '& .MuiTabs-indicator': {
                                                  backgroundColor: '#fff', 
                                                },
                                              }}
                                        >
                                          {hasPermission('users.index')&& <Tab label="Users" {...a11yProps(0)} />}
                                          {hasPermission('roles.index') &&<Tab label="Roles" {...a11yProps(1)} />}
                                          {hasPermission('permissions.index')&& <Tab label="Permisions" {...a11yProps(2)} />}
                                        </Tabs>
                                    </Box>
                                    {hasPermission('users.index')&&
                                    <TabPanel value={value} index={0}>
                                     <ListUser/>
                                    </TabPanel>
                                    }   
                                    {hasPermission('roles.index') &&
                                    <TabPanel value={value} index={1}>
                                    <ListRole/>
                                    </TabPanel>
                                    }
                                    {hasPermission('permissions.index')&&
                                    <TabPanel value={value} index={2}>
                                    <ListPermissions/>
                                    </TabPanel>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
}

export default User;