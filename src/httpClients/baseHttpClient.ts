import axios from "axios";

export function getDefaultHttpClient() {
  const httpClient = axios.create({});
  httpClient.defaults.headers.common["user-agent"] =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36";
  return httpClient; 
}
