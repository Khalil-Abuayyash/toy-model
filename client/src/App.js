import { useState, useEffect } from "react";
import LineChart from "./components/LineChart";
import { Router, Link } from "@reach/router"
import axios from "axios";
import axiosInstance from "./axios";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import ProjectList from "./components/ProjectList";
import Google from "./components/Google";


axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function App() {
  const [query, setQuery] = useState('write query here')

  // const execute = () => {
  //   axios.post('http://localhost:8000', {'query':query})
  //   .then(res => console.log(res.data))
  // }

  useEffect(() => {
    axiosInstance.get('qudra')
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }, [])


  const Home = () => <h1>HOME</h1>

  return (
    <div>
      {/* <input onChange={(e) => setQuery(e.target.value)} value={query} />
      <button onClick={() => execute()}>Execute</button>
      <LineChart /> */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/google">Google</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/projects">Project</Link> |{" "}
        <Link to="/logout">Logout</Link> |{" "}
        <Link to="dashboard">Dashboard</Link>
      </nav>
      <Router >
        <Home path="/" />
        <Register path="/register" />
        <Google path="/google" />
        <Login path="/login" />
        <ProjectList path="/projects" />
        <Logout path="/logout" />
        <LineChart path="/dashboard" />
      </Router>
      <h1>What a Footer!</h1>
    </div>
  );
}

export default App;
