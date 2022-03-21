import React from "react";
import { IconContext } from "react-icons";
import styles from "../../styles/icon.module.css";
import { IoIosArrowBack } from "react-icons/io";

const ArrowBack = ({ style, onClick }) => {
  return (
    <IconContext.Provider value={{ color: "#464545" }}>
      <div
        onClick={onClick}
        className={`${styles.container}`}
        style={{
          width: "fit-content",
          height: "fit-content",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
        }}
      >
        {<IoIosArrowBack style={{ ...style, width: "40px", height: "40px" }} />}
      </div>
    </IconContext.Provider>
  );
};

export default ArrowBack;
