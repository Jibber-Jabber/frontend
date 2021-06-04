import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as http from "../../utils/http";
import "./UserProfile.scss";
import Post from "../Home/Post/Post";

const UserProfile = ({ match }) => {
  const [userInfo, setUserInfo] = useState(undefined);
  const [userPostsList, setUserPostsList] = useState([]);

  const { userId } = match.params;

  const getUserInfoMutation = useMutation(() => {
    return http.get(`users/userInfo/${userId}`);
  });

  const getUserPostsListMutation = useMutation(() => {
    return http.get(`posts/byUser/${userId}`);
  });

  useEffect(() => {
    getUserInfoMutation.mutate(
      {},
      {
        onSuccess: (data) => {
          setUserInfo(data);
        },
      }
    );
    getUserPostsListMutation.mutate(
      {},
      {
        onSuccess: (data) => {
          setUserPostsList(data);
        },
      }
    );
  }, []);

  return (
    <div className={"user-profile-container"}>
      <span className={"profile-title"}>User Profile</span>
      <span className={"profile-item"}>{"Email: " + userInfo?.email}</span>
      <span className={"profile-item"}>
        {"FirstName: " + userInfo?.firstName}
      </span>
      <span className={"profile-item"}>
        {"LastName: " + userInfo?.lastName}
      </span>
      <div className={"posts-container"}>
        {userPostsList?.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
