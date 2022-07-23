import { httpClient, API_ORIGIN } from "../httpClient/httpClient";
import { ErrorHandler } from "./errorHandler";
import { JobSourceManage } from "./jobSourceManage";
import { Notification } from "./notificatioinService";
import { V2exCommonApi } from "./v2exCommonApi";
import { JSDOM } from "jsdom";
type PostJobBody = {
  syntax: 1;
  once: number;
  title: string;
  content: string;
};
export class V2exJobManage {
  private jobSourceManage = new JobSourceManage();
  private v2exCommonApi = new V2exCommonApi();
  private notification = new Notification();
  private errorHandler = new ErrorHandler();
  private async getPostJobsBody(): Promise<PostJobBody> {
    const [{ title, header }, { data: jobsContent }, once] = await Promise.all([
      this.jobSourceManage.getJobsTitleAndHeader(),
      this.jobSourceManage.getJobsContent(),
      this.v2exCommonApi.getOnceParam(),
    ]);

    return {
      title,
      content: header + jobsContent,
      once: once as any,
      syntax: 1 as const,
    };
  }

  async postJobAd() {
    let body: PostJobBody;
    try {
      body = await this.getPostJobsBody();
    } catch (error) {
      const formattedError = this.errorHandler.getFormattedError(
        error,
        "getPostJobsBody failed"
      );
      this.notification.notify(formattedError);
      return;
    }
    try {
      const response = await this.postJob(body);
    } catch (error) {
      const formattedError = this.errorHandler.getFormattedError(
        error,
        "post v2ex job failed"
      );
      this.notification.notify(formattedError);
    }
  }
  private async postJob(data: PostJobBody) {
    const response = await this.postJobApi(data);
    const {
      window: { document },
    } = new JSDOM(response.data);
    const problem = document.querySelector("#compose .problem");
    const hasProblem = problem && problem.textContent?.trim() !== "";
    if (hasProblem) {
      return Promise.reject(new Error(problem.innerHTML));
    }
  }
  private async postJobApi(data: PostJobBody) {
    const response = await httpClient.request({
      url: API_ORIGIN + "/write",
      method: "POST",
      data,
      headers: {
        ...this.v2exCommonApi.getSession(),
        Referer: API_ORIGIN + "/write?node=jobs",
      },
      transformRequest(data: PostJobBody) {
        /**
         * @todo
         * URLSearchParams use the encodeURIComponent, but encodeURIComponent only get a similar value,
         * compared to original site, not identical. So, may need improve
         */
        const searchPrams = new URLSearchParams(data as any);
        return searchPrams.toString();
      },
    });
    return response;
  }
}
