// import React from "react";

// const ScannerInput = ({barcodeData, handleInputChange, handleKeyDown}) => {
//     return (
//         <input 
//             type="text"
//             value={barcodeData}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             style={{width:'300px', padding:'10px', fontSize:'16px'}}
//             placeholder="Booking ID"
//             autoFocus
//         />
//     );
// };

// export default ScannerInput;

import React from "react";

const ScannerInput = ({ barcodeData, handleInputChange, handleKeyDown }) => {
    return (
        <input 
            id="barcode-input" // Menambahkan ID untuk fokus
            type="text"
            value={barcodeData}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            style={{
                width: '100%', // Mengubah menjadi 100% agar responsif
                maxWidth: '300px', // Maksimum lebar untuk input
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ccc', // Menambahkan border untuk input
                borderRadius: '4px', // Menambahkan border radius
                outline: 'none', // Menghilangkan outline default
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // Menambahkan bayangan
            }}
            placeholder="Booking ID"
            autoFocus
        />
    );
};

export default ScannerInput;
