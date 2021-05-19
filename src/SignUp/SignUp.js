import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./SignUp.scss";
import * as http from "../utils/http";

const SignUp = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const formGroups = [
    {
      fields: [
        {
          name: "firstName",
          label: "First Name",
          inputId: "first-name-input",
          type: "text",
          value: formValues.firstName,
        },
        {
          name: "lastName",
          label: "Last Name",
          inputId: "last-name-input",
          type: "text",
          value: formValues.lastName,
        },
      ],
    },
    {
      fields: [
        {
          name: "username",
          label: "Username",
          inputId: "username-input",
          type: "text",
          value: formValues.username,
        },
        {
          name: "email",
          label: "Email address",
          inputId: "email-input",
          type: "email",
          value: formValues.email,
        },
      ],
    },
    {
      fields: [
        {
          name: "password",
          label: "Password",
          inputId: "password-input",
          type: "password",
          value: formValues.password,
          error: formValues.password !== formValues.confirmPassword,
          errorMessage:
            formValues.password !== formValues.confirmPassword
              ? "Passwords must be the same"
              : "",
        },
        {
          name: "confirmPassword",
          label: "Confirm password",
          inputId: "confirm-password-input",
          type: "password",
          value: formValues.confirmPassword,
          error: formValues.confirmPassword !== formValues.password,
          errorMessage:
            formValues.confirmPassword !== formValues.password
              ? "Passwords must be the same"
              : "",
        },
      ],
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...formToSubmit } = formValues;
    await http.post("auth/register", formToSubmit);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={"signup-container"}>
      <div className={"form-and-title-container"}>
        <span className={"signup-title"}>Sign Up</span>
        <form className={"signup-form"} onSubmit={handleSubmit}>
          {formGroups.map((group, index) => (
            <div
              key={"signup-form-group-" + index}
              className={"group-container"}
            >
              {group.fields.map((field, index) => (
                <TextField
                  key={"signup-form-text-field-" + index}
                  className={"text-field"}
                  variant={"outlined"}
                  label={field.label}
                  name={field.name}
                  value={field.value}
                  type={field.type}
                  onChange={handleInputChange}
                  required={true}
                  error={field.error}
                  helperText={field.errorMessage}
                />
              ))}
            </div>
          ))}
          <Button
            className={"submit-btn"}
            variant="contained"
            color="primary"
            type={"submit"}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
