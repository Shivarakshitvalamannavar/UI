// "use client";

// import React, { useEffect, useState } from "react";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { motion } from "framer-motion";

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function EmissionsDashboard() {
//   const [emissions, setEmissions] = useState({
//     flightEmissions: 0,
//     fuelEmissions: 0,
//     powerEmissions: 0,
//     shippingEmissions: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchEmissions() {
//       try {
//         const response = await fetch("/api/Dashboard");
//         if (!response.ok) {
//           throw new Error("Failed to fetch emissions data");
//         }
//         const data = await response.json();
//         setEmissions(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setTimeout(() => {
//           setLoading(false);
//         }, 800);
//       }
//     }
//     fetchEmissions();
//   }, []);

//   if (loading) return <p className="loading">Loading emissions data...</p>;
//   if (error) return <p className="error">Error: {error}</p>;

//   // Prepare the chart data
//   const chartData = {
//     labels: ["Flight Emissions", "Fuel Emissions", "Power Emissions", "Shipping Emissions"],
//     datasets: [
//       {
//         label: "Carbon Emissions (kg)",
//         data: [
//           emissions.flightEmissions,
//           emissions.fuelEmissions,
//           emissions.powerEmissions,
//           emissions.shippingEmissions,
//         ],
//         backgroundColor: [
//           "rgba(27, 94, 32, 0.85)",
//           "rgba(76, 175, 80, 0.85)",
//           "rgba(129, 199, 132, 0.85)",
//           "rgba(200, 230, 201, 0.85)",
//         ],
//         borderColor: [
//           "rgba(27, 94, 32, 1)",
//           "rgba(76, 175, 80, 1)",
//           "rgba(129, 199, 132, 1)",
//           "rgba(200, 230, 201, 1)",
//         ],
//         borderWidth: 2,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         labels: {
//           font: { size: 16 },
//           color: "#1B5E20",
//         },
//       },
//       tooltip: {
//         titleFont: { size: 18 },
//         bodyFont: { size: 14 },
//       },
//     },
//   };

//   return (
//     <div className="dashboard">
//       <header>
//         <h1>Carbon Footprint Dashboard</h1>
//       </header>

//       <main>
//         <section className="card">
//           <div className="info">
//             <h2>Emissions Summary</h2>
//             <ul>
//               <li>
//                 <span className="label">Flight Emissions:</span>
//                 <span className="value">{emissions.flightEmissions} kg</span>
//               </li>
//               <li>
//                 <span className="label">Fuel Emissions:</span>
//                 <span className="value">{emissions.fuelEmissions} kg</span>
//               </li>
//               <li>
//                 <span className="label">Power Emissions:</span>
//                 <span className="value">{emissions.powerEmissions} kg</span>
//               </li>
//               <li>
//                 <span className="label">Shipping Emissions:</span>
//                 <span className="value">{emissions.shippingEmissions} kg</span>
//               </li>
//             </ul>
//           </div>

//           {/* Enlarged and animated chart container */}
//           <motion.div
//             className="chart"
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             transition={{ duration: 1.2, ease: "easeOut" }}
//           >
//             <Pie data={chartData} options={chartOptions} />
//           </motion.div>
//         </section>
//       </main>

//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@400;500;700&display=swap');

//         /* Dashboard container with classic gradient */
//         .dashboard {
//           background: linear-gradient(135deg, #f9f9f9, #ffffff);
//           min-height: 100vh;
//           padding: 2rem 1rem;
//           font-family: 'Helvetica Neue', sans-serif;
//           color: #333;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//         }

//         header {
//           margin-bottom: 2rem;
//           text-align: center;
//         }

//         header h1 {
//           font-size: 2.2rem;
//           color: #333;
//           margin: 0;
//         }

//         main {
//           width: 100%;
//           max-width: 1200px;
//           display: flex;
//           justify-content: center;
//         }

//         /* Card styling with larger pie chart */
//         .card {
//           background: #fff;
//           border-radius: 12px;
//           box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
//           padding: 2rem;
//           display: flex;
//           flex-wrap: wrap;
//           gap: 2rem;
//           width: 100%;
//         }

//         .info {
//           flex: 1 1 300px;
//           min-width: 250px;
//         }

//         .info h2 {
//           font-size: 1.6rem;
//           color: #555;
//           border-bottom: 2px solid #e0e0e0;
//           padding-bottom: 0.3rem;
//           margin-bottom: 0.8rem;
//         }

//         .info ul {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }

//         .info li {
//           display: flex;
//           justify-content: space-between;
//           padding: 0.5rem 0;
//           font-size: 1rem;
//         }

//         .label {
//           font-weight: 500;
//           color: #777;
//         }

//         .value {
//           font-weight: 700;
//           color: #333;
//         }

//         /* Enlarged chart container */
//         .chart {
//           flex: 1 1 800px;
//           min-width: 500px;
//           aspect-ratio: 1;
//           position: relative;
//           background: #f9f9f9;
//           border-radius: 12px;
//           box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
//         }
//         .chart canvas {
//           position: absolute;
//           width: 100% !important;
//           height: 100% !important;
//         }

//         @media (max-width: 768px) {
//           header h1 {
//             font-size: 1.8rem;
//           }
//           .info h2 {
//             font-size: 1.4rem;
//           }
//           .chart {
//             aspect-ratio: 1;
//             min-width: 280px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@/components/button/button";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Helper function to calculate the compensation cost based on excess emissions (in tonnes)
function calculateCompensation(excess) {
  let rate;
  if (excess <= 10) {
    rate = 100;
  } else if (excess <= 50) {
    rate = 80;
  } else if (excess <= 100) {
    rate = 60;
  } else {
    rate = 40;
  }
  return excess * rate;
}

export default function EmissionsDashboard() {
  const router = useRouter();
  
  // State for emissions data (assumed returned in kilograms)
  const [emissions, setEmissions] = useState({
    flightEmissions: 0,
    fuelEmissions: 0,
    powerEmissions: 0,
    shippingEmissions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define income brackets with their corresponding exponential multipliers.
  // In this “exponential‐like” approach, we assign each bracket a fixed multiplier.
  const incomeBrackets = [
    { label: "<500k", multiplier: 1 },
    { label: "500k to 1mil", multiplier: 2 },
    { label: "1mil to 10mil", multiplier: 4 },
    { label: "10mil to 30mil", multiplier: 6 },
    { label: "30mil to 100mil", multiplier: 8 },
    { label: "100mil to 500mil", multiplier: 10 },
    { label: "500mil to 1bil", multiplier: 12 },
    { label: "above 1bil", multiplier: 15 },
  ];

  // State for selected income bracket (default to first bracket)
  const [selectedBracket, setSelectedBracket] = useState(incomeBrackets[0].label);

  // Fetch emissions data from the API endpoint
  useEffect(() => {
    async function fetchEmissions() {
      try {
        const response = await fetch("/api/Dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch emissions data");
        }
        const data = await response.json();
        setEmissions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        // Simulate a short delay for better UX
        setTimeout(() => setLoading(false), 800);
      }
    }
    fetchEmissions();
  }, []);

  // Compute total emissions (assumed in kg) and convert to tonnes
  const totalEmissionsKg =
    emissions.flightEmissions +
    emissions.fuelEmissions +
    emissions.powerEmissions +
    emissions.shippingEmissions;
  const totalEmissionsTonnes = totalEmissionsKg / 1000;

  // Set baseline sustainable target (T_base) in tonnes CO₂/year
  const T_base = 2.3;

  // Look up the multiplier for the selected income bracket
  const currentBracket = incomeBrackets.find(
    (bracket) => bracket.label === selectedBracket
  );
  const multiplier = currentBracket ? currentBracket.multiplier : 1;

  // Calculate the income-adjusted emissions threshold (in tonnes)
  const T_expected = T_base * multiplier;

  // Calculate excess emissions (if any)
  const excessEmissions = totalEmissionsTonnes > T_expected
    ? totalEmissionsTonnes - T_expected
    : 0;

  // Calculate the compensation cost for the excess emissions
  const compensationCost = calculateCompensation(excessEmissions);

  // Determine the sustainability comment
  const sustainabilityComment =
    totalEmissionsTonnes <= T_expected
      ? "Your carbon emissions are within the sustainable threshold."
      : `Your emissions exceed the sustainable threshold by ${excessEmissions.toFixed(
          2
        )} tonnes CO₂/year. Based on current offset costs, the compensation required would be approximately $${compensationCost.toFixed(
          2
        )}. This reflects the cost of counterbalancing excess emissions (e.g., via tree planting or methane treatment).`;

  // Prepare the pie chart data
  const chartData = {
    labels: ["Flight", "Fuel", "Power", "Shipping"],
    datasets: [
      {
        label: "Carbon Emissions (kg)",
        data: [
          emissions.flightEmissions,
          emissions.fuelEmissions,
          emissions.powerEmissions,
          emissions.shippingEmissions,
        ],
        backgroundColor: [
          "rgba(27, 94, 32, 0.9)",
          "rgba(76, 175, 80, 0.9)",
          "rgba(129, 199, 132, 0.9)",
          "rgba(200, 230, 201, 0.9)",
        ],
        borderColor: [
          "rgba(27, 94, 32, 1)",
          "rgba(76, 175, 80, 1)",
          "rgba(129, 199, 132, 1)",
          "rgba(200, 230, 201, 1)",
        ],
        borderWidth: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: { size: 16 },
          color: "#1B5E20",
        },
      },
      tooltip: {
        titleFont: { size: 18 },
        bodyFont: { size: 14 },
      },
    },
  };

  if (loading) return <p className="loading">Loading emissions data...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="dashboard">
      <header>
        <h1>Carbon Footprint Dashboard</h1>
      </header>

      <main>
        <section className="card">
          <div className="info">
            <h2>Emissions Summary</h2>
            <div className="total-emissions">
              <span className="label">Total Emissions:</span>
              <span className="value">{totalEmissionsTonnes.toFixed(2)} tonnes</span>
            </div>

            {/* Income Bracket Dropdown */}
            <div className="input-section">
              <label htmlFor="incomeBracket">Select Your Income Bracket:</label>
              <select
                id="incomeBracket"
                value={selectedBracket}
                onChange={(e) => setSelectedBracket(e.target.value)}
              >
                {incomeBrackets.map((bracket) => (
                  <option key={bracket.label} value={bracket.label}>
                    {bracket.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Display Threshold, Excess Emissions, and Compensation Cost */}
            <div className="threshold-info">
              <p>
                Income-adjusted emissions threshold:{" "}
                <strong>{T_expected.toFixed(2)}</strong> tonnes CO₂/year
              </p>
              <p>
                Excess emissions:{" "}
                <strong>{excessEmissions.toFixed(2)}</strong> tonnes CO₂/year
              </p>
              {excessEmissions > 0 && (
                <p>
                  Compensation cost:{" "}
                  <strong>${compensationCost.toFixed(2)}</strong>
                </p>
              )}
              <p className="sustainability-comment">{sustainabilityComment}</p>
              <p className="disclaimer">
                ⚠️ Disclaimer: These calculations are approximate and based on a simplified exponential metric and offset cost slabs.
              </p>
            </div>

            <Button
              text={"Back to Homepage"}
              onClick={() => router.push("/homePage")}
              className="w-full"
            />
            {excessEmissions>0 && (
              <Button
              text={"Payment"}
              onClick={() => router.push(`/Payment?amount=${compensationCost.toFixed(2)}`)}
              className="w-full"
            />
            )}
            
          </div>

          {/* Enlarged Pie Chart */}
          <motion.div
            className="chart-container"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <div className="chart-wrapper">
              <Pie data={chartData} options={chartOptions} />
            </div>
          </motion.div>
        </section>
      </main>

      <style jsx>{`
        .dashboard {
          background: linear-gradient(135deg, #e8f5e9, #f1f8e9);
          min-height: 100vh;
          padding: 3rem 1rem;
          font-family: "Helvetica Neue", sans-serif;
          color: #2e7d32;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
        }
        header {
          margin-bottom: 2.5rem;
          text-align: center;
          border-bottom: 2px solid #c8e6c9;
          padding-bottom: 1rem;
        }
        header h1 {
          font-size: 2.4rem;
          margin: 0;
          letter-spacing: 0.5px;
        }
        main {
          width: 100%;
          max-width: 1400px;
          display: flex;
          justify-content: center;
        }
        .card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
          padding: 3rem;
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
          width: 100%;
        }
        .info {
          flex: 1 1 300px;
          min-width: 260px;
          padding: 1rem;
        }
        .total-emissions {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          padding: 1rem;
          background: #e8f5e9;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .input-section {
          margin-top: 1rem;
        }
        label {
          font-size: 1rem;
        }
        select {
          width: 100%;
          padding: 8px;
          font-size: 1rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          margin-top: 5px;
        }
        .threshold-info {
          margin-top: 1rem;
          background: #fffde7;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        .threshold-info p {
          margin: 0.5rem 0;
          font-size: 1.1rem;
        }
        .sustainability-comment {
          font-weight: bold;
          color: ${totalEmissionsTonnes <= T_expected ? "#2e7d32" : "#d32f2f"};
        }
        .disclaimer {
          font-size: 0.9rem;
          color: #666;
          margin-top: 1rem;
        }
        .chart-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 600px;
          margin-top: 20px;
        }
        .chart-wrapper {
          width: 500px;
          height: 500px;
        }
        @media (max-width: 1024px) {
          .card {
            flex-direction: column;
            padding: 2rem;
            gap: 2rem;
          }
          .chart-wrapper {
            width: 100%;
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
}
