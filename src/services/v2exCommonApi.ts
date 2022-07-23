import { AxiosResponse } from "axios";
import { API_ORIGIN, httpClient } from "../httpClient/httpClient";
import { Session } from "./v2exSessionService";

export class V2exCommonApi {
  private mainSession: Session = {
    Cookie: process.env.V2EX_SESSION as string,
  };
  private getMainSession() {
    return this.mainSession;
  }
  async getHomepage() {
    const response = await httpClient.request<null, AxiosResponse<string>>({
      method: "GET",
      url: API_ORIGIN + "/",
      responseType: "text",
      headers: {
        ...this.getMainSession(),
      },
    });
    return response;
  }
}
