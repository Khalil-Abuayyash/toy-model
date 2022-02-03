import React from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import Form from "./Form";

const User = () => {
  const handleSubmit = (formData) => {
    console.log(formData);

    axiosInstance
      .post(`/user/users/`, {
        email: formData.email.value,
        password: formData.password.value,
        nickname: formData.nickname.value,
        telephone: formData.telephone.value,
        role_id: 1,
        teams: formData.teams.selectedValues.map((item) => {
          return { name: item.name };
        }),
        organizations: formData.organizations.selectedValues.map((item) => {
          return { name: item.name };
        }),
      })
      .then((res) => {
        console.log(res);
        navigate("/");
        //console.log(res);
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Create New User</h1>
      <Form
        handleSubmit={handleSubmit}
        inputs={{
          nickname: { label: "Name (Nickname)" },
          email: { label: "Email" },
          password: { type: "password", label: "Password" },
          confirmPassword: { type: "password", label: "Confirm Password" },
          telephone: { label: "Phone Number" },
          company: { label: "Company" },
          organizations: {
            label: "Orgs",
            type: "multiSelect",
            options: [
              { id: 1, name: "Qudra" },
              { id: 2, name: "napco" },
            ],
            selectedValues: [],
            displayValue: "name",
            placeholder: "select an org",
          },
          teams: {
            label: "Teams",
            type: "multiSelect",
            options: [
              { id: 1, name: "IT" },
              { id: 2, name: "D&O" },
            ],
            selectedValues: [],
            displayValue: "name",
            placeholder: "select a team",
          },
          role_id: {
            label: "role",
            type: "radio",
            options: ["admin", "viewer", "editor"],
          },
        }}
      />
    </div>
  );
};

export default User;
