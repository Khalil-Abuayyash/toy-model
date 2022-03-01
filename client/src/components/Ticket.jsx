import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import Input from "./subComponents/Input";
import Button from "./subComponents/Button";
import FormRow from "./subComponents/FormRow";
import styles from "../styles/formContainer.module.css";
import H2 from "./headers/H2";
import MSelect from "./subComponents/MSelect";
import textareaStyles from "../styles/input.module.css";
import moment from "moment-timezone";
import { isAdmin } from "../HOCs/AdminComponent";
import { AuthContext } from "../Context/AuthenticationContext";

const Ticket = () => {
  const [organization, setOrganization] = useState([]);
  const [site, setSite] = useState([]);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState([false, ""]);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState([false, ""]);
  const { user } = useContext(AuthContext);

  const handleOrganization = (selected) => {
    setOrganization(selected);
  };

  const handleSite = (selected) => {
    setSite(selected);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/user/tickets/`, {
        description,
        title,
        organization_id: organization.id,
        site_id: site.id,
        project_id: 8,
        user_id: user.id,
      })
      .then((res) => {
        navigate("/tables/tickets");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className={styles.container}>
      <H2 style={{ fontWeight: "normal" }}>Add Ticket</H2>
      <FormRow>
        <MSelect
          isMulti={false}
          options={[{ name: "qudra", id: 1 }]}
          placeholder="Organization"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          selected={organization}
          setSelected={handleOrganization}
          isWide={true}
        />
      </FormRow>
      <FormRow>
        <MSelect
          isMulti={false}
          options={[{ name: "shufat", id: 2 }]}
          placeholder="Site"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          selected={site}
          setSelected={handleSite}
          isWide={true}
        />
      </FormRow>
      <FormRow>
        <Input
          id="title"
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleTitle}
          isWide={true}
          className={
            titleError[0] ? "error" : title.length === 0 ? "input" : "success"
          }
        />
      </FormRow>
      <FormRow>
        {/* <Input
          style={{ height: "25.4vh" }}
          id="description"
          name="description"
          placeholder="Message"
          value={description}
          onChange={handleDescription}
          isWide={true}
          className={
            titleError[0] ? "error" : title.length === 0 ? "input" : "success"
          }
        /> */}
        <textarea
          className={` ${textareaStyles.default} ${
            descriptionError[0]
              ? textareaStyles.error
              : description.length === 0
              ? textareaStyles.input
              : textareaStyles.success
          } ${textareaStyles["wide"]} `}
          placeholder="Message"
          style={{ height: "25.4vh", resize: "none" }}
          onChange={handleDescription}
        >
          {description}
        </textarea>
      </FormRow>
      <FormRow style={{ justifyContent: "space-evenly" }}>
        <Button
          isLeft={true}
          style={{
            marginLeft: "8%",
            backgroundColor: "#f6f6f6",
            color: "#ea3c88",
            border: " 2px solid #EA3C88",
          }}
          title="Cancel"
          isLarge={false}
          onClick={() => navigate("/tables/tickets")}
        />
        <Button
          isRight={true}
          title="Save"
          isLarge={false}
          disabled={false && (descriptionError[0] || description.length === 0)}
          onClick={handleSubmit}
        />
      </FormRow>
      {/* </form> */}
    </div>
  );
};

export default Ticket;
