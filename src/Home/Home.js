import React, { useEffect, useState } from "react";
import "./Home.scss";
import Post from "./Post/Post";
import * as http from "../utils/http";

const Home = () => {
  const [postList, setPostList] = useState([]);

  useEffect(async () => {
    const response = await http.get("posts");

    setPostList(response);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      content: e.target[0].value,
      username: e.target[1].value,
    };
    const response = await http.post("post", body);
  };

  return (
    <div className="home-container">
      <span className={"title"}>Home</span>
      <form onSubmit={handleSubmit}>
        <input type={"text"} placeholder={"content"} />
        <input type={"textarea"} placeholder={"message"} />
        <button type={"submit"}>Send</button>
      </form>
      <div className={"posts-container"}>
        {postList?.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
