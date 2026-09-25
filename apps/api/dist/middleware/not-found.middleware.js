import { AppError } from "../utils/api-error.js";
export function notFoundHandler(req, _res, next) {
    next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404, "ROUTE_NOT_FOUND"));
}
//# sourceMappingURL=not-found.middleware.js.map