import React from "react";
import { IconContext } from "react-icons";
import styles from "../../styles/icon.module.css";
import { IoIosArrowBack } from "react-icons/io";

const ArrowBack = (props) => {
  return (
    <IconContext.Provider value={{ color: "#464545" }}>
      <div
        onClick={props.onClick}
        className={`${styles.container}`}
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "8px",
        }}
      >
        {<IoIosArrowBack style={{ width: "40px", height: "40px" }} />}
      </div>
    </IconContext.Provider>
  );
};

export default ArrowBack;
