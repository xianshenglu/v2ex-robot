import { getDefaultHttpClient } from "./baseHttpClient";
export const v2exHttpClient = getDefaultHttpClient();
export const V2EX_API_ORIGIN = "https://v2ex.com";

// v2exHttpClient.interceptors.request.use((request) => {
//   request.proxy = { host: "localhost", port: 7890 };
//   return request;
// });

v2exHttpClient.interceptors.response.use((response) => {
  return response;
});
