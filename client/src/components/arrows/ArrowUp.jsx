import React from "react";
import { IconContext } from "react-icons";
import styles from "../../styles/icon.module.css";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const ArrowUp = (props) => {
  return (
    <IconContext.Provider value={{ color: "#ffffff" }}>
      <div
        onClick={props.onClick}
        className={`${styles.container}`}
        style={{
          backgroundColor: "#ea3c88",
          width: "64px",
          height: "64px",
          borderRadius: "8px",
        }}
      >
        {props.enabled ? (
          <IoIosArrowUp style={{ width: "30px", height: "30px" }} />
        ) : (
          <IoIosArrowDown style={{ width: "30px", height: "30px" }} />
        )}
      </div>
    </IconContext.Provider>
  );
};

export default ArrowUp;
