import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../axios";

// dashboards
import Dashboard from "../components/Dashboard";

// inputs
import MSelect from "../components/subComponents/MSelect";
import Input from "../components/subComponents/Input";

//icons
import BigIcon from "../components/arrows/BigIcon";
import { BsMegaphone } from "react-icons/bs";
import { BsClockHistory } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { FiSave } from "react-icons/fi";

// charts
import Card from "../components/Card";
import CustomizedChart from "../components/CustomizedChart";
import TimeSeries from "../components/TimeSeries";
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import GaugeChart from "../components/GaugeChart";

// threeDots (menu)
import StatisticEditingMenu from "../components/StatisticEditingMenu";

// const RefDiv = React.forwardRef((props, ref) => (
//   <Div innerRef={ref} {...props} />
// ));

const DashboardScreen = ({ id, dashType, site }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  // const [site, setSite] = useState({ dashboards: [] });
  const [dashboard, setDasboard] = useState({ statistics: [] });
  // const [dashboards, setDasboards] = useState([]);
  const [layout, setLayout] = useState([]);
  // const isInitialMount = useRef(true);

  useEffect(() => {
    // defining fetch data
    const fetchData = async () => {
      // const fetchedSite = await axiosInstance.get(`/user/sites/${id}/`);
      // setSite(fetchedSite.data);
      // console.log(fetchedSite.data);
      // const fetchedDashboards = await axiosInstance.get(
      //   `/user/dashboards?search=${id}`
      // );
      // console.log(fetchedDashboards);
      // console.log(dashType);
      const filteredDashboards = site.dashboards.filter((dashboard) => {
        if (dashType == "pv system") {
          return dashboard.name === "pv";
        } else if (dashType == "weather station") {
          return dashboard.name === "weather";
        } else if (dashType == "energy meters") {
          return dashboard.name === "meters";
        } else if (dashType == "summary") {
          return dashboard.name === "summary";
        }
      });
      console.log(filteredDashboards);
      let filteredDashboard = { statistics: [] };
      if (filteredDashboards.length === 1) {
        filteredDashboard = filteredDashboards[0];
      }
      let l = filteredDashboard.statistics.map((statistic) => {
        return {
          x: statistic.x_coordinate,
          y: statistic.y_coordinate,
          w: statistic.width,
          h: statistic.height,
          i: statistic.id + "",
          moved: false,
          static: false,
        };
      });

      // setDasboards(fetchedDashboards.data.results);
      setLayout(l);
      setDasboard(filteredDashboard);
      setIsLoaded(true);
    };

    // calling fetch data
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     const type = window.location.href.split("/").pop();
  //     setDashType(type);

  //     const filteredDashboards = dashboards.filter((dashboard) => {
  //       return dashboard.name === type;
  //     });

  //     let filteredDashboard = { statistics: [] };
  //     if (filteredDashboards.length === 1) {
  //       filteredDashboard = filteredDashboards[0];
  //     }
  //     setDasboard(filteredDashboard);

  //     setLayout(
  //       filteredDashboard.statistics.map((statistic) => {
  //         return {
  //           x: statistic.x_coordinate,
  //           y: statistic.y_coordinate,
  //           w: statistic.width,
  //           h: statistic.height,
  //           i: statistic.id + "",
  //           moved: false,
  //           static: false,
  //         };
  //       })
  //     );
  //   }
  // }, [window.location.href]);

  const saveLayout = () => {
    layout.forEach((element) => {
      axiosInstance
        .patch(`/user/statistics/${+element.i}/`, {
          x_coordinate: element.x,
          y_coordinate: element.y,
          width: element.w,
          height: element.h,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const onDelete = (id) => {
    axiosInstance
      .delete(`/user/statistics/${id}/`)
      .then((res) => {
        setDasboard({
          ...dashboard,
          statistics: dashboard.statistics.filter((statistic) => {
            return statistic.id != id;
          }),
        });
      })
      .catch((err) => {});
  };

  return (
    <div style={{ width: "100%", marginLeft: "25px" }}>
      {(dashType === "summary" ||
        dashType === "weather station" ||
        dashType === "energy meters" ||
        dashType === "pv system") &&
      isLoaded ? (
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
              <BigIcon onClick={saveLayout} Icon={FiSave} isClicked={true} />
            </div>
          </div>
          <Dashboard layout={[...layout]} setLayout={setLayout}>
            {dashboard.statistics.map((statistic) => {
              // console.log(statistic);
              return statistic.type === "card" ? (
                <div style={{ padding: "5px" }} key={statistic.id}>
                  <StatisticEditingMenu
                    onDelete={() => onDelete(statistic.id)}
                    id={statistic.id}
                  />
                  <Card
                    queries={statistic.queries}
                    pallet={statistic.pallet.toLowerCase()}
                    labels={statistic.labels}
                  />
                </div>
              ) : statistic.type === "line" ? (
                <div style={{ padding: "5px" }} key={statistic.id}>
                  <StatisticEditingMenu
                    onDelete={() => onDelete(statistic.id)}
                    id={statistic.id}
                  />
                  <CustomizedChart
                    queries={statistic.queries}
                    pallet={statistic.pallet.toLowerCase()}
                    // labels={statistic.labels}
                    labels={statistic.labels}
                  />
                </div>
              ) : statistic.type === "time series" ? (
                <div style={{ padding: "5px" }} key={statistic.id}>
                  <StatisticEditingMenu
                    onDelete={() => onDelete(statistic.id)}
                    id={statistic.id}
                  />
                  <TimeSeries
                    queries={statistic.queries}
                    pallet={statistic.pallet.toLowerCase()}
                    labels={statistic.labels}
                  />
                </div>
              ) : statistic.type === "gauge" ? (
                <div style={{ padding: "5px" }} key={statistic.id}>
                  <StatisticEditingMenu
                    onDelete={() => onDelete(statistic.id)}
                    id={statistic.id}
                  />
                  <GaugeChart
                    queries={statistic.queries}
                    pallet={statistic.pallet.toLowerCase()}
                    labels={statistic.labels}
                  />
                </div>
              ) : statistic.type === "bar" ? (
                <div style={{ padding: "5px" }} key={statistic.id}>
                  <StatisticEditingMenu
                    onDelete={() => onDelete(statistic.id)}
                    id={statistic.id}
                  />
                  <BarChart
                    queries={statistic.queries}
                    pallet={statistic.pallet.toLowerCase()}
                    labels={statistic.labels}
                  />
                </div>
              ) : statistic.type === "doughnut" ? (
                <div style={{ padding: "5px" }} key={statistic.id}>
                  <StatisticEditingMenu
                    onDelete={() => onDelete(statistic.id)}
                    id={statistic.id}
                  />
                  <DoughnutChart
                    queries={statistic.queries}
                    pallet={statistic.pallet.toLowerCase()}
                    labels={statistic.labels}
                  />
                </div>
              ) : null;
            })}
          </Dashboard>
        </>
      ) : null}
    </div>
  );
};

export default DashboardScreen;
