import React, { useCallback } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { navigate } from "@reach/router";
import axiosInstance from "../axios";

const Google = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  const validateTokenAndObtainSession = (idToken) => {
    const headers = {
      Authorization: idToken,
      "Content-Type": "application/json",
      accept: "application/json",
    };

    const request = axios.create({
      baseURL: "http://127.0.0.1:8000/api/user/google/",
      timeout: 5000,
      headers: headers,
      withCredentials: true,
    });

    return request;
  };

  const onGoogleLoginSuccess = useCallback((response) => {
    console.log(response);
    const idToken = response.tokenId;
    const data = {
      email: response.profileObj.email,
      first_name: response.profileObj.givenName,
      last_name: response.profileObj.familyName,
      role_id: 1,
    };

    validateTokenAndObtainSession(idToken)
      .post("", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        navigate("/");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <GoogleLogin
        clientId="1029661522841-ci605mlkbp0fa4fjljbj2ptgraqgi3nk.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={onGoogleLoginSuccess}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Google;
