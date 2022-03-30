import React, { useState, useEffect } from "react";

import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axiosInstance from "../axios";
import pallets from "../utils/pallets";
Chart.register(...registerables);

const DoughnutChart = ({
  queries = [
    { text: "select * from organization;" },
    { text: "select * from statistic;" },
  ],
  pallet = "pallet1",
  labels = "",
}) => {
  const [isLoaded, setIsLoaded] = useState();
  const [fetched, setFetched] = useState({
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      let results = queries.map(async (query) => {
        let res = await axiosInstance.post(`/qudra`, { query: query.text });
        res = res.data; // res is array of one object
        res = Object.keys(res[0]).map((key) => {
          return res[0][key]; // returning the only value conatined in object
        });
        // res is an array of the value
        return res[0];
      });
      results = await Promise.all(results);
      if (results.length > 0) {
        setFetched({
          labels: labels.split(","), // variable , colors: pallet ? depends of results length
          datasets: [
            {
              data: results,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              hoverOffset: 4,
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
          backgroundColor: queries.map((query, idx) => {
            return pallets[pallet][idx];
          }),
          borderColor: "white" || pallets[pallet][14],
        },
      ],
    });
  }, [pallet]);

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
      <Doughnut
        data={fetched}
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

export default DoughnutChart;
