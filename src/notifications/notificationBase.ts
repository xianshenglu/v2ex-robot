export abstract class NotificationBase {
  abstract send(
    message: { title: string; body?: string },
    callback?: (error: Error | null, info?: any) => void
  ): void;
  static isAvailable() {
    return false;
  }
}
