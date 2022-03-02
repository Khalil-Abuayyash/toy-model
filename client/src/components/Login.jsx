import React, { useState, useContext, useEffect } from "react";
import axiosInstance from "../axios";
import axios from "axios";
import { navigate, Link } from "@reach/router";
import H2 from "./headers/H2";
import H3 from "./headers/H3";
import H4 from "./headers/H4";
import Input from "./subComponents/Input";
import Button from "./subComponents/Button";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../Context/AuthenticationContext";
import { getOS, getBrowser } from "../utils/platform";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError] = useState([false, ""]);
  const [passwordError, setPasswordError] = useState([false, ""]);
  const { setUser, setIsAuthenticated, isAuthenticated } =
    useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tables/users");
    }
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value.trim());
  };
  const handlePass = (e) => {
    setPassword(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = async () => {
      const res = await axiosInstance.post(`token/`, {
        email: email,
        password: password,
      });
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      axiosInstance.defaults.headers["Authorization"] =
        "JWT " + localStorage.getItem("access_token");
      var decoded = jwt_decode(res.data.access);
      const userRes = await axiosInstance.get(
        `/user/authenticated/${decoded.user_id}`
      );
      const ipRes = await axios.get("https://geolocation-db.com/json/");
      console.log(ipRes.data.IPv4);
      const browser = getBrowser();
      console.log(browser);
      // const logged_on = moment(Date.now()).format("YYYY-MM-DD HH:mm");
      const logged_on = Date.now() / 1000;
      try {
        const session = await axiosInstance.post(`/user/sessions/`, {
          ip: ipRes.data.IPv4,
          browser: browser,
          os: "",
          user_id: decoded.user_id,
          logged_on: logged_on,
        });
      } catch (e) {
        console.log(e.response.data);
      }
      setUser(userRes.data);
      setIsAuthenticated(true);
    };
    login();
    navigate("/tables/users");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "5% auto",
        width: "fit-content",
      }}
    >
      <H3
        style={{ color: "#464545", marginBottom: "0px", fontWeight: "normal" }}
      >
        Welcome Back!
      </H3>
      <H2 style={{ marginTop: "0px", fontWeight: "normal" }}>
        Sign in to{" "}
        <span style={{ color: "#E84088", fontWeight: "bold" }}>QMETER</span>
      </H2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", margin: "0 auto" }}
      >
        <Input
          className={
            emailError[0] ? "error" : email.length === 0 ? "input" : "success"
          }
          id="email"
          value={email}
          onChange={handleEmail}
          isLarge={true}
        />
        <Input
          className={
            emailError[0] ? "error" : email.length === 0 ? "input" : "success"
          }
          id="password"
          value={password}
          onChange={handlePass}
          isLarge={true}
        />
        <Button title="Login" isLarge={true} />
      </form>
      <div
        style={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <H4 style={{ fontWeight: "normal", marginBottom: "0px" }}>
          Don't have Account?{" "}
          <span style={{ color: "#E84088", fontWeight: "bold" }}>Sign Up</span>
        </H4>
        <H4>
          <Link
            style={{
              color: "#464545",
              marginTop: "0px",
              textDecoration: "none",
            }}
            to="/forggeting_password"
          >
            Forgot Password?
          </Link>
        </H4>
      </div>
    </div>
  );
};

export default Login;
