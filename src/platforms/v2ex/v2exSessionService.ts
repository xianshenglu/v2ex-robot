import cookieParser from "set-cookie-parser";
import { v2exHttpClient } from "./v2exHttpClient";
import { V2exCommonApi } from "./v2exCommonApi";
export type Session = {
  Cookie: string;
};
export class V2exSessionService {
  private v2exCommonApi = new V2exCommonApi();
  async initSession() {
    const response = await this.v2exCommonApi.getHomepage();
    const setCookiesHeaders = response.headers["set-cookie"] || [];
    const cookieStr = this.getSessionCookie(setCookiesHeaders);
    v2exHttpClient.defaults.headers.common.Cookie = cookieStr;
  }

  private getSessionCookie(setCookiesHeaders: string[]) {
    const sessionCookies = setCookiesHeaders
      .map((cookieStr) => {
        const cookie = cookieParser.parseString(cookieStr);
        return cookie;
      })
      .filter((cookie) =>
        ["V2EX_LANG", "PB3_SESSION", "V2EX_TAB"].includes(cookie.name)
      );

    const cookieStr =
      sessionCookies.reduce((acc, cookie) => {
        return acc + cookie.name + "=" + cookie.value + "; ";
      }, "") + process.env.V2EX_SESSION;
    return cookieStr;
  }
}
