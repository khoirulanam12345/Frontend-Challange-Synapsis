import axios from "axios";

const options = {
  baseURL: "https://gorest.co.in/public/v2",
  headers: {
    Authorization:
      "Bearer ecb55d60fdb5f1eb429aa66f957c845662fde80eca2b34011e340f63b1b2103f",
    "Content-Type": "application/x-www-form-urlencoded",
  },
  timeout: 600000,
};

export const axiosInstance = axios.create(options);
