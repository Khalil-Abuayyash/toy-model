import React from "react";

const Card = () => {
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
          fill="#858997"
          style={{
            fontSize: "100%",
            fontWeight: "normal",
            fontFamily: "Roboto",
          }}
        >
          Expected Power Of
        </text>
        <text
          x="10"
          y="70"
          fill="#E84088"
          style={{ fontSize: "230%", fontWeight: "bold", fontFamily: "Roboto" }}
        >
          187,500
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
