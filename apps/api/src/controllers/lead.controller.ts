import type {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  createLead,
  getAllLeads,
} from "../services/lead.service.js";

import { sendSuccess } from "../utils/api-response.js";

import type { CreateLeadInput } from "../validation/lead.validation.js";

export async function listLeads(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const leads = await getAllLeads();

    sendSuccess(res, 200, leads);
  } catch (error) {
    next(error);
  }
}

export async function addLead(
  req: Request<
    Record<string, never>,
    unknown,
    CreateLeadInput
  >,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const lead = await createLead(req.body);

    sendSuccess(
      res,
      201,
      lead,
      "Lead created successfully",
    );
  } catch (error) {
    next(error);
  }
}
