import { getDefaultHttpClient } from "./baseHttpClient";
export const githubHttpClient = getDefaultHttpClient();

githubHttpClient.interceptors.response.use((response) => {
  return response;
});
