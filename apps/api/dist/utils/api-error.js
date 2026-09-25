export class AppError extends Error {
    statusCode;
    code;
    details;
    constructor(message, statusCode = 500, code, details) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=api-error.js.map