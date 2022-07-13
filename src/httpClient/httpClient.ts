import axios from "axios";
export const httpClient = axios.create({});
export const API_ORIGIN = "https://v2ex.com";

httpClient.defaults.headers.common["user-agent"] =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36";

httpClient.interceptors.response.use((response) => {
  return response;
});

