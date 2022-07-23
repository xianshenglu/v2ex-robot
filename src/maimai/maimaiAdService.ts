import {
  maimaiHttpClient,
  MAIMAI_API_ORIGIN,
} from "../httpClients/maimaiClient";
import { NotificationService } from "../notifications";
import { ErrorHandler } from "../services/errorHandler";
const env = process.env;
export class MaiMaiAdService {
  errorHandler = new ErrorHandler();
  notification = new NotificationService();
  async postAd() {
    try {
      const response = await this.postAdApi();
    } catch (error) {
      const formattedError = this.errorHandler.getFormattedError(
        error,
        "post maimai job failed"
      );
      this.notification.notify(formattedError);
    }
  }
  postAdApi() {
    return maimaiHttpClient.request({
      method: "POST",
      url:
        MAIMAI_API_ORIGIN +
        `/groundhog/feed/v5/add?u=${env.MAIMAI_USER_ID}&version=4.0.0`,
      headers: {
        Cookie: `u=${env.MAIMAI_USER_ID}; access_token=${env.MAIMAI_ACCESS_TOKEN};csrftoken=${env.MAIMAI_CSRF_TOKEN};`,
        "X-CSRF-Token": env.MAIMAI_CSRF_TOKEN as string,
      },
      data: `text=${
        env.MAIMAI_AD_TEXT
      }&is_realname=1&hash=${new Date().getTime()}`,
    });
  }
}
