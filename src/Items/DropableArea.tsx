import { useDroppable } from "@dnd-kit/core";
import type { DroppableAreaProps } from "../types/DropableProps";


function DroppableArea({
  id,
  className,
  children,
}: DroppableAreaProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  );
}

export default DroppableArea;