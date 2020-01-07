import React from "react";
import { useForm } from "form-control-react";
import { config } from "./App.config";

const App = () => {
  const {
    getValues,
    getFields,
    handleChange,
    reset,
    valid,
    validate
  } = useForm(config);

  const handleSubmit = () => {
    const isFormValid = validate();
    isFormValid && console.log("Values: ", getValues());
  };

  const { firstName, lastName, age } = getFields();
  return (
    <>
      <form className="Form">
        <div className="FormField">
          <label htmlFor="firstName">
            First Name
            {firstName.required && <span style={{ color: "red" }}>*</span>}
          </label>
          <input
            className="Input"
            onChange={handleChange}
            type="text"
            name="firstName"
            {...firstName}
          />
          <span className="ErrorMessage">{firstName.errorMsg}</span>
        </div>

        <div className="FormField">
          <label htmlFor="lastName">
            Last Name
            {lastName.required && <span style={{ color: "red" }}>*</span>}
          </label>
          <input
            className="Input"
            onChange={handleChange}
            type="text"
            name="lastName"
            {...lastName}
          />
          <span className="ErrorMessage">{lastName.errorMsg}</span>
        </div>

        <div className="FormField">
          <label htmlFor="age">
            Age
            {age.required && <span style={{ color: "red" }}>*</span>}
          </label>
          <input
            className="Input"
            onChange={handleChange}
            type="number"
            name="age"
            {...age}
          />
          <span className="ErrorMessage">{age.errorMsg}</span>
        </div>
      </form>
      <button className="Button" onClick={reset}>
        Reset
      </button>
      <button className="Button" onClick={handleSubmit} disabled={!valid}>
        Submit
      </button>
    </>
  );
};

export default App;
