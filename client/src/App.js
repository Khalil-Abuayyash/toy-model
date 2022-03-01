import React, { useState, useEffect } from "react";
import axios from "axios";
import Routes from "./components/Routes";
// import Header from "./components/Header";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/user/cookie/", { withCredentials: true })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }, []);

  const handleSubmit = () => {};
  return (
    <div>
      {/* Style here has no effect */}
      <Routes
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        style={{ margin: "20% auto" }}
      />
      {/* <h1>What a Footer!</h1> */}
    </div>
  );
}

export default App;
