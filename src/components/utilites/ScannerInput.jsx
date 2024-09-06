import React from "react";

const ScannerInput = ({barcodeData, handleInputChange, handleKeyDown}) => {
    return (
        <input 
            type="text"
            value={barcodeData}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            style={{width:'300px', padding:'10px', fontSize:'16px'}}
            placeholder="Booking ID"
            autoFocus
        />
    );
};

export default ScannerInput;