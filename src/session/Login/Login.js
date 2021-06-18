import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { sessionSelector, setIsLoggedIn, setUserInfo } from "../sessionSlice";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import * as http from "../../utils/http";
import { useAlert } from "react-alert";

const Login = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(sessionSelector);

  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) history.push("/home");
  }, [isLoggedIn]);

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

  const loginMutation = useMutation((body) => {
    return http.post(`auth/login`, body);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutation.mutate(formValues, {
      onSuccess: (data) => {
        alert.success("LOGIN SUCCESSFULLY");
        dispatch(setUserInfo(data));
        dispatch(setIsLoggedIn(true));
      },
      onError: (error) => {
        alert.error(error.data.message);
      },
    });
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
        <div className={"redirect-to-signup-container"}>
          Don't have an account yet?
          <a
            className={"redirect-to-signup-link"}
            onClick={() => history.push("/signup")}
          >
            Sing Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
