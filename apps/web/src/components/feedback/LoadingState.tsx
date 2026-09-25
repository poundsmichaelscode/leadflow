export function LoadingState() {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
        Loading leads...
      </div>
    </div>
  );
}
