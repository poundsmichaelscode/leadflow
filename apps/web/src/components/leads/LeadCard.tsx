import { StatusBadge } from "./StatusBadge";
import type { Lead } from "@/types/lead";

interface LeadCardProps {
  lead: Lead;
}

export function LeadCard({
  lead,
}: LeadCardProps) {
  const createdDate = new Intl.DateTimeFormat(
    "en",
    {
      dateStyle: "medium",
    },
  ).format(new Date(lead.createdAt));

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold text-slate-950">
            {lead.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {lead.email}
          </p>
        </div>

        <StatusBadge status={lead.status} />
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-400">
          Added {createdDate}
        </p>
      </div>
    </article>
  );
}
