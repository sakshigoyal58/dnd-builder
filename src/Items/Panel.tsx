function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </h2>
      {children}
    </div>
  )
}

export default Panel