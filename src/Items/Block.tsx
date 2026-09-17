import {
  memo,
  useCallback,
  useMemo,
  type MouseEvent,
} from "react";
import { useDraggable } from "@dnd-kit/core";
import { useBuilderStore } from "../store/useBuilderStore";

type BlockProps = {
  id: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

function Block({
  id,
  isSelected,
  onSelect,
}: BlockProps) {
  const block = useBuilderStore((state) => state.layout.blocks[id]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (block) {
        onSelect(block.id);
      }
    },
    [block, onSelect]
  );
  const blockStyle = useMemo(
    () => ({
      position: "absolute" as const,
      left: block?.x ?? 0,
      top: block?.y ?? 0,
      width: block?.width ?? 200,
      height: block?.height ?? 100,
      zIndex: isSelected ? 10 : 1,
      backgroundColor: "#ffffff",
    }),
    [block?.height, block?.width, block?.x, block?.y, isSelected]
  );
  const contentStyle = useMemo(
    () => ({
      color: block?.color ?? "#111827",
      textAlign: block?.textAlign ?? "left",
    }),
    [block?.color, block?.textAlign]
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: `block-${id}`,
  });

  if (!block) {
    return null;
  }

  return (
    <div
  ref={setNodeRef}
  {...listeners}
  {...attributes}
  onClick={handleClick}
  style={{
    ...blockStyle,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
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
      style={contentStyle}
    >
      {block.text}
    </div>
  )}
</div>
  );
}

export default memo(Block);