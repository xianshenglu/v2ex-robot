import { AxiosResponse } from "axios";
import { httpClient, API_ORIGIN } from "../httpClient/httpClient";

export class V2exCommonApi {
  getSession(){
    return {
      Cookie: process.env.V2EX_SESSION as string,
    };
  }
  private async getOnceParamApi() {
    const html = await httpClient.request<null, AxiosResponse<string>>({
      method: "GET",
      url: API_ORIGIN + "/",
      responseType: "text",
      headers: {
        ...this.getSession()
      },
    });
    return html;
  }
  async getOnceParam() {
    const { data: html } = await this.getOnceParamApi();
    const onceMatch = html.match(/once=([^"']+)["']/);
    if (!onceMatch) {
      return Promise.reject(new Error("can not get once param"));
    }
    return Number(onceMatch[1]);
  }
}
