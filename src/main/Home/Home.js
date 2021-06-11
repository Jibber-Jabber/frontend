import React, { useEffect, useState } from "react";
import "./Home.scss";
import Post from "./Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { mainSelector, createPostRequest, getPostsRequest } from "../mainSlice";
import { setIsLoggedIn } from "../../session/sessionSlice";
import { Button, TextField } from "@material-ui/core";
import ProfileEditDialog from "../../session/UserProfile/ProfileEditDialog";
import ChatMessageBox from "../ChatMessageBox/ChatMessageBox";
import { Autocomplete } from "@material-ui/lab";
import { useMutation } from "react-query";
import * as http from "../../utils/http";
import { useHistory } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { postsList } = useSelector(mainSelector);

  const history = useHistory();

  const initialValues = {
    content: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [usersOptions, setUsersOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [selectedChatUser, setSelectedChatUser] = useState(undefined);
  const [followedList, setFollowedList] = useState([]);

  const searchUserMutation = useMutation((username) => {
    return http.get(`users/searchUser?username=${username}`);
  });

  const followUserMutation = useMutation((userId) => {
    return http.post(`users/followUser?userId=${userId}`);
  });

  const unfollowUserMutation = useMutation((userId) => {
    return http.post(`users/unfollowUser?userId=${userId}`);
  });

  const logoutMutation = useMutation(() => {
    return http.post(`auth/logout`);
  });

  const getFollowedListMutation = useMutation(() => {
    return http.get(`users/followedUsers`);
  });

  const getFollowedList = () => {
    getFollowedListMutation.mutate(
      {},
      {
        onSuccess: (data) => {
          setFollowedList(data);
        },
      }
    );
  };

  useEffect(() => {
    dispatch(getPostsRequest());
    getFollowedList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createPostRequest(formValues));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleAutocompleteChange = (e) => {
    const { value } = e.target;

    if (value === "") {
      setUsersOptions([]);
      return;
    }

    searchUserMutation.mutate(value, {
      onSuccess: (data) => {
        setUsersOptions(data);
      },
    });
  };

  const handleFollowUser = () => {
    followUserMutation.mutate(selectedUser?.userId, {
      onSuccess: () => {
        getFollowedList();
      },
    });
  };

  const handleUnFollowUser = (userId) => {
    unfollowUserMutation.mutate(userId, {
      onSuccess: () => {
        getFollowedList();
      },
    });
  };

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

  const handleViewUserProfile = () => {
    history.push(`/profile/${selectedUser?.userId}`);
  };

  return (
    <div className="home-container">
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
      </div>
      <div className={"mid-section-container"}>
        <span className={"title"}>Home</span>
        <div className={"posts-create-and-list"}>
          <form className={"create-post-form"} onSubmit={handleSubmit}>
            <TextField
              className={"text-field"}
              type={"textarea"}
              name={"content"}
              value={formValues.content}
              variant={"outlined"}
              placeholder={"Write a post..."}
              multiline
              rows={4}
              onChange={handleInputChange}
              required={true}
            />
            <Button
              className={"submit-btn"}
              variant="contained"
              color="primary"
              type={"submit"}
            >
              Send
            </Button>
          </form>
          <div className={"posts-container"}>
            {postsList?.map((post) => (
              <Post post={post} />
            ))}
          </div>
        </div>
      </div>
      <div className={"right-section-container"}>
        <Autocomplete
          id="combo-box"
          options={usersOptions}
          getOptionLabel={(option) => option.username}
          style={{ width: 300 }}
          onChange={(event, selectedValue) => {
            setSelectedUser(selectedValue);
            setSelectedChatUser(selectedValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className={"text-field"}
              label="Search User"
              variant="outlined"
              onChange={handleAutocompleteChange}
            />
          )}
        />
        {selectedUser && (
          <div className={"selected-user-to-follow"}>
            <div>
              {"User: "}
              <a className={"user-selected"} onClick={handleViewUserProfile}>
                {selectedUser?.username}
              </a>
            </div>
            {!followedList.find(
              (user) => user.userId === selectedUser?.userId
            ) ? (
              <Button
                className={"follow-btn"}
                variant="contained"
                color="primary"
                onClick={handleFollowUser}
              >
                Follow
              </Button>
            ) : (
              <Button
                className={"follow-btn"}
                variant="contained"
                color="primary"
                onClick={() => handleUnFollowUser(selectedUser?.userId)}
              >
                UnFollow
              </Button>
            )}
          </div>
        )}
        <div className={"followed-list"}>
          <span>Followed List:</span>
          {followedList?.map((userFollowed) => (
            <div className={"followed-user-item"}>
              <div>
                {"User: "}
                <a className={"user-selected"} onClick={handleViewUserProfile}>
                  {userFollowed?.username}
                </a>
              </div>
              <Button
                className={"follow-btn"}
                variant="contained"
                color="primary"
                onClick={() => handleUnFollowUser(userFollowed?.userId)}
              >
                UnFollow
              </Button>
            </div>
          ))}
        </div>
        <div>
          <ChatMessageBox selectedChatUser={selectedChatUser} />
        </div>
      </div>
    </div>
  );
};

export default Home;
