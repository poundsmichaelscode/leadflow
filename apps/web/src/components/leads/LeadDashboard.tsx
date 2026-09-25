"use client";

import { ErrorState } from "@/components/feedback/ErrorState";
import { LoadingState } from "@/components/feedback/LoadingState";

import { LeadForm } from "./LeadForm";
import { LeadList } from "./LeadList";

import { useLeads } from "@/hooks/useLeads";

export function LeadDashboard() {
  const {
    leads,
    loading,
    submitting,
    error,
    formError,
    successMessage,
    loadLeads,
    addLead,
  } = useLeads();

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <div>
        <LeadForm
          onSubmit={addLead}
          submitting={submitting}
          serverError={formError}
        />
      </div>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Leads
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {leads.length}{" "}
              {leads.length === 1
                ? "lead"
                : "leads"}{" "}
              in your pipeline.
            </p>
          </div>
        </div>

        {successMessage ? (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </div>
        ) : null}

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={() => {
              void loadLeads();
            }}
          />
        ) : (
          <LeadList leads={leads} />
        )}
      </section>
    </div>
  );
}
