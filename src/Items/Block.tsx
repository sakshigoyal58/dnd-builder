import { useDraggable } from "@dnd-kit/core";
import type { BlockProps } from "../types/BuilderStoreProps";


function Block({
  block,
  isSelected,
  onSelect,
}: BlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: `block-${block.id}`,
  });

  return (
    <div
  ref={setNodeRef}
  {...listeners}
  {...attributes}
  onClick={(event) => {
    event.stopPropagation();
    onSelect(block.id);
  }}
  style={{
    position: "absolute",

    left: block.x,
    top: block.y,

    width: block.width,
    height: block.height,

    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,

    zIndex: isSelected ? 10 : 1,

    backgroundColor: "#ffffff",
  }}
  className={`
    border
    p-4
    cursor-move
    ${
      isSelected
        ? "border-blue-500"
        : "border-gray-300"
    }
  `}
>
  {block.type === "image" ? (
    <div className="flex h-full items-center justify-center text-gray-400">
      Image
    </div>
  ) : (
    <div
      style={{
        color: block.color,
        textAlign: block.textAlign,
      }}
    >
      {block.text}
    </div>
  )}
</div>
  );
}

export default Block;