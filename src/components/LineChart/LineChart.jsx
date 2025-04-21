// import React, { useEffect, useState } from 'react'
// import {Line} from 'react-chartjs-2'
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Tooltip,
//     Legend,
//   } from 'chart.js';

//   ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);


// // const LineChart = ({historicalData}) => {

// // const [data, setData] = useState([["Date", "Prices"]])

// // useEffect(() => {
// //   let dataCopy = [["Date", "Prices"]];
// //   if(historicalData.prices){
// //     historicalData.prices.map((item) => {
// //         dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]])
// //     })
// //     setData(dataCopy)
// //   }
// // }, [historicalData])


// //   return (
// //     <Chart
// //         chartType='LineChart'
// //         data={data}
// //         height="100%"
// //         legendToggle
// //     />
// //   )
// // }


// const LineChart = ({ historicalData }) => {
//     if (!historicalData || !historicalData.prices) return 
//     const data = {
//       labels: historicalData.prices.map(item =>
//         new Date(item[0]).toLocaleDateString()
//       ),
//       datasets: [
//         {
//           label: 'Price',
//           data: historicalData.prices.map(item => item[1]),
//           borderColor: '#4500c6',
//           backgroundColor: 'rgba(69,0,198,0.2)',
//           tension: 0.3,
//           fill: true,
//         },
//       ],
//     };
  
//     const options = {
//       responsive: true,
//       plugins: {
//         legend: { display: false },
//       },
//     };
  
//     return <Line data={data} options={options} />;
//   };
  
// export default LineChart


// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Filler,
//   Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend);

// const LineChart = ({ coinId = 'bitcoin', currency = 'usd', days = 7 }) => {
//   const [historicalData, setHistoricalData] = useState(null);

//   useEffect(() => {
//     const fetchHistorical = async () => {
//       try {
//         const res = await fetch(
//           `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`
//         );
//         const data = await res.json();
//         setHistoricalData(data.prices);
//       } catch (err) {
//         console.error('Error fetching historical data:', err);
//       }
//     };
//     fetchHistorical();
//   }, [coinId, currency, days]);

//   if (!historicalData) return null;

//   const labels = historicalData.map(item => {
//     const date = new Date(item[0]);
//     return `${date.getMonth() + 1}/${date.getDate()}`;
//   });

//   const prices = historicalData.map(item => item[1]);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: '',
//         data: prices,
//         borderColor: '#000000', // black line
//         backgroundColor: 'transparent', // no fill
//         fill: false,
//         tension: 0.3,
//         pointRadius: 0,
//         borderWidth: 2,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         callbacks: {
//           label: (context) => `$${context.parsed.y.toFixed(2)}`
//         },
//         backgroundColor: '#000',
//         titleColor: '#fff',
//         bodyColor: '#fff',
//       }
//     },
//     scales: {
//       x: {
//         ticks: { color: '#000', maxTicksLimit: 6 },
//         grid: { color: '#eee' }
//       },
//       y: {
//         ticks: {
//           color: '#000',
//           callback: (val) => `$${val.toFixed(2)}`
//         },
//         grid: { color: '#eee' }
//       }
//     }
//   };

//   return (
//     <div style={{
//       height: '200px',
//       width: '100%',
//       backgroundColor: '#fff', // full chart bg white
//       padding: '1rem',
//       borderRadius: '12px',
//       boxShadow: '0 0 10px rgba(0,0,0,0.05)'
//     }}>
//       <Line data={data} options={options} />
//     </div>
//   );
// };

// export default LineChart;


import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend);

const LineChart = ({ coinId = 'solana', currency = 'usd', days = 10 }) => {
  const [historicalData, setHistoricalData] = useState(null);

  useEffect(() => {
    const fetchHistorical = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`
        );
        const data = await res.json();
        setHistoricalData(data.prices);
      } catch (err) {
        console.error('Error fetching historical data:', err);
      }
    };
    fetchHistorical();
  }, [coinId, currency, days]);

  if (!historicalData) return null;

  const labels = historicalData.map(item => {
    const date = new Date(item[0]);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  const prices = historicalData.map(item => item[1]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Prices',
        data: prices,
        borderColor: '#4F8EF7', // Blue line similar to the one in the image
        backgroundColor: 'rgba(79, 142, 247, 0.1)', // Very light blue for gradient
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: '#4F8EF7',
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.parsed.y.toFixed(2)}`
        },
        backgroundColor: '#fff',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6
      }
    },
    scales: {
      x: {
        ticks: { 
          color: '#666', 
          maxTicksLimit: 10,
          font: {
            size: 10
          }
        },
        grid: { 
          display: false
        },
        border: {
          display: false
        }
      },
      y: {
        position: 'right',
        ticks: {
          color: '#666',
          callback: (val) => `${val}`,
          font: {
            size: 10
          }
        },
        grid: { 
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        border: {
          display: false
        }
      }
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }
    }
  };

  return (
    <div style={{
       
      height: '250px',
      width: '600px',
      
      backgroundColor: '#ffffff', 
      
    }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;