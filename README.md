# hiring-robot

[v2ex][v2ex] 和 [脉脉][脉脉] 自动发帖机器人

## 用法

1. fork 一下这个项目
2. 在项目的 Settings 参考配置 [Github 密钥](#github-密钥)
3. [v2ex][v2ex] 默认每隔 2 天发一次，[脉脉][脉脉]一天发 2 次，你也可以去 `Actions` 里手动触发一次发帖

### Github 密钥

<!-- - `MASTER_EMAIL_ADDR` 签到失败时，发送错误信息的邮箱 -->

- `ROBOT_EMAIL_ADDR` 发信息的机器人邮箱地址
- `ROBOT_EMAIL_AUTH_CODE` 发信息的机器人邮箱授权密码（可以在邮箱的安全设置里找到，需要手动开启，然后复制粘贴过来）
- `ROBOT_EMAIL_SMTP_ADDR` 发信息的机器人邮箱 SMTP 服务器地址（默认值 smtp.126.com）
- `MASTER_EMAIL_ADDR` 接受信息的邮箱地址

**v2ex-robot**

- `V2EX_SESSION` v2ex 的 session, 登录账号后，在 devtool 里找到名字为 A2 的 cookie，将 value 贴进去，形如 `A2={your A2 value}`

**maimai-robot**

- `MAIMAI_USER_ID` 脉脉网站 `Cookie` 的字段 `u` 字段的值
- `MAIMAI_ACCESS_TOKEN` 脉脉网站 `Cookie` 的 `access_token` 字段的值
- `MAIMAI_CSRF_TOKEN` 脉脉网站 `Cookie` 的 `csrftoken` 字段的值
- `MAIMAI_AD_TEXT` 打算发的动态内容

[v2ex]: https://v2ex.com/
[脉脉]: https://maimai.cn/
