import { getDefaultHttpClient } from "../../httpClients/baseHttpClient";

export const maimaiHttpClient = getDefaultHttpClient();
export const MAIMAI_API_ORIGIN = "https://maimai.cn";

// maimaiHttpClient.interceptors.request.use((request) => {
//   request.proxy = { host: "localhost", port: 8888 };
//   return request;
// });
