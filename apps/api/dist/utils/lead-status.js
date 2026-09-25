import { LeadStatus } from "../generated/prisma/client.js";
export const publicLeadStatuses = [
    "New",
    "Engaged",
    "Proposal Sent",
    "Closed-Won",
    "Closed-Lost",
];
export function toPrismaLeadStatus(status) {
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
export function toPublicLeadStatus(status) {
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
//# sourceMappingURL=lead-status.js.map