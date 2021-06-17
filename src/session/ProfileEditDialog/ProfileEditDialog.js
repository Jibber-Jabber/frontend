import React, { useState } from "react";
import { Button, Dialog, DialogTitle, TextField } from "@material-ui/core";
import "./ProfileEditDialog.scss";
import { useDispatch, useSelector } from "react-redux";
import { sessionSelector, setUserInfo } from "../sessionSlice";
import { useMutation } from "react-query";
import * as http from "../../utils/http";
import { useAlert } from "react-alert";

const ProfileEditDialog = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(sessionSelector);

  const initialValues = {
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    username: userInfo?.username,
    email: userInfo?.email,
    password: "",
    newPassword: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormValues(initialValues);
  };

  const formGroups = [
    {
      fields: [
        {
          name: "firstName",
          label: "First Name",
          inputId: "first-name-input",
          type: "text",
          value: formValues.firstName,
          required: false,
        },
        {
          name: "lastName",
          label: "Last Name",
          inputId: "last-name-input",
          type: "text",
          value: formValues.lastName,
          required: false,
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
          required: false,
          disabled: true,
        },
        {
          name: "email",
          label: "Email address",
          inputId: "email-input",
          type: "email",
          value: formValues.email,
          required: false,
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
          required: true,
        },
        {
          name: "newPassword",
          label: "New password",
          inputId: "new-password-input",
          type: "password",
          value: formValues.newPassword,
          required: false,
        },
      ],
    },
  ];

  const editProfileMutation = useMutation((body) => {
    return http.put(`users/editProfile`, body);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, ...formToSubmit } = formValues;
    editProfileMutation.mutate(newPassword === "" ? formToSubmit : formValues, {
      onSuccess: (data) => {
        dispatch(setUserInfo(data));
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
    <div className={"profile-dialog-container"}>
      <Button
        className={"profile-dialog-btn-open"}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Edit Profile
      </Button>
      <Dialog
        id={"profile-dialog"}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className={"form-and-title-container"}>
          <DialogTitle id="form-dialog-title">Profile Edit</DialogTitle>
          <form className={"profile-dialog-form"} onSubmit={handleSubmit}>
            {formGroups.map((group, index) => (
              <div
                key={"profile-dialog-form-group-" + index}
                className={"group-container"}
              >
                {group.fields.map((field, index) => (
                  <TextField
                    key={"profile-dialog-form-text-field-" + index}
                    className={"text-field"}
                    variant={"outlined"}
                    label={field.label}
                    name={field.name}
                    value={field.value}
                    type={field.type}
                    onChange={handleInputChange}
                    required={field.required}
                    error={field.error}
                    helperText={field.errorMessage}
                    disabled={field?.disabled}
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
      </Dialog>
    </div>
  );
};

export default ProfileEditDialog;
