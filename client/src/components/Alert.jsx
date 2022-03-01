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
  const [organizationsOptions, setOrganizationsOptions] = useState([]);
  const [site, setSite] = useState([]);
  const [sitesOptions, setSitesOptions] = useState([]);
  const [operation, setOperation] = useState({ name: "less than", id: 1 });
  const [operations] = useState([
    { name: "less than", id: 1 },
    { name: "more than", id: 2 },
  ]);
  const [trigger, setTrigger] = useState(0.0);
  const [triggerError, setTriggerError] = useState(0.0);
  const [period, setPeriod] = useState({ value: "5m", id: 1 });
  const [periods] = useState([
    { value: "5m", id: 1 },
    { value: "10m", id: 2 },
  ]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState([false, ""]);
  const [emails, setEmails] = useState("");
  const [emailsError, setEmailsError] = useState([false, ""]);
  const [query, setQuery] = useState("");
  const [queryError, setQueryError] = useState([false, ""]);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState([false, ""]);
  const [dashboard, setDashboard] = useState("not yet");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      let fetchedOrganizations = await axiosInstance.get(
        `/user/organizations/`
      );
      let fetchedSites = await axiosInstance.get(`/user/sites/`);
      setOrganizationsOptions(fetchedOrganizations.data.results);
      setSitesOptions(fetchedSites.data.results);
    };
    fetchData();
  }, []);

  const handleOrganization = (selected) => {
    setOrganization(selected);
  };

  const handleSite = (selected) => {
    setSite(selected);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };
  const handleEmails = (e) => {
    setEmails(e.target.value);
  };
  const handleTrigger = (e) => {
    setTrigger(e.target.value);
  };
  const handlePeriod = (e) => {
    setPeriod(e);
  };
  const handleOperation = (e) => {
    setPeriod(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/user/alerts/`, {
        description: description,
        name: name,
        organization_id: organization.id,
        site_id: site.id,
        user_id: user.id,
        emails: emails,
        query: query,
        operation: operation.name,
        value: trigger,
        period: period.value,
        dashboard: dashboard,
      })
      .then((res) => {
        navigate("/profile/alerts");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className={styles.container}>
      <H2 style={{ fontWeight: 600 }}>Add New Alert</H2>
      <FormRow>
        <Input
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleName}
          isWide={true}
          className={
            nameError[0] ? "error" : name.length === 0 ? "input" : "success"
          }
        />
      </FormRow>
      <FormRow>
        <MSelect
          isMulti={false}
          options={sitesOptions}
          placeholder="Site"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          selected={site}
          setSelected={handleSite}
          isLarge={true}
        />
        <MSelect
          isMulti={false}
          options={organizationsOptions}
          placeholder="Organization"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          selected={organization}
          setSelected={handleOrganization}
          isLarge={true}
        />
      </FormRow>
      <FormRow>
        <Input
          id="emails"
          name="emails"
          placeholder="Emails"
          value={emails}
          onChange={handleEmails}
          isWide={true}
          className={
            emailsError[0] ? "error" : emails.length === 0 ? "input" : "success"
          }
        />
      </FormRow>
      <FormRow>
        <Input
          id="query"
          name="query"
          placeholder="Query"
          value={query}
          onChange={handleQuery}
          isWide={true}
          className={
            queryError[0] ? "error" : query.length === 0 ? "input" : "success"
          }
        />
      </FormRow>
      <FormRow>
        <MSelect
          isMulti={false}
          options={operations}
          placeholder="Operation"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          selected={operation}
          setSelected={handleOperation}
          isThird={true}
        />
        <Input
          style={{ width: "17vw" }}
          id="value"
          name="value"
          placeholder="Value"
          value={trigger}
          onChange={handleTrigger}
          className={
            triggerError[0]
              ? "error"
              : trigger.length === 0
              ? "input"
              : "success"
          }
        />
        <MSelect
          isMulti={false}
          options={periods}
          placeholder="For"
          getOptionLabel={(option) => option.value}
          getOptionValue={(option) => option.id}
          selected={period}
          setSelected={handlePeriod}
          isThird={true}
        />
      </FormRow>
      <FormRow>
        <Input
          id="description"
          name="description"
          placeholder="Description"
          value={description}
          onChange={handleDescription}
          isWide={true}
          className={
            descriptionError[0]
              ? "error"
              : description.length === 0
              ? "input"
              : "success"
          }
        />
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
          onClick={() => navigate("/profile/alerts")}
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
