import { Router } from "express";

import { healthRouter } from "./health.routes.js";
import { leadRouter } from "./lead.routes.js";

export const router = Router();

router.use("/health", healthRouter);

router.use("/leads", leadRouter);
