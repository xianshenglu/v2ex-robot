import { NotificationBase } from "./notificationBase";
const { env } = process;
export class DummyNotification extends NotificationBase {
  static isAvailable() {
    return true;
  }
  send(
    message: {
      title: string;
      body: string;
    },
    callback?: (error: Error | null, info?: any) => void
  ) {
    // console.log(message);
    callback && callback(null, null);
  }
}
