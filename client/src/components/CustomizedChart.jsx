import React, { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const options = {
  fill: true,
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: true },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        grid: {
          drawBorder: false,
        },
        // callback: function (value, index, ticks) {
        //   return value;
        // },
      },
    },
  },
  // tension: 0.4,
};

const CustomizedChart = ({ innerRef }) => {
  const [fetched, setFetched] = useState({
    labels: [],
    datasets: [
      {
        label: "Dataset 1",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "#E84088",
        pointRadius: 5,
        fill: true,
      },
    ],
  });

  useEffect(() => {
    setFetched({
      ...fetched,
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "April",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      datasets: [
        {
          ...fetched.datasets[0],
          data: [
            65, 59, 80, 81, 65, 59, 80, 81, 65, 59, 80, 81, 65, 59, 80, 81, 65,
            59, 80, 81,
          ],
        },
      ],
    });
  }, []);

  return (
    <div
      // ref={innerRef}
      style={{
        // resize: "both",
        // overflow: "auto",
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        boxShadow: "0px 10px 30px #D1D5DF80",
        // padding: "20px 0px",
        padding: "20px",
        borderRadius: "20px",
        boxSizing: "border-box",
      }}
    >
      <Line
        style={{ width: "100%", height: "100%" }}
        options={options}
        data={fetched}
      />
    </div>
  );
};

export default CustomizedChart;
