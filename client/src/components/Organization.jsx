import React from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import Form from "./Form";

const Organization = () => {
  const handleSubmit = (formData) => {
    console.log(formData);

    axiosInstance
      .post(`/user/organizations/`, {
        name: formData.name.value,
        timezone: formData.timezone.value,
        owner: formData.owner.value,
        note: formData.note.value,
      })
      .then((res) => {
        navigate("/organizations");
      })
      .catch((err) => {
        console.log(err);
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
