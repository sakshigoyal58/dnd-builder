import Block from "../Items/Block";
import DroppableArea from "../Items/DropableArea";
import EmptyState from "../Items/EmptyState";
import { useBuilderStore } from "../store/useBuilderStore";

function Canvas() {
  const order = useBuilderStore((s) => s.layout.order);
  const blocks = useBuilderStore((s) => s.layout.blocks);
  const selectedId = useBuilderStore((s) => s.selectedId);
  const selectBlock = useBuilderStore((s) => s.selectBlock);

  return (
    <DroppableArea
      id="canvas"
      className="relative h-full w-full bg-gray-50"
    >
      <div
        onClick={() => selectBlock(null)}
        className="absolute inset-0"
      >
        {order.length === 0 && (
          <EmptyState message="Drag a block here" />
        )}

        {order.map((id) => (
          <Block
            key={id}
            block={blocks[id]}
            isSelected={id === selectedId}
            onSelect={selectBlock}
          />
        ))}
      </div>
    </DroppableArea>
  );
}

export default Canvas;