import { AxiosResponse } from "axios";
import { httpClient } from "../httpClient/httpClient";

export class JobSourceManage {
  JOB_BASE_URL =
    "https://raw.githubusercontent.com/xianshenglu/microfocus-hiring/main";

  async getJobsTitleAndHeader() {
    const response = await httpClient.request<null, AxiosResponse<string>>({
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
    return httpClient.request({
      url: this.JOB_BASE_URL + "/jd-list-simple.md",
      method: "GET",
    });
  }
}
