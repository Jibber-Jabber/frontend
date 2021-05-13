import React from "react";
import "./Home.scss";
import Post from "./Post/Post";

const Home = () => {
  const postList = [
    {
      content: "Esto es un nuevo Post",
      user: {
        name: "Juan Pepito",
      },
      date: new Date().toLocaleDateString(),
      likeCount: 10,
      commentCount: 5,
    },
    {
      content: "Otro Postt",
      user: {
        name: "Juan Pepito",
      },
      date: new Date().toLocaleDateString(),
      likeCount: 8,
      commentCount: 4,
    },
    {
      content: "Prueba de Post",
      user: {
        name: "Juan Pepito",
      },
      date: new Date().toLocaleDateString(),
      likeCount: 5,
      commentCount: 2,
    },
  ];

  return (
    <div className="home-container">
      <span>Home</span>
      <div className={"posts-container"}>
        {postList.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
