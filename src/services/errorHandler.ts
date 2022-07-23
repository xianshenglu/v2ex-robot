export class ErrorHandler {
  getFormattedError(error: any, extraMessage: string): Error {
    const originalErrorMessage = error?.message
      ? error?.message + "\n" + extraMessage
      : extraMessage;
    return new Error(originalErrorMessage);
  }
}
