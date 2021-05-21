import { get, post } from "../utils/http";

export const services = {
  getPosts: () => {
    return get("posts");
  },
  createPost: (body) => {
    return post("posts", body);
  },
};
