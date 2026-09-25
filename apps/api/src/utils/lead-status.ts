import { LeadStatus } from "../generated/prisma/client.js";

export const publicLeadStatuses = [
  "New",
  "Engaged",
  "Proposal Sent",
  "Closed-Won",
  "Closed-Lost",
] as const;

export type PublicLeadStatus =
  (typeof publicLeadStatuses)[number];

export function toPrismaLeadStatus(
  status: PublicLeadStatus,
): LeadStatus {
  switch (status) {
    case "New":
      return LeadStatus.New;

    case "Engaged":
      return LeadStatus.Engaged;

    case "Proposal Sent":
      return LeadStatus.ProposalSent;

    case "Closed-Won":
      return LeadStatus.ClosedWon;

    case "Closed-Lost":
      return LeadStatus.ClosedLost;
  }
}

export function toPublicLeadStatus(
  status: LeadStatus,
): PublicLeadStatus {
  switch (status) {
    case LeadStatus.New:
      return "New";

    case LeadStatus.Engaged:
      return "Engaged";

    case LeadStatus.ProposalSent:
      return "Proposal Sent";

    case LeadStatus.ClosedWon:
      return "Closed-Won";

    case LeadStatus.ClosedLost:
      return "Closed-Lost";
  }
}
