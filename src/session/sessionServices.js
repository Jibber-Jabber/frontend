import { post } from "../utils/http";

export const services = {
  login: (body) => {
    return post("auth/login", body);
  },
};
