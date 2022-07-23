import nodemailer, { SentMessageInfo } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { NotificationBase } from "./notificationBase";
const { env } = process;
export class MailNotification extends NotificationBase {
  private debugEmail = {
    user: env.ROBOT_EMAIL_ADDR as string,
    authCode: env.ROBOT_EMAIL_AUTH_CODE as string,
    smtpService: env.ROBOT_EMAIL_SMTP_ADDR || "smtp.126.com",
  };
  private sender = nodemailer.createTransport({
    host: this.debugEmail.smtpService,
    port: 465,
    secure: true,
    auth: {
      user: this.debugEmail.user,
      pass: this.debugEmail.authCode,
    },
  });
  static isAvailable() {
    const {
      ROBOT_EMAIL_ADDR,
      ROBOT_EMAIL_AUTH_CODE,
      MASTER_EMAIL_ADDR,
    } = env;
    return Boolean(
      ROBOT_EMAIL_ADDR && ROBOT_EMAIL_AUTH_CODE && MASTER_EMAIL_ADDR
    );
  }
  send(
    message: {
      title: string;
      body: string;
    },
    callback: (error: Error | null, info?: SentMessageInfo) => void = ()=>{}
  ) {
    const mailOptions: Mail.Options = {
      to: env.MASTER_EMAIL_ADDR,
      subject: `Action:V2ex: ${message.title}`,
      html: message.body,
    };
    const baseOptions = { from: this.debugEmail.user };
    this.sender.sendMail({ ...baseOptions, ...mailOptions }, callback);
  }
}
