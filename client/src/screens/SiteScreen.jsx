import React, { useEffect, useRef, useState } from "react";
import { Router, navigate } from "@reach/router";
import DashboardScreen from "./DashboardScreen";

//headers
import H2 from "../components/headers/H2";
import H4 from "../components/headers/H4";

//
import ArrowBack from "../components/arrows/ArrowBack";
import DashboardsMenu from "../components/DashboardsMenu";

//
import HardwareList from "../components/HardwareList";
import Config from "../components/Config";
import Analysis from "../components/Analysis";
import axiosInstance from "../axios";

// const RefDiv = React.forwardRef((props, ref) => (
//   <Div innerRef={ref} {...props} />
// ));

const SiteScreen = ({ id }) => {
  const [site, setSite] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/user/sites/${id}`)
      .then((res) => {
        setSite(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    isLoaded && (
      <div style={{ width: "78vw" }}>
        {/*  */}
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            // marginLeft: "20px",
          }}
        >
          <ArrowBack onClick={() => navigate("/tables/home")} />
          <H2 style={{ color: "#EA3C88", marginRight: "3.8vw" }}>
            {`${site.name[0].toUpperCase()}${site.name.slice(1)}`} Site
          </H2>
          <div
            style={{
              display: "flex",
              width: "33.9vw",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <DashboardsMenu id={id} />
            <H4
              style={{ cursor: "pointer" }}
              onClick={() => navigate("analysis")}
            >
              Analysis
            </H4>
            <H4
              style={{ cursor: "pointer" }}
              onClick={() => navigate("hardware")}
            >
              Hardware List
            </H4>
            <H4
              style={{ cursor: "pointer" }}
              onClick={() => navigate("config")}
            >
              Config
            </H4>
          </div>
        </div>

        <Router>
          <DashboardScreen path="/summary" />
          <DashboardScreen path="/pv" />
          <DashboardScreen path="/weather" />
          <DashboardScreen path="/meters" />
          <Analysis path="/analysis" />
          <HardwareList path="/hardware" id={id} />
          <Config path="/config" />
        </Router>
      </div>
    )
  );
};

export default SiteScreen;
