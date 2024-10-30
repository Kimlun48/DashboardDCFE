// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Api from '../../../../api';
// import moment from 'moment';
// import toast from 'react-hot-toast';
// import useFormatDate from '../../../utilites/useFormatDate';
// import DataTable from 'react-data-table-component';

// function GenerateScheduleForm() {
//   const [slot, setSlot] = useState('');
//   const [jenisJam, setJenisJam] = useState('');
//   const [monthYear, setMonthYear] = useState(new Date());
//   const [schedule, setSchedule] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [search, setSearch] = useState('');
//   const { formatDate } = useFormatDate();
//   const [masterHour, setMasterHour] = useState([]);

//   const fetchDataHour = async () => {
//     try {
//       const response = await Api.get('api/hour');
//       setMasterHour(response.data.data);
//       console.log('API Response hours:', response.data);
//     } catch (error) {
//       console.error('Error fetching data hour:', error);
//     }
//   };

//   useEffect(() => {
//     fetchDataHour();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await Api.get('api/schedule');
//       console.log('API Response:', response.data);
//       setSchedule(response.data.data);
//       setFilteredData(response.data.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const lowercasedSearch = search.toLowerCase();
//     const filtered = schedule.filter(item =>
//       item.id.toString().toLowerCase().includes(lowercasedSearch)
//     );
//     setFilteredData(filtered);
//   }, [search, schedule]);

//   const columns = [
//     { name: 'Id', selector: row => row.id, sortable: true, width: '100px' },
//     { name: 'Date', selector: row => row.hari ? formatDate(row.hari) : 'No Data', sortable: true },
//     { name: 'Start', selector: row => row.mulai, sortable: true, width: '100px' },
//     { name: 'Finish', selector: row => row.akhir, sortable: true, width: '100px' },
//     { name: 'Activity', selector: row => row.jenis_aktivitas, sortable: true, width: '200px' },
//     { name: 'Slot', selector: row => row.slot, sortable: true },
//     { name: 'a_slot', selector: row => row.available_slot, sortable: true, width: '100px' },
//     { name: 'Status', selector: row => row.status ?? 'No Data', sortable: true },
//   ];

//   const customStyles = {
//     headCells: {
//       style: {
//         backgroundColor: '#0e0f65',
//         color: 'white',
//         fontSize: '16px',
//         fontWeight: 'normal',
//       },
//     },
//     rows: {
//       style: {
//         backgroundColor: '#f2f2f2',
//         '&:nth-of-type(odd)': {
//           backgroundColor: '#e6e6e6',
//         },
//         fontSize: '14px',
//         color: '#333',
//       },
//     },
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = {
//       slot: slot,
//       jenis_jam: jenisJam,
//       monthyear: moment(monthYear).format('YYYY-MM'),
//     };

//     try {
//       const response = await Api.post('/api/generate-schedule', data);
//       toast.success("Generate Data Successfully!", {
//         duration: 4000,
//         position: "top-right",
//         style: {
//           borderRadius: '10px',
//           background: '#1f59a1',
//           color: '#fff',
//         },
//       });
//       console.log(response.data);
//       fetchData();
//     } catch (error) {
//       console.error('There was an error generating the schedule!', error);
//       toast.error(error.response.data.message, {
//         duration: 4000,
//         position: "top-right",
//         style: {
//           borderRadius: '10px',
//           background: '#1f59a1',
//           color: '#fff',
//         },
//         icon: '❌',
//       });
//     }
//   };

//   return (
//     <React.Fragment>
//       <div className="form-container">
//         <form onSubmit={handleSubmit} className="form-content">
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="slot">Slot:</label>
//               <input
//                 id="slot"
//                 type="number"
//                 value={slot}
//                 onChange={(e) => setSlot(e.target.value)}
//                 required
//                 className="form-input"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="jenisJam">Times:</label>
//               <select
//                 id="jenisJam"
//                 value={jenisJam}
//                 onChange={(e) => setJenisJam(e.target.value)}
//                 required
//                 className="form-input"
//               >
//                 <option value="" disabled>Choose time</option>
//                 {masterHour.map((option) => (
//                   <option key={option.id} value={option.jenis_jam}>
//                     {option.jenis_jam}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="monthYear">Month Year:</label>
//               <DatePicker
//                 id="monthYear"
//                 selected={monthYear}
//                 onChange={(date) => setMonthYear(date)}
//                 dateFormat="MM/yyyy"
//                 showMonthYearPicker
//                 showFullMonthYearPicker
//                 showFourColumnMonthYearPicker
//                 required
//                 className="form-input date-picker-input"
//               />
//             </div>
//           </div>
//           <button type="submit" className="submit-button">
//             Generate
//           </button>
//         </form>
//       </div>

//       <div className="containers mt-4 mb-5">
//         <div className="row mt-4">
//           <div className="col-md-12">
//             <div className="card border-0 rounded shadow-sm border-top-success">
//               <div className="card-body">
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   className="form-control mb-3"
//                   value={search}
//                   onChange={e => setSearch(e.target.value)}
//                 />
//                 <DataTable
//                   columns={columns}
//                   data={filteredData}
//                   pagination
//                   paginationPerPage={5}
//                   paginationRowsPerPageOptions={[5, 10, 15, 20]}
//                   highlightOnHover
//                   customStyles={customStyles}
//                   noDataComponent={
//                     <div className="alert alert-danger mb-0">
//                       Data Belum Tersedia!
//                     </div>
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }

// export default GenerateScheduleForm;

// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Api from '../../../../api';
// import moment from 'moment';
// import toast from 'react-hot-toast';
// import useFormatDate from '../../../utilites/useFormatDate';
// import DataTable from 'react-data-table-component';

// function GenerateScheduleForm() {
//   const [slot, setSlot] = useState('');
//   const [jenisJam, setJenisJam] = useState('');
//   const [monthYear, setMonthYear] = useState(new Date());
//   const [schedule, setSchedule] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchDate, setSearchDate] = useState(null); // State untuk menyimpan tanggal pencarian
//   const { formatDate } = useFormatDate();
//   const [masterHour, setMasterHour] = useState([]);

//   const fetchDataHour = async () => {
//     try {
//       const response = await Api.get('api/hour');
//       setMasterHour(response.data.data);
//       console.log('API Response hours:', response.data);
//     } catch (error) {
//       console.error('Error fetching data hour:', error);
//     }
//   };

//   useEffect(() => {
//     fetchDataHour();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await Api.get('api/schedule');
//       console.log('API Response:', response.data);
//       setSchedule(response.data.data);
//       setFilteredData(response.data.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (searchDate) {
//       const formattedSearchDate = moment(searchDate).format('YYYY-MM-DD');
//       const filtered = schedule.filter(item =>
//         moment(item.hari).format('YYYY-MM-DD') === formattedSearchDate
//       );
//       setFilteredData(filtered);
//     } else {
//       setFilteredData(schedule); // Jika tidak ada tanggal pencarian, tampilkan semua data
//     }
//   }, [searchDate, schedule]);

//   const columns = [
//     { name: 'Id', selector: row => row.id, sortable: true, width: '100px' },
//     { name: 'Date', selector: row => row.hari ? formatDate(row.hari) : 'No Data', sortable: true },
//     { name: 'Start', selector: row => row.mulai, sortable: true, width: '100px' },
//     { name: 'Finish', selector: row => row.akhir, sortable: true, width: '100px' },
//     { name: 'Activity', selector: row => row.jenis_aktivitas, sortable: true, width: '200px' },
//     { name: 'Slot', selector: row => row.slot, sortable: true },
//     { name: 'a_slot', selector: row => row.available_slot, sortable: true, width: '100px' },
//     { name: 'Status', selector: row => row.status ?? 'No Data', sortable: true },
//   ];

//   const customStyles = {
//     headCells: {
//       style: {
//         backgroundColor: '#0e0f65',
//         color: 'white',
//         fontSize: '16px',
//         fontWeight: 'normal',
//       },
//     },
//     rows: {
//       style: {
//         backgroundColor: '#f2f2f2',
//         '&:nth-of-type(odd)': {
//           backgroundColor: '#e6e6e6',
//         },
//         fontSize: '14px',
//         color: '#333',
//       },
//     },
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = {
//       slot: slot,
//       jenis_jam: jenisJam,
//       monthyear: moment(monthYear).format('YYYY-MM'),
//     };

//     try {
//       const response = await Api.post('/api/generate-schedule', data);
//       toast.success("Generate Data Successfully!", {
//         duration: 4000,
//         position: "top-right",
//         style: {
//           borderRadius: '10px',
//           background: '#1f59a1',
//           color: '#fff',
//         },
//       });
//       console.log(response.data);
//       fetchData();
//     } catch (error) {
//       console.error('There was an error generating the schedule!', error);
//       toast.error(error.response.data.message, {
//         duration: 4000,
//         position: "top-right",
//         style: {
//           borderRadius: '10px',
//           background: '#1f59a1',
//           color: '#fff',
//         },
//         icon: '❌',
//       });
//     }
//   };

//   return (
//     <React.Fragment>
//       <div className="form-container">
//         <form onSubmit={handleSubmit} className="form-content">
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="slot">Slot:</label>
//               <input
//                 id="slot"
//                 type="number"
//                 value={slot}
//                 onChange={(e) => setSlot(e.target.value)}
//                 required
//                 className="form-input"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="jenisJam">Times:</label>
//               <select
//                 id="jenisJam"
//                 value={jenisJam}
//                 onChange={(e) => setJenisJam(e.target.value)}
//                 required
//                 className="form-input"
//               >
//                 <option value="" disabled>Choose time</option>
//                 {masterHour.map((option) => (
//                   <option key={option.id} value={option.jenis_jam}>
//                     {option.jenis_jam}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="monthYear">Month Year:</label>
//               <DatePicker
//                 id="monthYear"
//                 selected={monthYear}
//                 onChange={(date) => setMonthYear(date)}
//                 dateFormat="MM/yyyy"
//                 showMonthYearPicker
//                 showFullMonthYearPicker
//                 showFourColumnMonthYearPicker
//                 required
//                 className="form-input date-picker-input"
//               />
//             </div>
//           </div>
//           <button type="submit" className="submit-button">
//             Generate
//           </button>
//         </form>
//       </div>

//       <div className="containers mt-4 mb-5">
//         <div className="row mt-4">
//           <div className="col-md-12">
//             <div className="card border-0 rounded shadow-sm border-top-success">
//               <div className="card-body">
//                 <DatePicker
//                   selected={searchDate}
//                   onChange={(date) => setSearchDate(date)}
//                   dateFormat="dd/MM/yyyy"
//                   placeholderText="Search by date"
//                   className="form-control mb-3"
//                 />
//                 <DataTable
//                   columns={columns}
//                   data={filteredData}
//                   pagination
//                   paginationPerPage={5}
//                   paginationRowsPerPageOptions={[5, 10, 15, 20]}
//                   highlightOnHover
//                   customStyles={customStyles}
//                   noDataComponent={
//                     <div className="alert alert-danger mb-0">
//                       Data Belum Tersedia!
//                     </div>
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }

// export default GenerateScheduleForm;

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Api from '../../../../api';
import moment from 'moment';
import toast from 'react-hot-toast';
import useFormatDate from '../../../utilites/useFormatDate';
import DataTable from 'react-data-table-component';
import { Modal, Button, Table, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@tanstack/react-query';


function GenerateScheduleForm() {
  const [slot, setSlot] = useState('');
  const [jenisJam, setJenisJam] = useState('');
  const [monthYear, setMonthYear] = useState(new Date());
  const [schedule, setSchedule] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  //const [searchDate, setSearchDate] = useState(null);
  const { formatDate } = useFormatDate();
  const [masterHour, setMasterHour] = useState([]);
  const [requestTransaksi, setRequestTransaksi] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchDate, setSearchDate] = useState(new Date());

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

  const fetchDataHour = async () => {
    try {
      const response = await Api.get('api/hour');
      setMasterHour(response.data.data);
      console.log('API Response hours:', response.data);
    } catch (error) {
      console.error('Error fetching data hour:', error);
    }
  };

  useEffect(() => {
    fetchDataHour();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Api.get('api/schedule');
      console.log('API Response:', response.data);
      setSchedule(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchDate) {
      const formattedSearchDate = moment(searchDate).format('YYYY-MM-DD');
      const filtered = schedule.filter(item =>
        moment(item.hari).format('YYYY-MM-DD') === formattedSearchDate
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(schedule);
    }
  }, [searchDate, schedule]);



  const columns = [
    // { name: 'No', selector: row => row.id, sortable: true, width: '150px'},
    { name: 'Date', selector: row => row.hari ? formatDate(row.hari) : 'No Data', sortable: true,  width: '150px' },
    { name: 'Start', selector: row => row.mulai, sortable: true, width: '150px' },
    { name: 'Finish', selector: row => row.akhir, sortable: true, width: '150px' },
    { name: 'Activity', selector: row => row.jenis_aktivitas, sortable: true, width: '150px' },
    // { name: 'Slot', selector: row => row.slot, sortable: true, width: '100px' },
    { name: 'Av Slot', selector: row => row.available_slot, sortable: true, width: '150px' },
    { name: 'Status', selector: row => row.status ?? 'No Data', sortable: true },
 
  ];
  const customStyles = {
    rows: {
        style: {
          backgroundColor: '#f2f2f2',
        '&:nth-of-type(odd)': {
          backgroundColor: '#e6e6e6',
        },
            fontSize: '14px',
            '@media (max-width: 768px)': {
                fontSize: '12px',
            },
            color: '#333',
        },
    },
    headCells: {
        style: {
          backgroundColor: '#0e0f65',
            fontSize: '16px',
            '@media (max-width: 768px)': {
                fontSize: '14px', 
            },
            color: 'white',
        },
    },
};
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      slot: slot,
      jenis_jam: jenisJam,
      monthyear: moment(monthYear).format('YYYY-MM'),
    };

    try {
      const response = await Api.post('/api/generate-schedule', data);
      toast.success("Generate Data Successfully!", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: '10px',
          background: '#1f59a1',
          color: '#fff',
        },
      });
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error('There was an error generating the schedule!', error);
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: '10px',
          background: '#1f59a1',
          color: '#fff',
        },
        icon: '❌',
      });
    }finally{
      setLoading(false);
    }
  };

  const handleRowClick = async (id_jadwal) => {
    try {
      const response = await Api.get(`api/transaksireq_jadwal/${id_jadwal}`);
      setRequestTransaksi(response.data.data);
      console.log('Request Transaksi Data:', response.data.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching request transaksi data:', error);
    }
  };

  useEffect(() => {
    console.log('Current Request Transaksi State:', requestTransaksi);
  }, [requestTransaksi]);


  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};


  return (
    <React.Fragment>
     
     {hasPermission('schedule.create') && 
      <div className="containers mt-4 mb-5">
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-body">
               
              <form onSubmit={handleSubmit} className="form-content">
               <div className="form-row">
                  <div className="form-group">
                  <label htmlFor="slot">Slot:</label>
                  <input
                   id="slot"
                  type="number"
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  required
                  className="form-input"
                />
            </div>
            <div className="form-group">
              <label htmlFor="jenisJam">Times:</label>
              <select
                id="jenisJam"
                value={jenisJam}
                onChange={(e) => setJenisJam(e.target.value)}
                required
                className="form-input"
              >
                <option value="" disabled>Choose time</option>
                {masterHour.map((option) => (
                  <option key={option.id} value={option.jenis_jam}>
                    {option.jenis_jam}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="monthYear">Month Year:</label>
              <DatePicker
                id="monthYear"
                selected={monthYear}
                onChange={(date) => setMonthYear(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                showFourColumnMonthYearPicker
                required
                className="form-input date-picker-input"
              />
            </div>
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? (
              <>
               <div className="spinner-container">
              <div className="spinner-custom"></div>
            </div>
                Generating...
              </>
            ) : (
              'Generate'
            )}
          </button>
        </form>
              </div>
            </div>
          </div>
        </div>
      </div>
}

      <div className="containers mt-4 mb-5">
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card border-0 rounded shadow-sm border-top-success">
              <div className="card-body">
                <DatePicker
                  selected={searchDate}
                  onChange={(date) => setSearchDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Search by date"
                  className="form-control mb-3"
                />
                <DataTable
                  columns={columns}
                  data={filteredData}
                  pagination
                  paginationPerPage={10}
                  paginationRowsPerPageOptions={[10, 15, 20]}
                  highlightOnHover
                  customStyles={customStyles}
                  onRowClicked={(row) => handleRowClick(row.id)}
                  noDataComponent={
                    <div className="alert alert-danger mb-0">
                      Data Belum Tersedia!
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
      <Modal.Header closeButton>
     <Modal.Title>Request Transaksi</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {Array.isArray(requestTransaksi) && requestTransaksi.length > 0 ? (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {/* <th>Document ID</th> */}
            {hasPermission('view.idbooking')&&([
              <th>Id jadwal</th>,
              <th>Id Booking</th>
            ])
            }
            <th>Transport Type</th>
            <th>Vendor Name</th>
            <th>Request Slot</th>
            {/* <th>Driver</th> */}
            <th>Position Status</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {requestTransaksi.map((transaksi, index) => (
            <tr key={transaksi.id_jadwal}>
              {/* <td>{transaksi.surat_jalan}</td> */}
             {hasPermission('view.idbooking')&&([
               <td>{transaksi.id_jadwal}</td>,
               <td>{transaksi.id_req}</td>
              ])
              }
              <td>{transaksi.nama_kendaraan}</td>
              
               <td>{transaksi.nama_vendor}</td>
             
               <td>{transaksi.slot_req}</td>
             
               <td>{transaksi.status}</td>
               
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      <div>No data available</div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


    </React.Fragment>
  );
}

export default GenerateScheduleForm;
