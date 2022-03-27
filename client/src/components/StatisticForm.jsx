import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import Button from "./subComponents/Button";
import FormRow from "./subComponents/FormRow";
import styles from "../styles/formContainer.module.css";
import textareaStyles from "../styles/input.module.css";
import H2 from "./headers/H2";
import H3 from "./headers/H3";
import MSelect from "./subComponents/MSelect";
import { isAdmin } from "../HOCs/AdminComponent";
import { AuthContext } from "../Context/AuthenticationContext";

// Charts
import DoughnutChart from "../components/DoughnutChart";
import CustomizedChart from "./CustomizedChart";
import Card from "./Card";
import BarChart from "./BarChart";
import TimeSeries from "./TimeSeries";
import GaugeChart from "./GaugeChart";

const StatisticForm = ({ siteId }) => {
  //Query Section States
  const [query, setQuery] = useState("");

  const [colName, setColName] = useState("");
  const [cols, setCols] = useState([]);

  const [fn, setFn] = useState("");
  const [functions] = useState(
    ["max", "avg", "min"].map((name) => ({
      value: name,
      label: name,
    }))
  );

  const [interval, setInterval] = useState("");
  const [intervals, setIntervals] = useState([]);

  const [dashboard, setDashboard] = useState("");
  const [dashboards, setDashboards] = useState([]);

  // Design Section States
  const [color, setColor] = useState("pallet1");
  const [type, setType] = useState("card");
  const [size, setSize] = useState("large");

  const [types] = useState(
    ["card", "line", "time series", "bar", "doughnut", "gauge"].map((name) => ({
      value: name,
      label: name,
    }))
  );

  const [colors] = useState(
    ["pallet1", "pallet2", "pallet3", "pallet4"].map((name) => ({
      value: name,
      label: name,
    }))
  );

  const [sizes] = useState(
    ["small", "medium", "large"].map((name) => ({
      value: name,
      label: name,
    }))
  );

  //Context
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDashboards = await axiosInstance.get(
        `/user/dashboards?search=${siteId}`
      );
      setDashboards(fetchedDashboards.data.results);

      const filteredDashboards = fetchedDashboards.data.results.filter(
        (dashboard) => {
          return dashboard.name === "summary";
        }
      );
      let filteredDashboard = {
        intervals: "qw,qe,rt",
        parameters: [
          { label: "P", value: "p" },
          { label: "V", value: "v" },
        ],
        name: "No Dashboards",
        id: 0,
      };
      if (filteredDashboards.length === 1) {
        filteredDashboard = filteredDashboards[0];
      }

      setDashboard(filteredDashboard);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (!isAdmin(user.role.name)) {
  //     navigate("/users");
  //   }
  // }, [user]);

  // Handlers
  const handleDashboard = (e) => {
    let ints = e.intervals.split(",").map((interval) => {
      return { label: interval, value: interval };
    });

    setDashboard(e);
    setIntervals(ints);
    setCols(e.parameters);
  };

  const handleCol = (e) => {
    setColName(e.value);
  };
  const handleInterval = (e) => {
    setInterval(e.value);
  };
  const handleFunction = (e) => {
    setFn(e.value);
  };
  const handleQuery = (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  };

  const handleType = (e) => {
    setType(e.value);
  };

  const handleColor = (e) => {
    setColor(e.value);
  };

  const handleSize = (e) => {
    setSize(e.value);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/user/statistics/`, {
        name: "chart",
        type,
        x_coordinate: 0,
        y_coordinate: 27,
        height: size == "small" ? 8 : 13,
        width: size == "large" ? 12 : size == "medium" ? 6 : 3,
        dashboard_id: dashboard.id,
      })
      .then((res) => {
        axiosInstance.post(`/user/queries/`, {
          column: "p",
          interval,
          text: query,
          statistic_id: res.data.id,
          fucntion: fn,
        });
        navigate(`/tables/home/sites/${siteId}/${dashboard.name}`);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  // Rendering Chart depending on Type, Size and Colors
  const renderSwitch = (typ, siz) => {
    let Chart;
    switch (typ) {
      case "card":
        Chart = Card;
        break;
      case "line":
        Chart = CustomizedChart;
        break;
      case "bar":
        Chart = BarChart;
        break;
      case "time series":
        Chart = TimeSeries;
        break;
      case "gauge":
        Chart = GaugeChart;
        break;
      case "doughnut":
        Chart = DoughnutChart;
        break;
    }
    return (
      <div
        style={{
          width: "fit-content",
          height: siz == "small" ? "250px" : "500px",
          width: siz == "large" ? "100%" : siz == "medium" ? "60%" : "30%",
        }}
      >
        <Chart />
      </div>
    );
  };

  // Rendering
  return (
    <div className={styles.container}>
      <H2 style={{ fontWeight: "600", marginTop: "0px" }}>Add Statistic</H2>

      {/* Start Query Section */}
      <H3 style={{ fontWeight: "600" }}>Query</H3>
      {/* <form onSubmit={handleSubmit}> */}
      <FormRow>
        <MSelect
          isMulti={false}
          options={dashboards}
          placeholder="Dashboard"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          selected={dashboard}
          setSelected={handleDashboard}
          isWide={true}
        />
      </FormRow>
      <FormRow>
        <MSelect
          isMulti={false}
          options={cols}
          placeholder="Col Name"
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          selected={colName}
          setSelected={handleCol}
          isThird={true}
        />
        <MSelect
          isMulti={false}
          options={intervals}
          placeholder="Interval"
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          selected={interval}
          setSelected={handleInterval}
          isThird={true}
        />
        <MSelect
          isMulti={false}
          options={functions}
          placeholder="Function"
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          selected={fn}
          setSelected={handleFunction}
          isThird={true}
        />
      </FormRow>
      <FormRow>
        <textarea
          className={`${textareaStyles.default} ${textareaStyles.input} ${textareaStyles.wide}`}
          placeholder="Query"
          style={{ height: "25.4vh", resize: "none" }}
          onChange={handleQuery}
          value={query}
        />
      </FormRow>
      {/* End Query Section */}

      {/* Start Design Section */}
      <H3 style={{ fontWeight: "600", marginTop: "70px" }}>
        Design & Preview Section
      </H3>
      <FormRow>
        <MSelect
          isMulti={false}
          options={types}
          placeholder="Chart Type"
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          selected={type}
          setSelected={handleType}
          isThird={true}
        />
        <MSelect
          isMulti={false}
          options={colors}
          placeholder="Colors"
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          selected={color}
          setSelected={handleColor}
          isThird={true}
        />
        <MSelect
          isMulti={false}
          options={sizes}
          placeholder="Size"
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          selected={size}
          setSelected={handleSize}
          isThird={true}
        />
      </FormRow>
      <FormRow
        style={{
          width: "98%",
          margin: "20px 0px",
          justifyContent: "center",
        }}
      >
        {renderSwitch(type, size)}
      </FormRow>
      {/* End Design Section */}

      {/* Start Buttons */}
      <FormRow>
        <Button
          style={{
            backgroundColor: "#f6f6f6",
            color: "#ea3c88",
            border: " 2px solid #EA3C88",
            width: "98%",
          }}
          title="Cancel"
          isWide={true}
          onClick={() => navigate(`/tables/home/sites/${siteId}/config`)}
        />
      </FormRow>
      <FormRow>
        <Button
          style={{
            width: "98%",
          }}
          isWide={true}
          title="Save"
          disabled={false}
          onClick={handleSubmit}
        />
      </FormRow>
      {/* End Buttons */}
      {/* </form> */}
    </div>
  );
};

export default StatisticForm;
