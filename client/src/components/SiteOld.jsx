import React, { useState } from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import Input from "./subComponents/Input";
import Button from "./subComponents/Button";
import FormRow from "./subComponents/FormRow";
import styles from "../styles/formContainer.module.css";
import H2 from "./headers/H2";
import MSelect from "./subComponents/MSelect";
import Select from "./subComponents/Select";
import ArrowUp from "./arrows/ArrowUp";

const Site = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState([false, ""]);
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState("");
  const [organization, setOrganization] = useState([]);
  const [disco, setDisco] = useState("");
  const [projects, setProjects] = useState({
    1: { name: "", type: "PV", note: "", enabled: false },
    2: { name: "", type: "Weather Station", note: "", enabled: false },
    3: { name: "", type: "Meter", note: "", enabled: false },
  });

  const [discos] = useState(
    ["JDECO", "QDECO"].map((name) => ({ value: name, label: name }))
  );

  const handleName = (e) => {
    setName(e.target.value);
    if (e.target.value.length === 0) {
      setNameError([true, "Name is Required"]);
    } else if (e.target.value.length < 3) {
      setNameError([true, "Name must be of 3 charaters or more."]);
    } else {
      setNameError([false, ""]);
    }
  };

  const handleNote = (e) => {
    setNote(e.target.value);
  };

  const handleDisco = (e) => {
    setDisco(e.value);
  };

  const handleOrganization = (selected) => {
    setOrganization(selected);
  };

  const createNewProject = () => {
    const id = Object.keys(projects).length + 1;
    setProjects({
      ...projects,
      [id]: { name: "", type: "", brand: "", note: "" },
    });
  };

  const handleProjects = (e) => {
    setProjects({
      ...projects,
      [e.target.id[0]]: {
        ...projects[e.target.id[0]],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleType = (q, w, e, r) => {
    console.log("q", q);
    console.log("w", w);
    console.log("e", e);
    console.log("r", r);
  };

  const changeFormDisplay = (key) => {
    setProjects({
      ...projects,
      [key]: {
        ...projects[key],
        enabled: !projects[key].enabled,
      },
    });
  };

  const handleSubmit = () => {
    axiosInstance
      .post(`/user/sites/`, {
        name: name,
        organization_id: organization.id,
        // owner: formData.owner.value,
        note: note,
        // location: formData.location.value,
      })
      .then((res) => {
        navigate("/sites");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.container}>
      <H2 style={{ fontWeight: "normal" }}>Add New Site</H2>

      <FormRow>
        <Input
          id="name"
          name="name"
          placeholder="Site Name"
          value={name}
          onChange={handleName}
          className={
            nameError[0] ? "error" : name.length === 0 ? "input" : "success"
          }
        />
        <MSelect
          isMulti={false}
          options={[{ name: "qudra", id: 1 }]}
          placeholder="Organization"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          selected={organization}
          setSelected={handleOrganization}
        />
      </FormRow>
      <FormRow>
        <MSelect
          isMulti={false}
          options={discos}
          placeholder="DISCO"
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          selected={disco}
          setSelected={handleDisco}
          isWide={true}
        />
      </FormRow>
      <FormRow>
        <Input
          id="note"
          name="note"
          placeholder="Note"
          value={note}
          onChange={handleNote}
          isWide={true}
          className={
            noteError[0] ? "error" : note.length === 0 ? "input" : "success"
          }
        />
      </FormRow>

      {/* Projects */}
      {Object.keys(projects).map((key) => {
        return (
          <div key={key}>
            <FormRow>
              <Input
                idx={key}
                isWide={true}
                id={`${key} name`}
                name="name"
                placeholder="Project Name"
                value={projects[key].name}
                onChange={handleProjects}
                className={
                  projects[key].name.length === 0 ? "input" : "success"
                }
              />
              <ArrowUp
                enabled={projects[key].enabled}
                onClick={() => changeFormDisplay(key)}
              />
            </FormRow>
            <div style={{ display: projects[key].enabled ? "block" : "none" }}>
              <FormRow>
                <Input
                  idx={key}
                  id={`${key} note`}
                  name="note"
                  placeholder="Note"
                  value={projects[key].note}
                  onChange={handleProjects}
                  isWide={true}
                  className={
                    projects[key].note.length === 0 ? "input" : "success"
                  }
                />
              </FormRow>
              <FormRow>
                <Select
                  name="type"
                  value={projects[key].type}
                  placeholder="type"
                  id={`${key} type`}
                  onChange={handleProjects}
                  isWide={true}
                  options={Object.keys(projects).map((key) => {
                    return {
                      value: projects[key].type,
                      label: projects[key].type,
                    };
                  })}
                />
              </FormRow>
            </div>
          </div>
        );
      })}

      {/* Buttons */}
      <FormRow>
        <Button title="New Project" isWide={true} onClick={createNewProject} />
      </FormRow>
      <FormRow style={{ justifyContent: "space-evenly" }}>
        <Button
          isLeft={true}
          style={{
            backgroundColor: "#f6f6f6",
            color: "#ea3c88",
            border: " 2px solid #EA3C88",
          }}
          title="Cancel"
          isLarge={false}
          onClick={() => navigate("/organizations")}
        />
        <Button
          isRight={true}
          title="Save"
          isLarge={false}
          disabled={false && (nameError[0] || name.length === 0)}
          onClick={handleSubmit}
        />
      </FormRow>
    </div>
  );
};

export default Site;
