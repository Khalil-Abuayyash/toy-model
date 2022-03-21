import React from "react";
import H4 from "./headers/H4";
import CheckBox from "./subComponents/CheckBox";
import MSelect from "./subComponents/MSelect";
import CustomizedChart from "./CustomizedChart";

const StyledH4 = (props) => {
  return <H4 style={{ color: "#E84088" }}>{props.children}</H4>;
};

const Row = ({ label }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CheckBox label={label} />
      <MSelect isWide={true} placeholder="Choose Parameters" />
    </div>
  );
};

const Analysis = () => {
  return (
    <div style={{ width: "90%", marginLeft: "45px" }}>
      <Row label={`PV System`} />
      <Row label={`Weather Station`} />
      <Row label={`Energy Meters`} />
      <div
        style={{
          marginTop: "25px",
          height: "600px",
          width: "99%",
          marginBottom: "80px",
        }}
      >
        <CustomizedChart />
      </div>
    </div>
  );
};

export default Analysis;
