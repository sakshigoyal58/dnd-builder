function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-3 space-y-2">
      <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">{title}</h3>
      {children}
    </div>
  )
}

export default Panel