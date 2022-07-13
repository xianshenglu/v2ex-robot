# v2ex-robot

帮你在 [v2ex][[v2ex](https://v2ex.com/)] 自动发帖

## 用法

1. fork 一下这个项目
2. 在项目的 Settings 参考配置 [Github 密钥](#github-密钥)
3. 默认每隔 2 天的早上 8:45 会发帖，你也可以去 Actions 里手动触发一次发帖
  
### Github 密钥

- `V2EX_SESSION` v2ex 的 session, 登录账号后，在 devtool 里找到名字为 A2 的 cookie，将 value 贴进去，形如 `V2EX_SESSION=A2={your A2 value}`
<!-- - `MASTER_EMAIL_ADDR` 签到失败时，发送错误信息的邮箱 -->
