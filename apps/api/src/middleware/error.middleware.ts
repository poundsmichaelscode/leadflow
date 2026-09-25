import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { ZodError } from "zod";

import { env } from "../config/env.js";
import { AppError } from "../utils/api-error.js";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  if (error instanceof ZodError) {
    const fieldErrors: Record<string, string> = {};

    for (const issue of error.issues) {
      const field =
        issue.path[issue.path.length - 1]?.toString();

      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: fieldErrors,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.code
        ? {
            code: error.code,
          }
        : {}),
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    ...(env.NODE_ENV === "development" &&
    error instanceof Error
      ? {
          debug: error.message,
        }
      : {}),
  });
}
