import axios from "axios";
const { NEXT_PUBLIC_NEXTAUTH_URL } = process.env;
const url = `${NEXT_PUBLIC_NEXTAUTH_URL}/api`;

const lightHubApi = axios.create({
  baseURL: url,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default lightHubApi;
