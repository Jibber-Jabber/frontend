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

  const getUserInfo = () => {
    getUserInfoMutation.mutate(
      {},
      {
        onSuccess: (data) => {
          setUserInfo(data);
        },
      }
    );
  };

  const getUserPostsList = () => {
    getUserPostsListMutation.mutate(
      {},
      {
        onSuccess: (data) => {
          setUserPostsList(data);
        },
      }
    );
  };

  useEffect(() => {
    getUserInfo();
    getUserPostsList();
  }, []);

  const handlePostListUpdate = () => {
    getUserPostsList();
  };

  return (
    <div className={"user-profile-container"}>
      <span className={"profile-title"}>
        {userInfo?.firstName + " " + userInfo?.lastName}
      </span>
      <span className={"profile-username"}>{"@" + userInfo?.username}</span>
      <span className={"profile-item"}>{"Email: " + userInfo?.email}</span>
      <span className={"posts-container-title"}>{"User posts: "}</span>
      <div className={"posts-container"}>
        {userPostsList.length > 0 ? (
          userPostsList?.map((post) => (
            <Post post={post} handlePostListUpdate={handlePostListUpdate} />
          ))
        ) : (
          <span className={"no-posts-message"}>This user has no posts yet</span>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
