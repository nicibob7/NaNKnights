// TODO: write all errors with this class
class CustomError extends Error {
  constructor(message, origin) {
    super(message);
    this.origin = origin;
    this.timestamp = new Date();
  }

  logError() {
    console.error(`[${this.timestamp.toISOString()}][${this.origin}] ${this.message}`);
    // You could also log to a remote server or analytics service here
  }

  get toJSON() {
    return {
      message: this.message,
      timestamp: this.timestamp.toISOString(),
    };
  }

  get StackTrace() {
    return this.stack;
  }
}

module.exports = CustomError;