import React from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import Form from "./Form";

const Site = () => {
  const handleSubmit = (formData) => {
    console.log(formData);

    axiosInstance
      .post(`/user/sites/`, {
        name: formData.name.value,
        organization_id: formData.organization.value,
        owner: formData.owner.value,
        note: formData.note.value,
        location: formData.location.value,
      })
      .then((res) => {
        navigate("/sites");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Create New Site</h1>
      <Form
        inputs={{
          name: { label: "Site name" },
          organization: {
            type: "select",
            populated: [
              { id: 1, name: "Qudra" },
              { id: 2, name: "napco" },
            ],
            label: "Organization",
            displayValue: "name",
          },
          owner: { label: "Owner" },
          note: { label: "Note" },
          location: { label: "location" },
        }}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Site;
