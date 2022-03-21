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
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
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
      labels: ["Jan", "Feb", "Mar", "April"],
      datasets: [{ ...fetched.datasets[0], data: [65, 59, 80, 81] }],
    });
  }, []);

  return (
    <div>
      <Line options={options} data={fetched} />
    </div>
  );
};

export default LineChart;
