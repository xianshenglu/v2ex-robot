import {
  maimaiHttpClient,
  MAIMAI_API_ORIGIN,
} from "../httpClients/maimaiClient";
const env = process.env;
export class MaiMaiAdService {
  postAd() {
    maimaiHttpClient.request({
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
