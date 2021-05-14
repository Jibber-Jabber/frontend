import axios from "axios";
import settings from "../settings.json";

const httpClient = axios.create();

const request = (url, method, data) => {
  return httpClient({ url: settings.baseUrl + url, method, data })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const get = (url) => request(url, "GET", null);

export const post = (url, body) => request(url, "POST", body);

export const put = (url, body) => request(url, "PUT", body);

export const patch = (url, body) => request(url, "PATCH", body);
