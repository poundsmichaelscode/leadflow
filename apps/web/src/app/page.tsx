import { LeadDashboard } from "@/components/leads/LeadDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Leadflow
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Lead Manager
          </h1>

          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Manage and track your leads from one clean dashboard.
          </p>
        </header>

        <LeadDashboard />
      </div>
    </main>
  );
}
