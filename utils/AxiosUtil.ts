import axios from "axios";

export default function AxiosUtil() {
  let header = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return axios.create({
    baseURL: "http://localhost/api",
    headers: header,
  });
}
