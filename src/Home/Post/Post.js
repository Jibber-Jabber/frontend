import React from "react";
import "./Post.scss";
import moment from "moment";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

const Post = ({ post }) => {
  return (
    <Card className={"post-container"}>
      <CardHeader
        className={"header"}
        title={post.user.name}
        subheader={moment(post.date).fromNow()}
      />
      <CardContent className={"content"}>
        <span>{post.content}</span>
      </CardContent>
      <CardActions className={"footer"}>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <span>{post.likeCount}</span>
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <span>{post.commentCount}</span>
      </CardActions>
    </Card>
  );
};

export default Post;
