import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import { Chart, registerables } from "chart.js";
import axiosInstance from "../axios";
Chart.register(...registerables);

const BarChart = ({ queries = [] }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fetched, setFetched] = useState({
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
  });

  useEffect(() => {
    const executeQueries = async () => {
      let q = [
        "select * from statistic",
        "select * from statistic",
        "select * from statistic",
        "select * from statistic",
      ];
      let results = queries.map(async (query) => {
        let result = await axiosInstance.post(`/qudra`, {
          query: query.text,
        });
        return result.data;
      });
      results = await Promise.all(results); // results of queries, array of arrays
      // console.log(results);

      let xData = [];
      if (results.length > 0) {
        // x-axis, labels, instead of name it would be time
        xData = results[0].map((row) => row["name"]);
      }
      let datasets = [];
      results.map((result, idx) => {
        // result is an array
        let yData = result.map((row) => row["id"] * (idx + 1)); // y-axis, instead of id, it would be colName
        datasets.push({
          label: `Dataset ${idx}`, // variable
          borderColor: `rgb(${idx * 60}, ${idx * 60}, 132)`, // variable
          backgroundColor: `rgba(${idx * 60}, ${idx * 60}, 132, 0.5)`, // variable
          pointRadius: 0,
          data: yData,
        });
      });

      if (queries.length > 0) {
        setFetched({
          labels: xData,
          datasets: datasets,
        });
      }
      setIsLoaded(true);
    };

    executeQueries();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let results = queries.map(async (query) => {
  //       let res = await axiosInstance.post(`/qudra`, { query: query.text });
  //       res = res.data;
  //       let xData = res.map((row) => row["name"]); // time, x-axis, labels
  //       let yData = res.map((row) => row["id"]); // variable, y-axis
  //       return { xData, yData };
  //     });
  //     results = await Promise.all(results);
  //     if (results.length > 0) {
  //       setFetched({
  //         ...fetched,
  //         labels: results[0].xData,
  //         datasets: [
  //           {
  //             ...fetched.datasets[0],
  //             data: results[0].yData,
  //           },
  //         ],
  //       });
  //     }
  //     setIsLoaded(true);
  //   };
  //   fetchData();
  // }, []);

  return (
    isLoaded && (
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
    )
  );
};

export default BarChart;
