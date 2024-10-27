import axios from "axios";

export default function AxiosUtil() {
  let header = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return axios.create({
    baseURL: "http://24.199.93.20/api",
    headers: header,
  });
}
