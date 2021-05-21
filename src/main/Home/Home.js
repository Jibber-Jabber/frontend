import React, { useEffect, useState } from "react";
import "./Home.scss";
import Post from "./Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { appSelector, createPostRequest, getPostsRequest } from "../mainSlice";
import { Button, TextField } from "@material-ui/core";

const Home = () => {
  const dispatch = useDispatch();
  const { postsLists } = useSelector(appSelector);

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
      <span className={"title"}>Home</span>
      <form className={"create-post-form"} onSubmit={handleSubmit}>
        <TextField
          className={"text-field"}
          type={"textarea"}
          name={"content"}
          value={formValues.content}
          variant={"outlined"}
          placeholder={"content"}
          multiline
          rows={4}
          onChange={handleInputChange}
        />
        <Button
          className={"submit-btn"}
          variant="contained"
          color="primary"
          type={"submit"}
        >
          Submit
        </Button>
      </form>
      <div className={"posts-container"}>
        {postsLists?.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
