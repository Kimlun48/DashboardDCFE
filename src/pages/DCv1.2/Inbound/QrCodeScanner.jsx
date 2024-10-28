import React from "react";
import QrScannerVendor from "../../../components/dcv1.2/inbound/logistic/QrScannerVendor";
import { Box, Typography, Container } from "@mui/material";

const QrCodeScanner = () => {
    return (
      <React.Fragment>
            <Container 
            style={{ 
                marginTop: '10px', 
                textAlign: 'center', 
                height: '100vh', 
                maxWidth: '1200px', 
                // width: '100%', 
            }}
            >
                <Box 
                    boxShadow={3} 
                    borderRadius={4} 
                    bgcolor="white"
                    style={{ 
                        minHeight: '400px', 
                        height: 'auto', 
                        width: '100%', 
                        margin: '0 auto', 
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        QR Code Scanner Security
                    </Typography>
                    <QrScannerVendor />
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default QrCodeScanner;
