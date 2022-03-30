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
import axiosInstance from "../axios";
import pallets from "../utils/pallets";

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

const CustomizedChart = ({
  innerRef,
  queries = [],
  pallet = "pallet1",
  labels = "",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fetched, setFetched] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "June",
      "July",
      "Aug",
    ],
    datasets: [
      {
        label: labels ? labels : "Dataset 1",
        data: [
          65, 59, 80, 81, 65, 59, 80, 81, 65, 59, 80, 81, 65, 59, 80, 81, 65,
          59, 80, 81,
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "#E84088",
        pointRadius: 5,
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      let results = queries.map(async (query) => {
        let res = await axiosInstance.post(`/qudra`, { query: query.text });
        res = res.data;
        let xData = res.map((row) => row["name"]); // time, x-axis, labels
        let yData = res.map((row) => row["id"]); // variable, y-axis
        return { xData, yData };
      });
      results = await Promise.all(results);
      if (results.length > 0) {
        setFetched({
          ...fetched,
          labels: results[0].xData,
          datasets: [
            {
              ...fetched.datasets[0],
              data: results[0].yData,
              backgroundColor: pallets[pallet][0] || `#E84088`,
              borderColor: pallets[pallet][1] || "rgb(255, 99, 132)",
            },
          ],
        });
      }
      setIsLoaded(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFetched({
      ...fetched,
      datasets: [
        {
          ...fetched.datasets[0],
          backgroundColor: pallets[pallet][0] || `#E84088`,
          borderColor: pallets[pallet][1] || "rgb(255, 99, 132)",
        },
      ],
    });
  }, [pallet]);

  return (
    isLoaded && (
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
    )
  );
};

export default CustomizedChart;
