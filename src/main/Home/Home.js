import React, { useEffect, useState } from "react";
import "./Home.scss";
import Post from "./Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { mainSelector, createPostRequest, getPostsRequest } from "../mainSlice";
import { Button, TextField } from "@material-ui/core";
import ProfileEditDialog from "../../session/UserProfile/ProfileEditDialog";

const Home = () => {
  const dispatch = useDispatch();
  const { postsList } = useSelector(mainSelector);

  const initialValues = {
    content: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

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

  return (
    <div className="home-container">
      <div className={"left-section-container"}>
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
    </div>
  );
};

export default Home;
