import { EmptyState } from "@/components/feedback/EmptyState";
import { LeadCard } from "./LeadCard";
import type { Lead } from "@/types/lead";

interface LeadListProps {
  leads: Lead[];
}

export function LeadList({
  leads,
}: LeadListProps) {
  if (leads.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {leads.map((lead) => (
        <LeadCard
          key={lead.id}
          lead={lead}
        />
      ))}
    </div>
  );
}
