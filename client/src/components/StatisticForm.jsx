import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import Button from "./subComponents/Button";
import FormRow from "./subComponents/FormRow";
import Input from "./subComponents/Input";
import styles from "../styles/formContainer.module.css";
import textareaStyles from "../styles/input.module.css";
import H2 from "./headers/H2";
import H3 from "./headers/H3";
import MSelect from "./subComponents/MSelect";
import { isAdmin } from "../HOCs/AdminComponent";
import { AuthContext } from "../Context/AuthenticationContext";
import Pallets from "./Pallets";

// Charts
import DoughnutChart from "../components/DoughnutChart";
import CustomizedChart from "./CustomizedChart";
import Card from "./Card";
import BarChart from "./BarChart";
import TimeSeries from "./TimeSeries";
import GaugeChart from "./GaugeChart";
import { BsPlusCircleDotted } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";

const StatisticForm = ({ siteId }) => {
  //Query Section States
  const [queries, setQueries] = useState([
    {
      id: -1,
      text: "New Query",
    },
  ]);
  const [currentQuery, setCurrentQuery] = useState({
    id: -1,
    text: "New Query",
  });
  const [currentId, setCurrentId] = useState(-2);

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

  const [labels, setLabels] = useState("");

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

  const handleQueries = (e) => {
    setQueries(
      queries.map((query) => {
        if (query.id == currentQuery.id) {
          return { id: query.id, text: e.target.value };
        }
        return { id: query.id, text: query.text };
      })
    );
    setCurrentQuery({ text: e.target.value, id: currentQuery.id });
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

  const handleLabels = (e) => {
    setLabels(e.target.value);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/user/statistics/`, {
        name: "chart",
        type,
        x_coordinate: 0,
        y_coordinate: -1,
        height: size == "small" ? 8 : 13,
        width: size == "large" ? 12 : size == "medium" ? 6 : 3,
        pallet: color,
        labels: labels,
        dashboard_id: dashboard.id,
      })
      .then((res) => {
        queries.map((query) => {
          axiosInstance.post(`/user/queries/`, {
            column: "p",
            interval,
            text: query.text,
            statistic_id: res.data.id,
            fucntion: fn,
          });
        });

        navigate(`/tables/home/sites/${siteId}/${dashboard.name}`);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  // Rendering Chart depending on Type, Size and Colors
  const renderSwitch = (typ, siz, pallet) => {
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
        <Chart pallet={pallet} />
      </div>
    );
  };

  // Number
  const Number = ({ number, query }) => {
    return (
      <div
        onClick={() => setCurrentQuery({ id: query.id, text: query.text })}
        style={{
          width: "2.85vw",
          height: "2.85vw",
          backgroundColor: currentQuery.id == query.id ? "#ea3c88" : "#ffffff",
          color: currentQuery.id == query.id ? "#ffffff" : "#000000",
          borderRadius: "0.63vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {number}
      </div>
    );
  };

  const AddQuery = () => {
    return (
      <div
        onClick={() => {
          if (queries.length < 10) {
            setQueries([
              ...queries,
              { text: "Another New Query", id: currentId },
            ]);
            setCurrentQuery({ text: "Another New Query", id: currentId });
            setCurrentId(currentId - 1);
          }
        }}
        style={{
          width: "2.85vw",
          height: "2.85vw",
          // backgroundColor: "#ea3c88",
          // color: "#ffffff",
          borderRadius: "0.63vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <BsPlusCircleDotted style={{ width: "50%", height: "50%" }} />
      </div>
    );
  };

  const deleteQuery = (id) => {
    if (queries.length > 1) {
      const nextQueries = queries.filter((query) => {
        return query.id != currentQuery.id;
      });
      setQueries(nextQueries);
      setCurrentQuery(nextQueries[nextQueries.length - 1]);
    }
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
      <FormRow style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: "16px", right: "2.9%" }}>
          <IoIosCloseCircleOutline
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
            onClick={deleteQuery}
          />
        </div>
        <textarea
          className={`${textareaStyles.default} ${textareaStyles.input} ${textareaStyles.wide}`}
          placeholder="Query"
          style={{ height: "25.4vh", resize: "none" }}
          onChange={handleQueries}
          value={currentQuery.text}
        />
      </FormRow>
      {/* Choosing Query, Adding Query */}
      <FormRow>
        <div
          style={{
            background: "white",
            width: "98%",
            height: "80px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {queries.map((query, idx) => {
            return <Number key={idx} number={idx + 1} query={query} />;
          })}
          <AddQuery />
        </div>
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
      <FormRow>
        <Input
          isWide={true}
          className="input"
          placeholder="Labels: dataset1, dataset2"
          value={labels}
          onChange={handleLabels}
        />
      </FormRow>
      <FormRow>
        <Pallets pallet={color} />
      </FormRow>
      <FormRow
        style={{
          width: "98%",
          margin: "20px 0px",
          justifyContent: "center",
        }}
      >
        {renderSwitch(type, size, color)}
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
