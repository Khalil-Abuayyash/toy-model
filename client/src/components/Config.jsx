import { navigate } from "@reach/router";
import React from "react";

import Button from "./subComponents/Button";
import Input from "./subComponents/Input";

const P = ({ text }) => {
  return <p style={{ fontSize: "21px", fontWeight: "bold" }}>{text}</p>;
};

const Row = ({ buttonTitle }) => {
  return (
    <div>
      <Button
        title={buttonTitle}
        style={{ marginRight: "30px", width: "16vw" }}
      />
      <Input className={"input"} isWide={true} placeholder="Parameters" />
    </div>
  );
};

const Config = ({ id }) => {
  return (
    <div
      style={{ boxSizing: "border-box", paddingLeft: "45px", width: "100%" }}
    >
      <P text="Statistic" />
      <Button
        onClick={() => navigate(`/forms/statistics/create/${id}`)}
        title="Add Statistic"
      />
      <hr
        style={{
          // backgroundColor: "#EA3C88",
          borderTop: "1px solid #464545",
          opacity: " 0.43",
          // height: "0px",
        }}
      />
      <P text="Interval" />
      <Row buttonTitle="Summary" />
      <Row buttonTitle="PV System" />
      <Row buttonTitle="Weather Station" />
      <Row buttonTitle="Energy Meters" />
    </div>
  );
};

export default Config;
