import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import Post from "../Post/Post";
import { mainSelector, setPostsList } from "../../mainSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import * as http from "../../../utils/http";
import "./MiddleSection.scss";

const MiddleSection = () => {
  const dispatch = useDispatch();
  const { postsList } = useSelector(mainSelector);

  const initialValues = {
    content: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const createPostMutation = useMutation((body) => {
    return http.post(`posts`, body);
  });

  const getPostsMutation = useMutation(() => http.get(`posts`));

  const createPost = (body) => {
    createPostMutation.mutate(body, {
      onSuccess: () => getPosts(),
    });
  };

  const getPosts = () => {
    getPostsMutation.mutate(
      {},
      {
        onSuccess: (data) => dispatch(setPostsList(data)),
      }
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    createPost(formValues);
    setFormValues(initialValues);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={"mid-section-container"}>
      <span className={"title"}>Home Prod entrega TP2</span>
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
  );
};

export default MiddleSection;
