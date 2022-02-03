import React, { useEffect, useState } from "react";
import Button from "../components/subComponents/Button";
import DropDownMenu from "../components/subComponents/DropDownMenu";
import Charts from "../components/Charts";
import Multiselect from "multiselect-react-dropdown";
import FormTextInput from "../components/subComponents/FormTextInput";

const Dashboard = () => {
  const [options, setOptions] = useState([
    { name: "german", id: 1, value: "mercedes" },
    { name: "german", id: 2, value: "bmw" },
    { name: "italian", id: 3, value: "volvo" },
    { name: "all", id: 0, value: "All" },
  ]);
  const [selectedList, setSelectedList] = useState([]);
  const onSelect = (list, item) => {
    console.log(list, "list");
    console.log(item, "item");
    if (item.id === 0) {
      setSelectedList(options);
    } else {
      setSelectedList([...selectedList, item]);
    }
  };
  const onRemove = (list, item) => {
    if (item.id === 0) {
      setSelectedList([]);
    } else {
      setSelectedList(selectedList.filter((element) => element.id !== item.id));
    }
  };

  // useEffect(() => {
  //   console.log(selectedList);
  // }, [selectedList]);

  const style = {
    multiselectContainer: { width: "10%" },
  };

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
      <Multiselect
        displayValue="value"
        options={options}
        showCheckbox={true}
        placeholder="select a car"
        groupBy=""
        onSelect={onSelect}
        onRemove={onRemove}
        closeOnSelect={true}
        style={style}
        selectedValues={selectedList}
      />
      <Charts />
      <FormTextInput id="name" name="name" type="radio" />
    </div>
  );
};

export default Dashboard;
