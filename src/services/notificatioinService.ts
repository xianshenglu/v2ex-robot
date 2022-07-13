export class Notification {
  notify(error: Error): void {
    console.error(error.message, error.stack);
    throw error;
  }
}
