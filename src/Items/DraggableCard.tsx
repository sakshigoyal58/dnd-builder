import { useDraggable } from '@dnd-kit/core'
import type { DraggableCardProps } from '../types/DraggableCardProps'


function DraggableCard({ id, label, data }: DraggableCardProps) {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({ id, data })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={0}
      aria-label={`Add ${label} block`}
      aria-grabbed={isDragging}
      className="cursor-grab rounded-lg border border-slate-200 bg-white px-3 py-3 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:cursor-grabbing"
      style={{ opacity: isDragging ? 0.55 : 1 }}
    >
      {label}
    </div>
  )
}

export default DraggableCard;