import {
  Prisma,
  type Lead,
} from "../generated/prisma/client.js";

import { prisma } from "../config/database.js";

import type { CreateLeadInput } from "../validation/lead.validation.js";

import {
  toPrismaLeadStatus,
  toPublicLeadStatus,
} from "../utils/lead-status.js";

import { AppError } from "../utils/api-error.js";

function serializeLead(lead: Lead) {
  return {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    status: toPublicLeadStatus(lead.status),
    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,
  };
}

export async function getAllLeads() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return leads.map(serializeLead);
}

export async function createLead(
  input: CreateLeadInput,
) {
  try {
    const lead = await prisma.lead.create({
      data: {
        name: input.name,
        email: input.email,
        status: toPrismaLeadStatus(input.status),
      },
    });

    return serializeLead(lead);
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AppError(
        "A lead with this email already exists",
        409,
        "DUPLICATE_EMAIL",
      );
    }

    throw error;
  }
}
