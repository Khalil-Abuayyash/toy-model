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
  LineElement,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  //   plugins: { legend: false },
  tension: 0.4,
  scales: {
    x: {
      //   ticks: {
      //     display: false,
      //     // callback: function (value, index, ticks) {
      //     //   return value;
      //     // },
      //   },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        // display: false,
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

const TimeSeries = () => {
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
      {
        label: "Dataset 2",
        data: [],
        borderColor: "#4D57A9",
        backgroundColor: "#4D57A9",
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
        {
          ...fetched.datasets[1],
          data: [
            70, 71, 72, 85, 88, 90, 130, 135, 140, 80, 75, 70, 70, 69, 68, 67,
          ],
        },
      ],
    });
  }, []);

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
      <Line
        style={{ width: "100%", height: "100%" }}
        options={options}
        data={fetched}
      />
    </div>
  );
};

export default TimeSeries;
