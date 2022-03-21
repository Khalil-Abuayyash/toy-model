import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../axios";

// dashboards
import CustomizedChart from "../components/CustomizedChart";
import Dashboard from "../components/Dashboard";
import Card from "../components/Card";

// inputs
import MSelect from "../components/subComponents/MSelect";
import Input from "../components/subComponents/Input";

//icons
import BigIcon from "../components/arrows/BigIcon";
import { BsMegaphone } from "react-icons/bs";
import { BsClockHistory } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import TimeSeries from "../components/TimeSeries";
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import GaugeChart from "../components/GaugeChart";

// const RefDiv = React.forwardRef((props, ref) => (
//   <Div innerRef={ref} {...props} />
// ));

const DashboardScreen = ({ id }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [site, setSite] = useState({ dashboards: [] });
  const [dashboard, setDasboard] = useState({ statistics: [] });
  const [dashboards, setDasboards] = useState([]);
  const [layout, setLayout] = useState([]);

  const [dashType, setDashType] = useState(
    window.location.href.split("/").pop()
  );

  const isInitialMount = useRef(true);

  useEffect(() => {
    // defining fetch data
    const fetchData = async () => {
      const fetchedSite = await axiosInstance.get(`/user/sites/${id}/`);
      setSite(fetchedSite.data);

      const fetchedDashboards = await axiosInstance.get(
        `/user/dashboards?search=${id}`
      );
      setDasboards(fetchedDashboards.data.results);

      const filteredDashboards = fetchedDashboards.data.results.filter(
        (dashboard) => {
          return dashboard.name === dashType;
        }
      );

      let filteredDashboard = { statistics: [] };
      if (filteredDashboards.length === 1) {
        filteredDashboard = filteredDashboards[0];
      }

      setLayout(
        filteredDashboard.statistics.map((statistic) => {
          console.log(typeof statistic.x_coordinate);
          return {
            x: statistic.x_coordinate,
            y: statistic.y_coordinate,
            w: statistic.width,
            h: statistic.height,
            i: statistic.id + "",
            moved: false,
            static: false,
          };
        })
      );
      setDasboard(filteredDashboard);
      setIsLoaded(true);
    };

    // calling fetch data
    fetchData();
  }, [id]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const type = window.location.href.split("/").pop();
      setDashType(type);

      const filteredDashboards = dashboards.filter((dashboard) => {
        return dashboard.name === type;
      });

      let filteredDashboard = { statistics: [] };
      if (filteredDashboards.length === 1) {
        filteredDashboard = filteredDashboards[0];
      }
      setDasboard(filteredDashboard);

      setLayout(
        filteredDashboard.statistics.map((statistic) => {
          return {
            x: statistic.x_coordinate,
            y: statistic.y_coordinate,
            w: statistic.width,
            h: statistic.height,
            i: statistic.id + "",
            moved: false,
            static: false,
          };
        })
      );
    }
  }, [window.location.href]);

  const layouts = [
    {
      w: 4,
      h: 11,
      x: 0,
      y: 15,
      i: "10",
      moved: false,
      static: false,
    },
    {
      w: 6,
      h: 11,
      x: 4,
      y: 15,
      i: "11",
      moved: false,
      static: false,
    },
    {
      w: 5,
      h: 11,
      x: 0,
      y: 26,
      i: "12",
      moved: false,
      static: false,
    },
    {
      w: 5,
      h: 11,
      x: 5,
      y: 26,
      i: "13",
      moved: false,
      static: false,
    },
  ];

  return (
    <div style={{ width: "100%", marginLeft: "25px" }}>
      {(isLoaded && dashType === "summary") ||
      dashType === "weather" ||
      dashType === "meters" ||
      dashType === "pv" ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: "15px",
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <MSelect placeholder="Interval" isThird={true} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <BigIcon Icon={BsMegaphone} isClicked={true} />
              <BigIcon Icon={CgNotes} isClicked={true} />
              <BigIcon Icon={BsClockHistory} isClicked={true} />
            </div>
          </div>
          <Dashboard layout={[...layout, ...layouts]}>
            {isLoaded &&
              dashboard.statistics.map((statistic) => {
                return statistic.type === "card" ? (
                  <div style={{ padding: "5px" }} key={statistic.id}>
                    <Card />
                  </div>
                ) : statistic.type === "line" ? (
                  <div style={{ padding: "5px" }} key={statistic.id}>
                    <CustomizedChart />
                  </div>
                ) : null;
              })}
            <div key="10">
              <GaugeChart />
            </div>
            <div key="11">
              <TimeSeries />
            </div>
            <div key="12">
              <BarChart />
            </div>
            <div key="13">
              <DoughnutChart />
            </div>
          </Dashboard>
        </>
      ) : null}
    </div>
  );
};

export default DashboardScreen;
