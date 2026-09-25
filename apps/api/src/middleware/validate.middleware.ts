import type {
  NextFunction,
  Request,
  Response,
} from "express";

import type { ZodType } from "zod";

export function validate(schema: ZodType) {
  return (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      next(result.error);
      return;
    }

    if (
      result.data &&
      typeof result.data === "object" &&
      "body" in result.data
    ) {
      req.body = result.data.body;
    }

    next();
  };
}
