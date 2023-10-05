import axios from "axios";
const { NEXTAUTH_URL } = process.env;

const lightHubApi = axios.create({
  baseURL: NEXTAUTH_URL + "/api",
});

export default lightHubApi;
