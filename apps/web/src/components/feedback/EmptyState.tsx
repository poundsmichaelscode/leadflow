export function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <h3 className="text-base font-semibold text-slate-900">
        No leads yet
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Add your first lead using the form above.
      </p>
    </div>
  );
}
