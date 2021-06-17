import React from "react";
import { Button } from "@material-ui/core";
import ProfileEditDialog from "../../../session/ProfileEditDialog/ProfileEditDialog";
import { sessionSelector, setIsLoggedIn } from "../../../session/sessionSlice";
import { useMutation } from "react-query";
import * as http from "../../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import "./LeftSection.scss";

const LeftSection = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector(sessionSelector);

  const logoutMutation = useMutation(() => {
    return http.post(`auth/logout`);
  });

  const handleLogout = () => {
    logoutMutation.mutate(
      {},
      {
        onSuccess: () => {
          dispatch(setIsLoggedIn(false));
        },
      }
    );
  };

  return (
    <div className={"left-section-container"}>
      <Button
        className={"logout-btn"}
        variant="contained"
        color="secondary"
        onClick={handleLogout}
      >
        Logout
      </Button>
      <ProfileEditDialog />
      <div className={"user-info"}>
        <span className={"user-first-last-name"}>
          {userInfo.firstName + " " + userInfo.lastName}
        </span>
        <span>{"@" + userInfo.username}</span>
      </div>
    </div>
  );
};

export default LeftSection;
