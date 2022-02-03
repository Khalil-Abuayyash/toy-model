import React, { useEffect, useState } from "react";
import Button from "./subComponents/Button";
import FormTextInput from "./subComponents/FormTextInput";
import Multiselect from "multiselect-react-dropdown";

const FormRows = (props) => {
  const style = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100px",
  };
  const { length, cells } = props;
  const [len] = useState(Math.ceil(length / 2));
  return (
    <div>
      {[...Array(len).keys()].map((key) => {
        return (
          <div style={style} key={key}>
            {cells[2 * key]}
            {cells[2 * key + 1]}
          </div>
        );
      })}
    </div>
  );
};

const Form = (props) => {
  const { inputs, handleSubmit } = props;
  const [formData, setFormData] = useState(inputs);
  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const handleMultiSelect = (list, item, key) => {
    if (formData[key].type === "multiSelect") {
      setFormData({
        ...formData,
        [key]: {
          ...formData[key],
          selectedValues: [...formData[key].selectedValues, item],
        },
      });
    }
  };

  const handleMultiSelectOnRemove = (list, item, key) => {
    if (formData[key].type === "multiSelect") {
      setFormData({
        ...formData,
        [key]: {
          ...formData[key],
          selectedValues: formData[key].selectedValues.filter(
            (element) => element.id !== item.id
          ),
        },
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: { ...formData[e.target.name], value: e.target.value },
    });
  };

  useEffect(() => {
    // console.log(formData);
    // console.log(formData["organization"].selectedValues);
    // console.log(formData["team"].selectedValues);
  }, [formData]);

  return (
    <>
      <div style={style}>
        <FormRows
          cells={Object.keys(formData).map((key) =>
            formData[key].type === "select" ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>{formData[key].label}</label>
                <select
                  value={formData[key].value || ""}
                  // style={{ width: "40%" }}
                  onChange={handleChange}
                  name={key}
                  id={key}
                >
                  {formData[key].populated.map((option, idx) => (
                    <option
                      key={option[formData[key].displayValue]}
                      value={option["id"]}
                    >
                      {option[formData[key].displayValue]}
                    </option>
                  ))}
                </select>
              </div>
            ) : formData[key].type === "radio" ? (
              <div style={{ display: "flex" }} onChange={handleChange}>
                <label>{formData[key].label + " :"}</label>
                {formData[key].options.map((option, idx) => {
                  return (
                    <FormTextInput
                      type="radio"
                      name={key}
                      value={option}
                      key={option}
                      label={option}
                    />
                  );
                })}
              </div>
            ) : formData[key].type === "multiSelect" ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor={key}>{formData[key].label}</label>
                <Multiselect
                  id={key}
                  key={key}
                  displayValue={formData[key].displayValue}
                  options={formData[key].options}
                  showCheckbox={true}
                  placeholder={formData[key].placeholder}
                  groupBy=""
                  closeOnSelect={true}
                  // style={{
                  //   multiselectContainer: { maxWidth: "100%" },
                  //   inputField: { margin: "0px" },
                  //   optionContainer: { border: "2px solid", width: "100%" },
                  //   searchBox: { width: "100%" },
                  //   option: { width: "100%" },
                  // }}
                  onSelect={(list, item) => handleMultiSelect(list, item, key)}
                  onRemove={(list, item) =>
                    handleMultiSelectOnRemove(list, item, key)
                  }
                  selectedValues={formData[key].selectedValues}
                />
              </div>
            ) : formData[key].type === "connectedSelect" ? (
              <>
                <h1>Connected Multi Select</h1>
                {formData[key].selectors.map((selector) => {
                  return (
                    <select key={selector}>
                      {formData[key][selector].map((selectorObj) => {
                        // return <option value={selectorObj[]}></option>
                      })}
                    </select>
                  );
                })}
              </>
            ) : (
              <FormTextInput
                type={formData[key].type || "text"}
                label={formData[key].label || key}
                key={key}
                name={key}
                onChange={handleChange}
                value={formData[key].value || ""}
                validationValue={formData[key].validationValue}
                visible={
                  formData[key].value === undefined
                    ? "none"
                    : formData[key].validationValue > formData[key].value.length
                    ? ""
                    : "none"
                }
                // visible="none"
              />
            )
          )}
          length={Object.keys(inputs).length}
        />
        <Button title="Submit" onClick={() => handleSubmit(formData)} />
      </div>
    </>
  );
};

export default Form;
