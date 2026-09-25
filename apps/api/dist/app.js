import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { notFoundHandler } from "./middleware/not-found.middleware.js";
import { apiRateLimiter } from "./middleware/rate-limit.middleware.js";
import { router } from "./routes/index.js";
export const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
}));
app.use(apiRateLimiter);
app.use(express.json({
    limit: "100kb",
}));
app.use(router);
app.use(notFoundHandler);
app.use(errorHandler);
//# sourceMappingURL=app.js.map