import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
  // Tooltip
  // Legend
);

const options = {
  responsive: true,
  plugins: { legend: false },
  tension: 0.4,
  scales: {
    x: {
      ticks: {
        display: false,
        // callback: function (value, index, ticks) {
        //   return value;
        // },
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        display: false,
        grid: {
          drawBorder: false,
        },
        // callback: function (value, index, ticks) {
        //   return value;
        // },
      },
    },
  },
};

const LineChart = () => {
  const [fetched, setFetched] = useState({
    labels: [],
    datasets: [
      {
        label: "Dataset 1",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 0,
      },
    ],
  });

  // useEffect(() => {
  //   axios.get("http://localhost:8000/").then((res) => {
  //     setFetched({
  //       ...fetched,
  //       labels: res.data.map((row) => row["created_at"].slice(11, 16)),
  //       datasets: [
  //         { ...fetched.datasets[0], data: res.data.map((row) => row["power"]) },
  //       ],
  //     });
  //   });
  // }, []);

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
      ],
      datasets: [
        {
          ...fetched.datasets[0],
          data: [
            65, 59, 80, 81, 65, 59, 80, 81, 65, 59, 80, 81, 65, 59, 80, 81,
          ],
        },
      ],
    });
  }, []);

  return (
    <div>
      <Line
        style={{ width: "100%", height: "100%" }}
        options={options}
        data={fetched}
      />
    </div>
  );
};

export default LineChart;
