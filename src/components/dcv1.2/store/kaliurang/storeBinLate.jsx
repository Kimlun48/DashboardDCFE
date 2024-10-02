


// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';
// import Api from "../../../../api";

// const ChartStoreGrpoLate = () => {
//     const [data, setData] = useState([]);

//     const fetchData = async () => {
//         try {
//             const response = await Api.get("/api/grpokaliurangheaderstatisticstorebinlate");
//             if (response.status === 200 && response.data.data.length > 0) {
//                 const transformedData = response.data.data.map(item => {
//                     let name;
//                     switch (item.BinCode) {
//                         case '01021001-STORE-IN':
//                             name = 'Bin IN Store Late';
//                             break;
//                         case '01021001-TRANSIT':
//                             name = 'Bin Transit Store Late';
//                             break;
//                         case '01021001-STORE-OUT':
//                             name = 'Bin OUT Store Late';
//                             break;
//                         default:
//                             name = 'Unknown';
//                     }
//                     return { name, value: parseInt(item.ONHAND, 10) };
//                 });

//                 // Cek jika semua ONHAND adalah 0
//                 const allZero = transformedData.every(item => item.value === 0);
//                 if (allZero) {
//                     setData([
//                         { name: 'No Data IN', value: 1 },
//                         { name: 'No Data OUT', value: 1 },
//                         { name: 'No Data Transit', value: 1 },
//                     ]);
//                 } else {
//                     setData(transformedData);
//                 }
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//         const interval = setInterval(fetchData, 2 * 60 * 1000); // Refresh setiap 2 menit
//         return () => clearInterval(interval);
//     }, []);

//     const COLORS = ['#32ADE6', '#0857bf', '#4F1787'];

//     return (
//         <React.Fragment>
//             <div className="col-12 mb-2">
//                 <div className="card-title">
//                     <div className="text">
//                         <h4 className="chart-title">Bin Late</h4>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-12 mb-2">
//                 <div className="card border-0 overflow-hidden">
//                     <div className="chart-container-chart">
//                         <ResponsiveContainer width="100%" height={300}>
//                             <PieChart>
//                                 <Pie
//                                     data={data}
//                                     dataKey="value"
//                                     nameKey="name"
//                                     cx="50%"
//                                     cy="50%"
//                                     outerRadius={120}
//                                     fill="#8884d8"
//                                  //   label
//                                     stroke="none"
//                                     innerRadius={60}

//                                 >
//                                     {data.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                     ))}
//                                     {/* <Label value="Bin Late Data" position="center" /> */}
//                                 </Pie>
//                                 <Tooltip
//                                     contentStyle={{
//                                         fontSize: 12,
//                                         backgroundColor: '#fff',
//                                         color: '#444',
//                                         border: 'none',
//                                         borderRadius: '5px',
//                                         padding: '8px'
//                                     }}
//                                 />
//                             </PieChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>
//             </div>
//             <div className="legend">
//                 <div className="legend-item">
//                     <div
//                         className="square-icon"
//                         style={{ backgroundColor: '#32ADE6', cursor: 'pointer' }}
//                         onClick={() => window.open('/kaliurang/bininlatedetail', '_blank')}
//                     />
//                     Bin IN Store Late
//                 </div>

//                 <div className="legend-item">
//                     <div
//                         className="square-icon"
//                         style={{ backgroundColor: '#0857bf', cursor: 'pointer' }}
//                         onClick={() => window.open('/kaliurang/binoutlatedetail', '_blank')}
//                     />
//                     Bin OUT Store Late
//                 </div>

//                 <div className="legend-item">
//                     <div
//                         className="square-icon"
//                         style={{ backgroundColor: '#4F1787', cursor: 'pointer' }}
//                         onClick={() => window.open('/kaliurang/bintransitlatedetail', '_blank')}
//                     />
//                     Bin Transit Store Late
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// };

// export default ChartStoreGrpoLate;




import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';
import Api from "../../../../api";

const ChartStoreGrpoLate = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await Api.get("/api/grpokaliurangheaderstatisticstorebinlate");
            if (response.status === 200 && response.data.data.length > 0) {
                const transformedData = response.data.data.map(item => {
                    let name;
                    switch (item.BinCode) {
                        case '01021001-STORE-IN':
                            name = 'Bin IN Store Late';
                            break;
                        case '01021001-TRANSIT':
                            name = 'Bin Transit Store Late';
                            break;
                        case '01021001-STORE-OUT':
                            name = 'Bin OUT Store Late';
                            break;
                        default:
                            name = 'Unknown';
                    }
                    return { name, value: parseInt(item.ONHAND, 10) };
                });
              

                
                const allZero = transformedData.every(item => item.value === 0);
                if (allZero) {
                    setData([
                        { name: 'No Data IN', value: 1 },
                        { name: 'No Data OUT', value: 1 },
                        { name: 'No Data Transit', value: 1 },
                    ]);
                } else {
                    setData(transformedData);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5 * 60 * 1000); // Refresh setiap 2 menit
        return () => clearInterval(interval);
    }, []);

  //  const COLORS = ['#01FEFF', '#CD0099', '#FF6608'];

    const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

    const handleClick = (entry) => {
        const urlMap = {
            'Bin IN Store Late': '/kaliurang/bininlatedetail',
            'Bin OUT Store Late': '/kaliurang/binoutlatedetail',
            'Bin Transit Store Late': '/kaliurang/bintransitlatedetail',
        };
    
        const url = urlMap[entry.name];
        if (url) {
            window.open(url, '_blank');
        }
    };

    return (
        <React.Fragment>
            <div className="col-12 mb-2">
                <div className="card-title">
                    <div className="text">
                        <h4 className="chart-title">Bin Late</h4>
                    </div>
                </div>
            </div>
           
                   
            <ResponsiveContainer width="100%" height={250}>
  <PieChart>
    <defs>
      <linearGradient id="Bin_IN_Store_Late" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#01FEFF" stopOpacity={1}/>
      <stop offset="100%" stopColor="#01FEFF" stopOpacity={0.5}/>
      </linearGradient>
      <linearGradient id="Bin_OUT_Store_Late" x1="0" y1="0" x2="0" y2="1">
        <stop offset="10%" stopColor="#CD0099" stopOpacity={1}/>
        <stop offset="100%" stopColor="#CD0099" stopOpacity={0.5}/>
      </linearGradient>
      <linearGradient id="Bin_Transit_Store_Late" x1="0" y1="0" x2="0" y2="1">
        <stop offset="10%" stopColor="#FF6608" stopOpacity={1}/>
        <stop offset="100%" stopColor="#FF6608" stopOpacity={0.5}/>
      </linearGradient>
    </defs>
    <Pie
      data={data}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={90}
      innerRadius={60}
      fill="#8884d8"
      label={({ value }) => `${value !== undefined && !isNaN(value) ? value : 0}`}
      stroke="none"
      onClick={(data, index) => handleClick(data)}
      className="pointer-cursor"
      paddingAngle={1}
    >
      {data.map((entry, index) => {
        // Assign the corresponding gradient based on index
        let gradientId;
        switch (index) {
          case 0:
            gradientId = "Bin_IN_Store_Late";
            break;
          case 1:
            gradientId = "Bin_OUT_Store_Late";
            break;
          case 2:
            gradientId = "Bin_Transit_Store_Late";
            break;
          default:
            gradientId = "Bin_IN_Store_Late"; // Fallback color
        }
        return <Cell key={`cell-${index}`} fill={`url(#${gradientId})`} />;
      })}
      <Label
        value={
          totalValue > 0 ? `${totalValue} Late` : "No Late Data"
        }
        position="center"
        style={{  fill:'whitesmoke', }}
      />
    </Pie>
    <Tooltip
      contentStyle={{
        fontSize: 10,
        backgroundColor: '#fff',
        color: '#444',
        border: 'none',
        borderRadius: '5px',
        padding: '8px',
      }}
    />
  </PieChart>
</ResponsiveContainer>

                    
                
           
        </React.Fragment>
    );
};

export default ChartStoreGrpoLate;



