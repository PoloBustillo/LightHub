import axios from "axios";
const { NEXTAUTH_URL } = process.env;

const lightHubApi = axios.create({
  baseURL: `${NEXTAUTH_URL}/api`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default lightHubApi;
