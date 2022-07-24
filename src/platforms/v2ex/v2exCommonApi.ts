import { AxiosResponse } from "axios";
import { V2EX_API_ORIGIN, v2exHttpClient } from "./v2exHttpClient";
import { Session } from "./v2exSessionService";

export class V2exCommonApi {
  private mainSession: Session = {
    Cookie: process.env.V2EX_SESSION as string,
  };
  private getMainSession() {
    return this.mainSession;
  }
  async getHomepage() {
    const response = await v2exHttpClient.request<null, AxiosResponse<string>>({
      method: "GET",
      url: V2EX_API_ORIGIN + "/",
      responseType: "text",
      headers: {
        ...this.getMainSession(),
      },
    });
    return response;
  }
}
