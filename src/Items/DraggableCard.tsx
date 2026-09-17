import { useDraggable } from '@dnd-kit/core'
import type { DraggableCardProps } from '../types/DraggableCardProps'


function DraggableCard({ id, label, data }: DraggableCardProps) {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({ id, data })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-md border bg-white px-3 py-4 text-center text-sm shadow-sm"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {label}
    </div>
  )
}

export default DraggableCard;