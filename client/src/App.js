import React, { useState, useEffect } from "react";
import axios from "axios";
import Routes from "./components/Routes";
import VerticalNavigationBar from "./components/VerticalNavigationBar";
import Header from "./components/Header";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/user/cookie/", { withCredentials: true })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }, []);

  const handleSubmit = () => {};
  return (
    <div>
      <Header />
      {/* <VerticalNavigationBar /> */}
      <Routes style={{ margin: "20% auto" }} />
      {/* <h1>What a Footer!</h1> */}
    </div>
  );
}

export default App;
