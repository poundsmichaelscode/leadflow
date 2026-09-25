import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { AppError } from "../utils/api-error.js";

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  next(
    new AppError(
      `Route ${req.method} ${req.originalUrl} not found`,
      404,
      "ROUTE_NOT_FOUND",
    ),
  );
}
