import axios from "axios";

const lightHubApi = axios.create({
  baseURL: "/api",
});

export default lightHubApi;
