import axios from "axios";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosApi;
