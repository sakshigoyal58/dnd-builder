type BuilderToolbarProps = {
  status: string;
  onSave: () => void;
  onLoad: () => void;
};

function BuilderToolbar({
  status,
  onSave,
  onLoad,
}: BuilderToolbarProps) {
  return (
    <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
      <div>
        <p className="text-sm font-semibold tracking-wide text-slate-900">
          Canvas Builder
        </p>
        <p
          className="text-xs text-slate-500"
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSave}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onLoad}
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Load
        </button>
      </div>
    </header>
  );
}

export default BuilderToolbar;
