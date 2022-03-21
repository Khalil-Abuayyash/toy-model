import React from "react";

import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const GaugeChart = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        needleValue: 225,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
        // circumference: Math.PI,
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
      <Doughnut
        data={data}
        style={{ width: "100%", height: "100%" }}
        // options={options}
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
              console.log(this);
              // console.log(this.ctx);
              let total = this.data.datasets[0].data.reduce((a, b) => a + b, 0);
              let needleValue = data.datasets[0].needleValue;
              let angle = Math.PI + (1 / total) * needleValue * Math.PI;
              console.log(angle);
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
