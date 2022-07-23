import { NotificationService } from "./../notifications/index";
import { httpClient, API_ORIGIN } from "../httpClient/httpClient";
import { ErrorHandler } from "./errorHandler";
import { JobSourceManage } from "./jobSourceManage";
import { V2exSessionService } from "./v2exSessionService";
import { JSDOM } from "jsdom";
import { V2exCommonApi } from "./v2exCommonApi";
type PostJobBody = {
  syntax: "markdown";
  once: number;
  title: string;
  content: string;
  node_name: string;
};
export class V2exJobManage {
  private jobSourceManage = new JobSourceManage();
  private v2exSessionService = new V2exSessionService();
  private v2exCommonApi = new V2exCommonApi();
  private notification = new NotificationService();
  private errorHandler = new ErrorHandler();
  private async getPostJobsBody(): Promise<PostJobBody> {
    const [{ title, header }, { data: jobsContent }, once] = await Promise.all([
      this.jobSourceManage.getJobsTitleAndHeader(),
      this.jobSourceManage.getJobsContent(),
      this.getOnceParam(),
    ]);

    return {
      title,
      content: header + jobsContent,
      once: once as any,
      syntax: "markdown" as const,
      node_name: "jobs" as const,
    };
  }

  async getOnceParam() {
    const response = await this.v2exCommonApi.getHomepage();
    const { data: html } = response;
    const onceMatch = html.match(/once=([^"']+)["']/);
    if (!onceMatch) {
      return Promise.reject(new Error("can not get once param"));
    }
    return Number(onceMatch[1]);
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
  private getEncodeJobData(data: string) {
    return data
      .split(/ /)
      .map((str) => encodeURIComponent(str))
      .join("+");
  }
  private async postJobApi(data: PostJobBody) {
    const sessionHeader = await this.v2exSessionService.getSession();

    data.title = this.getEncodeJobData(data.title);
    data.content = this.getEncodeJobData(data.content);
    const response = await httpClient.request({
      url: API_ORIGIN + "/write",
      method: "POST",
      data,
      headers: {
        ...sessionHeader,
        Referer: API_ORIGIN + "/write?node=jobs",
      },
      transformRequest: this.serializeJobData.bind(this),
    });
    return response;
  }
  private serializeJobData(data: PostJobBody) {
    let result = `title=${data.title}&syntax=${data.syntax}&content=${data.content}&node_name=${data.node_name}&content=${data.content}&once=${data.once}`;
    // Object.entries(data).forEach(([key, val]) => {
    //   result += `${key}=${val}&`;
    // });
    // result = result.replace(/&$/, "");
    return result;
  }
}
