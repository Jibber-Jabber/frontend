import { post, put } from "../utils/http";

export const services = {
  login: (body) => {
    return post("auth/login", body);
  },
  editProfile: (body) => {
    return put("users/editProfile", body);
  },
};
