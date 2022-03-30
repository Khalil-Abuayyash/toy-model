import { flexbox } from "@mui/system";
import React, { useEffect } from "react";
import pallets from "../utils/pallets";

const ColorBox = ({ color }) => {
  return (
    <div
      style={{
        height: "72%",
        width: "6%",
        backgroundColor: color,
        margin: "auto 5px",
        borderRadius: "8px",
      }}
    ></div>
  );
};

const Pallets = ({ pallet = "pallet1" }) => {
  useEffect(() => {}, [pallet]);

  return (
    <div
      style={{
        width: "98%",
        margin: "20px 0px",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: "8px",
        height: "90px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",
        boxSizing: "border-box",
      }}
    >
      {pallets[`${pallet}`].map((color) => {
        return <ColorBox key={color} color={color} />;
      })}
    </div>
  );
};

export default Pallets;
