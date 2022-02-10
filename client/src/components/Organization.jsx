import React, { useState } from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import Form from "./Form";

const Organization = () => {
  const handleSubmit = (formData) => {
    axiosInstance
      .post(`/user/organizations/`, {
        name: "napco",
      })
      .then((res) => {
        navigate("/organizations");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div>
      <h1>Create New Organization</h1>
      <Form
        inputs={{
          name: { label: "Organization name" },
          timezone: { label: "Time Zone" },
          owner: { label: "Owner" },
          note: { label: "Note" },
          theme: { label: "theme" },
        }}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Organization;
