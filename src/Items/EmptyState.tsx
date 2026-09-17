function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex h-full min-h-56 items-center justify-center p-6 text-center">
      <div className="max-w-xs rounded-xl border border-dashed border-slate-300 bg-white/70 px-6 py-8 shadow-sm">
        <p className="text-sm font-medium text-slate-600">{message}</p>
        <p className="mt-1 text-xs text-slate-400">
          Choose a block from the palette to get started.
        </p>
      </div>
    </div>
  )
}

export default EmptyState;