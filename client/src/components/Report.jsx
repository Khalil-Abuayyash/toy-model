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

const Report = () => {
  const [organization, setOrganization] = useState([]);
  const [organizationsOptions, setOrganizationsOptions] = useState([]);
  const [site, setSite] = useState([]);
  const [sitesOptions, setSitesOptions] = useState([]);
  const [period, setPeriod] = useState();
  const [periods] = useState([
    { value: "last month", id: 1 },
    { value: "last week", id: 2 },
  ]);
  const [deliveryTime, setDeliveryTime] = useState();
  const [DeliveryTimes] = useState([
    { value: "daily", id: 1 },
    { value: "weekly", id: 2 },
  ]);
  const [emails, setEmails] = useState("");
  const [emailsError, setEmailsError] = useState([false, ""]);
  const [dashboard, setDashboard] = useState();
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

  const handleEmails = (e) => {
    setEmails(e.target.value);
  };

  const handlePeriod = (e) => {
    setPeriod(e);
  };
  const handleDeliveryTime = (e) => {
    setDeliveryTime(e);
  };
  const handleDashboard = (e) => {
    setDashboard(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/user/reports/`, {
        organization_id: organization.id,
        site_id: site.id,
        user_id: user.id,
        emails: emails,
        period: period.value,
        dashboard: dashboard.name,
        delivery_time: deliveryTime.value,
      })
      .then((res) => {
        navigate("/profile/reports");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className={styles.container}>
      <H2 style={{ fontWeight: 600 }}>Add New Report</H2>
      <FormRow>
        <MSelect
          isMulti={false}
          options={organizationsOptions}
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
          options={sitesOptions}
          placeholder="Site"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          selected={site}
          setSelected={handleSite}
        />
        <MSelect
          isMulti={false}
          options={[
            { name: "pv", id: "1" },
            { name: "weather station", id: "2" },
          ]}
          placeholder="Dashboard Type"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          selected={dashboard}
          setSelected={handleDashboard}
        />
      </FormRow>
      <FormRow>
        <MSelect
          isMulti={false}
          options={DeliveryTimes}
          placeholder="Delivery Time"
          getOptionLabel={(option) => option.value}
          getOptionValue={(option) => option.id}
          selected={deliveryTime}
          setSelected={handleDeliveryTime}
          isWide={true}
        />
      </FormRow>
      <FormRow>
        <MSelect
          isMulti={false}
          options={periods}
          placeholder="Set Time"
          getOptionLabel={(option) => option.value}
          getOptionValue={(option) => option.id}
          selected={period}
          setSelected={handlePeriod}
          isWide={true}
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
          onClick={() => navigate("/profile/reports")}
        />
        <Button
          isRight={true}
          title="Save"
          isLarge={false}
          disabled={false}
          onClick={handleSubmit}
        />
      </FormRow>
    </div>
  );
};

export default Report;
