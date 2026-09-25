import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { checkDatabaseHealth } from "../services/health.service.js";

export async function healthCheck(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await checkDatabaseHealth();

    res.status(200).json({
      status: "ok",
    });
  } catch (error) {
    next(error);
  }
}
