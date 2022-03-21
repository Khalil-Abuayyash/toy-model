import React from "react";

const Path = ({ percentage = 70 }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "36px",
        borderRadius: "8px",
        backgroundImage: `linear-gradient(90deg, #e84088 0%, #e84088 ${percentage}% ,#f6f6f6 ${percentage}%,  #f6f6f6 )`,
        backgroundPosition: "0% 0%",
        backgroundSize: ` 100% 100%`,
        backgroundRepeat: " no-repeat",
        color: "#ffffff",
      }}
    >
      {percentage}%
    </div>
  );
};

export default Path;
