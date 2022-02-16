import React, { useEffect, useState } from "react";
import GoogleMap from "../components/GoogleMap";
import Button from "../components/subComponents/Button";
import Charts from "../components/Charts";

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

  return <GoogleMap />;
};

export default Dashboard;
