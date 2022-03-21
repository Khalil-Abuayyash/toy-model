import React from "react";
import TableRow from "./subComponents/TableRow";
import TableCell from "./subComponents/TableCell";
import DeleteButton from "./Buttons/DeleteButton";
import styles from "../styles/table.module.css";
import ViewButton from "./Buttons/ViewButton";
import EditButton from "./Buttons/EditButton";
import { MdLogout } from "react-icons/md";
// import AuthorizedComponent from "../HOCs/AuthorizedComponent";
import AdminComponent from "../HOCs/AdminComponent";
import IconButton from "./Buttons/IconButton";
import { AiOutlineEye } from "react-icons/ai";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { navigate } from "@reach/router";
import WeatherIcon from "./arrows/WeatherIcon";
import Path from "./arrows/Path";
import LineChart from "./LineChart";

const getProperty = (obj, property) => {
  let parts = property.split(".");
  if (Array.isArray(parts)) {
    while (parts.length > 0 && obj !== undefined) {
      obj = obj[parts.shift()];
    }
    return obj;
  } else {
    throw "parts is not a valid array";
  }
};

const OrganizationSummaryTable = ({
  data,
  tableHeaders,
  tableBodies,
  onDelete,
  onEdit,
  onView,
  category,
  isOld,
  toggleDone,
  toggleNotDone,
  teamId,
  actions = true,
}) => {
  return (
    <div className={styles.table}>
      {/* Table Headers */}
      {/* <TableHead> */}
      <TableRow>
        {tableHeaders.map((header, idx) => (
          <TableCell key={idx} text={header} isHead={true} />
        ))}
      </TableRow>
      {/* </TableHead> */}

      <TableRow key={0}>
        <TableCell
          onClick={() => navigate(`/tables/home/sites/1/summary`)}
          key={1}
          text="Qudra Site"
        />
        <TableCell key={2}>
          <LineChart />
        </TableCell>
        <TableCell key={3} text="0.7 KW" />
        <TableCell key={4}>
          <WeatherIcon />
        </TableCell>
        <TableCell key={5} text="0.7 KW" />
        <TableCell key={6}>
          <Path />
        </TableCell>
        <TableCell key={7} text="56,048 KW" />
        <TableCell key={8} text="5000 KW" />
        <TableCell key={9} text="1 minute ago" />
      </TableRow>

      {/* <TableBody> */}
      {/* {data.map((item, idx) => (
        <TableRow key={idx}>
          {tableBodies.map((cell, idx) =>
            typeof cell === "string" ? (
              <TableCell key={cell} text={getProperty(item, cell)} />
            ) : null
          )}
        </TableRow>
      ))} */}
      {/* </TableBody> */}
    </div>
  );
};

export default OrganizationSummaryTable;
