import React from "react";
import Button from "../components/subComponents/Button";
import DropDownMenu from "../components/subComponents/DropDownMenu";
import Charts from "../components/Charts";
import Table from "../components/Table";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button title="Add Var" />
      <Button title="Add Alerts" />
      <DropDownMenu title="parameters" label="Parameters" />
      <DropDownMenu title="interval" label="Interval" />
      <DropDownMenu title="time" label="Time and Date" />
      <DropDownMenu title="organization" label="Organization" />
      <DropDownMenu title="site" label="Site" />
      <DropDownMenu title="project" label="Project" />
      <DropDownMenu title="reports" label="Reports" />
      <DropDownMenu title="templates" label="Templates" />
      <Button title="Add Statistic" />
      <Charts />
    </div>
  );
};

export default Dashboard;
