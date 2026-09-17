import { useCallback } from "react";
import Block from "../Items/Block";
import DroppableArea from "../Items/DropableArea";
import EmptyState from "../Items/EmptyState";
import { useBuilderStore } from "../store/useBuilderStore";

function Canvas() {
  const order = useBuilderStore((s) => s.layout.order);
  const selectedId = useBuilderStore((s) => s.selectedId);
  const selectBlock = useBuilderStore((s) => s.selectBlock);
  const handleSelect = useCallback(
    (id: string) => selectBlock(id),
    [selectBlock]
  );
  const clearSelection = useCallback(
    () => selectBlock(null),
    [selectBlock]
  );

  return (
    <DroppableArea
      id="canvas"
      className="relative h-full w-full bg-gray-50"
    >
      <div
        onClick={clearSelection}
        className="absolute inset-0"
      >
        {order.length === 0 && (
          <EmptyState message="Drag a block here" />
        )}

        {order.map((id) => (
          <Block
            key={id}
            id={id}
            isSelected={id === selectedId}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </DroppableArea>
  );
}

export default Canvas;