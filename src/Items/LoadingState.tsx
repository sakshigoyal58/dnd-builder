function LoadingState({ label }: { label: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-24 items-center justify-center p-4 text-sm text-slate-500"
    >
      <span
        aria-hidden="true"
        className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-500"
      />
      {label}
    </div>
  );
}

export default LoadingState;
