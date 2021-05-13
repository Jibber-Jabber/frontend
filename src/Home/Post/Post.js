import React from "react";
import "./Post.scss";

const Post = ({ post }) => {
  return (
    <div className={"post-container"}>
      <div className={"header"}>
        <span>{post.user.name}</span>
        <span>{post.date}</span>
      </div>
      <div className={"content"}>
        <textarea>{post.content}</textarea>
      </div>
      <div className={"footer"}>
        <span>Likes {post.likeCount}</span>
        <span>Comments {post.commentCount}</span>
      </div>
    </div>
  );
};

export default Post;
