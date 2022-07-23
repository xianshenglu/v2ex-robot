import { DummyNotification } from "./dummyNotification";
import { MailNotification } from "./mailNotification";
import { NotificationBase } from "./notificationBase";

export class NotificationService {
  private notificationService!: NotificationBase;
  constructor() {
    this.initNotificationService();
  }
  private initNotificationService() {
    if (MailNotification.isAvailable()) {
      this.notificationService = new MailNotification();
      return;
    }
    this.notificationService = new DummyNotification();
  }
  notify(error: Error): void {
    this.notificationService.send(
      { title: error.message, body: error.stack },
      (error) => {
        if (error) {
          process.exit(1);
        }
        process.exit(0);
      }
    );
  }
}
