import React, { useEffect, useState } from "react";
import TableRow from "./subComponents/TableRow";
import TableCell from "./subComponents/TableCell";
import styles from "../styles/table.module.css";
// import { navigate } from "@reach/router";
import WeatherIcon from "./arrows/WeatherIcon";
import Search from "./Search";
import Download from "./Download";
import MSelect from "./subComponents/MSelect";
import axiosInstance from "../axios";

const HardwareList = ({ id }) => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [site, setSite] = useState({});
  const [things, setThings] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        console.log(id);
        console.log("id");
      }
      let siteRes;
      try {
        siteRes = await axiosInstance.get(`/user/sites/${id}`);
        console.log(siteRes.data.things);
        setThings(siteRes.data.things);
      } catch {
        setNotFound(true);
      }
    };
    setTableHeaders([
      "ID",
      "Type",
      "Hardware Name",
      "Key Indicator",
      "Last Reported",
      "Status",
      "Alert",
    ]);
    fetchData();
  }, []);

  return (
    <div>
      <div
        // containing search , add button
        style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "space-between",
          alignItems: "center",
          width: "79.9vw",
        }}
      >
        <Search
          // search={search}
          // handleSearch={handleSearch}
          placeholder="Search ( ID , Name )"
        />
        <MSelect
          overTable={true}
          placeholder="Device Type"
          options={[
            { label: "", value: "" },
            { label: "", value: "" },
            { label: "", value: "" },
            { label: "", value: "" },
          ]}
        />
        <Download />
      </div>
      <div className={styles.table}>
        {/* Table Headers */}
        {/* Start <TableHead> */}
        <TableRow>
          {tableHeaders.map((header, idx) => (
            <TableCell key={idx} text={header} isHead={true} />
          ))}
        </TableRow>
        {/* End </TableHead> */}

        {/* <TableBody> */}
        {things.map((thing, idx) => {
          return (
            <TableRow key={thing.id}>
              <TableCell key={`hardware_id`} text={thing.hardware_id} />
              <TableCell key={`type`} text={thing.type}>
                <WeatherIcon />
              </TableCell>
              <TableCell key={`name`} text={thing.name} />
              <TableCell key={`indicator`} text="0 W/H" />
              <TableCell key={`reported`} text="1 MIN ago" />
              <TableCell key={`status`} text={thing.status ? "Up" : "Down"} />
              <TableCell key={`alert`}>
                <WeatherIcon />
              </TableCell>
            </TableRow>
          );
        })}
        {/* </TableBody> */}
      </div>
    </div>
  );
};

export default HardwareList;
