import React, { useEffect, useState } from "react";
import "./Home.scss";
import Post from "./Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { mainSelector, createPostRequest, getPostsRequest } from "../mainSlice";
import { Button, TextField } from "@material-ui/core";
import ProfileEditDialog from "../../session/UserProfile/ProfileEditDialog";
import { Autocomplete } from "@material-ui/lab";
import { useMutation } from "react-query";
import * as http from "../../utils/http";

const Home = () => {
  const dispatch = useDispatch();
  const { postsList } = useSelector(mainSelector);

  const initialValues = {
    content: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [usersOptions, setUsersOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(undefined);

  const searchUserMutation = useMutation((username) => {
    return http.get(`users/searchUser?username=${username}`);
  });

  const followUserMutation = useMutation((userId) => {
    return http.post(`users/followUser?userId=${userId}`);
  });

  const logoutMutation = useMutation(() => {
    return http.post(`auth/logout`);
  });

  useEffect(() => {
    dispatch(getPostsRequest());
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
    followUserMutation.mutate(selectedUser?.userId);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
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
          onChange={(event, selectedValue) => setSelectedUser(selectedValue)}
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
            <span>{"User: " + selectedUser?.username}</span>
            <Button
              className={"follow-btn"}
              variant="contained"
              color="primary"
              onClick={handleFollowUser}
            >
              Follow
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
