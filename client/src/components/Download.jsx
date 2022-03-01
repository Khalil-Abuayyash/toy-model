import React from "react";
import { IconContext } from "react-icons";
import { BsDownload } from "react-icons/bs";
import styles from "../styles/icon.module.css";

const Download = () => {
  return (
    <IconContext.Provider value={{ color: "#ffffff" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "5.86%",
          height: "64px",
          backgroundColor: "#a7bb5d",
          borderRadius: "0.63vw",
          cursor: "pointer",
        }}
      >
        <BsDownload style={{ width: "30px", height: "30px" }} />
      </div>
    </IconContext.Provider>
  );
};

export default Download;
