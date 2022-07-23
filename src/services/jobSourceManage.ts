import { AxiosResponse } from "axios";
import { githubHttpClient } from "../httpClients/githubHttpClient";

export class JobSourceManage {
  JOB_BASE_URL =
    "https://raw.githubusercontent.com/xianshenglu/microfocus-hiring/main";

  async getJobsTitleAndHeader() {
    const response = await githubHttpClient.request<
      null,
      AxiosResponse<string>
    >({
      url: this.JOB_BASE_URL + "/header-encoded.md",
      method: "GET",
    });
    const jobsHeaderList = response.data.trim().split("\n");
    return {
      title: jobsHeaderList[0].replace(/#/g, "").trim(),
      header: jobsHeaderList.slice(1).join("\n"),
    };
  }
  async getJobsContent() {
    return githubHttpClient.request({
      url: this.JOB_BASE_URL + "/jd-list-simple.md",
      method: "GET",
    });
  }
}
