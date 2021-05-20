import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./Login.scss";
import * as http from "../utils/http";

const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const formGroups = [
    {
      fields: [
        {
          name: "username",
          label: "Username",
          inputId: "username-input",
          type: "text",
          value: formValues.username,
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
        },
      ],
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await http.post("auth/login", formValues);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={"signup-container"}>
      <div className={"form-and-title-container"}>
        <span className={"signup-title"}>Login</span>
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

export default Login;
