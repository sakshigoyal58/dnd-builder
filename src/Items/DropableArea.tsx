import { useDroppable } from "@dnd-kit/core";
import type { DroppableAreaProps } from "../types/DropableProps";


function DroppableArea({
  id,
  className,
  "aria-label": ariaLabel,
  children,
}: DroppableAreaProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}

export default DroppableArea;