import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import pallets from "../utils/pallets";

const Card = ({ queries = [], pallet = "pallet1", labels = "" }) => {
  const [data, setData] = useState("187,500");
  const [text, setText] = useState("Expected Power Of");

  useEffect(() => {
    // console.log(queries);
    queries.map((query) => {
      axiosInstance
        .post(`/qudra`, { query: query.text })
        .then((res) => {
          console.log(res.data);
          if (typeof res.data == "object" || typeof res.data == "array") {
            setData("Wrong Query:");
          } else {
            setData(res.data);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });
  }, []);

  return (
    <div
      style={{
        // minWidth: "fit-content",
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        boxShadow: "0px 10px 30px #D1D5DF80",
        // padding: " 20px",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg viewBox="0 0 240 80">
        <style></style>

        <text
          x="10"
          y="20"
          fill={pallets[pallet][0] || `#858997`}
          style={{
            fontSize: "100%",
            fontWeight: "normal",
            fontFamily: "Roboto",
          }}
        >
          {/* {text} */}
          {labels ? labels : text}
        </text>
        <text
          x="10"
          y="70"
          fill={pallets[pallet][5] || `#E84088`}
          style={{ fontSize: "230%", fontWeight: "bold", fontFamily: "Roboto" }}
        >
          {data}
        </text>
      </svg>
      {/* 
      <span
        style={{
          fontWeight: "bold",
          fontSize: `10px`,
        }}
      >
        Expected Power Of
      </span>
      <span style={{ fontWeight: "bold", fontSize: "36px" }}>187,500</span> */}
    </div>
  );
};

export default Card;
