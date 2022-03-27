import React, { useEffect, useState } from "react";

import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axiosInstance from "../axios";
Chart.register(...registerables);

const GaugeChart = ({ queries = [] }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fetched, setFetched] = useState({
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100], // values of type gauge
        needleValue: 0, // query result
        backgroundColor: [
          // colors of type gauge
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
      console.log(results[0]);
      if (results.length > 0) {
        setFetched({
          labels: ["Red", "Blue", "Yellow"], // variable , colors: pallet ? depends of results length
          datasets: [
            {
              data: [2, 4, 2], // values of type gauge
              needleValue: results[0], // query result
              backgroundColor: [
                // colors of type gauge
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
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          circumference: 180,
          rotation: 270,
          cutout: "75%",
          borderWidth: 2,
          borderColor: ["white"],
          borderRadius: 10,
          // plugins: [],
          animation: {
            onComplete: function () {
              let total = this.data.datasets[0].data.reduce((a, b) => a + b, 0);
              let needleValue = this.data.datasets[0].needleValue;
              let angle = Math.PI + (1 / total) * needleValue * Math.PI;
              const ctx = this.ctx;
              const { top, bottom, right, left, width, height } =
                this.chartArea;
              let cx = width / 2;
              let cy = this._metasets[0].data[0].y;
              // // needle
              ctx.translate(cx, cy);
              ctx.rotate(angle);
              ctx.beginPath();
              ctx.moveTo(0, -2);
              ctx.lineTo((height + width) / 4, 0);
              ctx.lineTo(0, 2);
              ctx.fill();

              // // needle base
              ctx.rotate(-angle);
              ctx.translate(-cx, -cy);
              ctx.beginPath();
              ctx.arc(cx, cy, 5, 0, 10);
              ctx.fill();
              ctx.restore();
            },
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

export default GaugeChart;
