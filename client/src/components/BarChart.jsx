import React from "react";
import { Bar } from "react-chartjs-2";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const BarChart = () => {
  const state = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [-65, 59, 80, 81, 56],
      },
    ],
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        boxShadow: "0px 10px 30px #D1D5DF80",
        padding: "20px",
        borderRadius: "20px",
        boxSizing: "border-box",
      }}
    >
      <Bar
        data={state}
        style={{ width: "100%", height: "100%" }}
        // options={options}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export default BarChart;
