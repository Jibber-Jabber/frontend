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
import { DeleteOutline, Favorite } from "@material-ui/icons";
import { useMutation } from "react-query";
import * as http from "../../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { sessionSelector } from "../../../session/sessionSlice";
import { setPostsList } from "../../mainSlice";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const deletePostMutation = useMutation(() => {
    return http.deleteReq(`posts/${post.postId}`);
  });

  const likePostMutation = useMutation(() => {
    return http.post(`posts/like/${post.postId}`);
  });

  const unlikePostMutation = useMutation(() => {
    return http.post(`posts/unlike/${post.postId}`);
  });

  const { userInfo } = useSelector(sessionSelector);

  const getPostsMutation = useMutation(() => http.get(`posts`));

  const getPosts = () => {
    getPostsMutation.mutate(
      {},
      {
        onSuccess: (data) => dispatch(setPostsList(data)),
      }
    );
  };

  const handleDelete = async () => {
    deletePostMutation.mutate(
      {},
      {
        onSuccess: () => getPosts(),
      }
    );
  };

  const handleLike = async () => {
    likePostMutation.mutate(
      {},
      {
        onSuccess: () =>
          getPostsMutation.mutate(
            {},
            {
              onSuccess: (data) => dispatch(setPostsList(data)),
            }
          ),
      }
    );
  };

  const handleUnlike = async () => {
    unlikePostMutation.mutate(
      {},
      {
        onSuccess: () =>
          getPostsMutation.mutate(
            {},
            {
              onSuccess: (data) => dispatch(setPostsList(data)),
            }
          ),
      }
    );
  };

  return (
    <Card className={"post-container"}>
      <CardHeader
        className={"header"}
        title={"@" + post.user.username}
        subheader={moment(post.creationDate)
          .utcOffset("-06:00")
          .format("YYYY-MM-DD HH:mm")}
      />
      <CardContent className={"content"}>
        <span>{post.content}</span>
      </CardContent>
      <CardActions className={"footer"}>
        <IconButton>
          {post.likedByUser ? (
            <Favorite onClick={handleUnlike} />
          ) : (
            <FavoriteBorderIcon onClick={handleLike} />
          )}
        </IconButton>
        <span>{post.likeCount}</span>
        {post.user.username === userInfo?.username && (
          <IconButton className={"delete-post-btn"} onClick={handleDelete}>
            <DeleteOutline />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
