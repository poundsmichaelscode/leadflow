import { Router } from "express";

import {
  addLead,
  listLeads,
} from "../controllers/lead.controller.js";

import { validate } from "../middleware/validate.middleware.js";

import { createLeadSchema } from "../validation/lead.validation.js";

export const leadRouter = Router();

leadRouter.get("/", listLeads);

leadRouter.post(
  "/",
  validate(createLeadSchema),
  addLead,
);
