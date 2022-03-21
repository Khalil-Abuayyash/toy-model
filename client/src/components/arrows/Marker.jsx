import React from "react";
import { IconContext } from "react-icons";
import { HiLocationMarker } from "react-icons/hi";
import styles from "../../styles/icon.module.css";

const Marker = ({ current, onClick, Icon, isClicked, style }) => {
  return (
    <IconContext.Provider value={{ color: "#E84088" }}>
      <HiLocationMarker
        style={{
          ...style,
          width: "50px",
          height: "50px",
          cursor: "pointer",
          zIndex: 1,
        }}
        onClick={onClick}
      />
    </IconContext.Provider>
  );
};

export default Marker;
