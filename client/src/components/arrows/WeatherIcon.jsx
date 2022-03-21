import React from "react";
import { IconContext } from "react-icons";
import { TiWeatherSunny } from "react-icons/ti";

const WeatherIcon = ({ style, onClick }) => {
  return (
    <IconContext.Provider value={{ color: "#E84088" }}>
      <TiWeatherSunny
        style={{
          ...style,
          width: "30px",
          height: "30px",
        }}
        onClick={onClick}
      />
    </IconContext.Provider>
  );
};

export default WeatherIcon;
