import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  KeyboardSensor,
  PointerSensor,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useBuilderStore } from "../store/useBuilderStore";

type BuilderController = {
  status: string;
  sensors: ReturnType<typeof useSensors>;
  handleDragEnd: (event: DragEndEvent) => void;
  handleSave: () => void;
  handleLoad: () => void;
};

export function useBuilderController(): BuilderController {
  const [status, setStatus] = useState("Ready to build");
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );
  const addBlock = useBuilderStore((state) => state.addBlock);
  const updateBlockPosition = useBuilderStore(
    (state) => state.updateBlockPosition
  );
  const saveLayout = useBuilderStore((state) => state.saveLayout);
  const loadLayout = useBuilderStore((state) => state.loadLayout);

  useEffect(() => {
    loadLayout();
  }, [loadLayout]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over, delta } = event;

    if (!over) {
      return;
    }

    const activeId = String(active.id);
    if (activeId.startsWith("block-")) {
      const blockId = activeId.slice("block-".length);
      const block = useBuilderStore.getState().layout.blocks[blockId];

      if (!block) {
        return;
      }

      updateBlockPosition(
        blockId,
        Math.max(0, block.x + delta.x),
        Math.max(0, block.y + delta.y)
      );
      return;
    }

    if (over.id !== "canvas") {
      return;
    }

    const blockType = active.data.current?.blockType;
    const initialRect = active.rect.current.initial;
    const canvasRect = over.rect;

    if (!blockType || !initialRect || !canvasRect) {
      return;
    }

    addBlock(blockType, {
      x: Math.max(0, initialRect.left + delta.x - canvasRect.left),
      y: Math.max(0, initialRect.top + delta.y - canvasRect.top),
    });
  }, [addBlock, updateBlockPosition]);

  const handleSave = useCallback(() => {
    setStatus(saveLayout() ? "Layout saved" : "Unable to save layout");
  }, [saveLayout]);

  const handleLoad = useCallback(() => {
    setStatus(
      loadLayout()
        ? "Layout loaded"
        : "No valid saved layout found"
    );
  }, [loadLayout]);

  return {
    status,
    sensors,
    handleDragEnd,
    handleSave,
    handleLoad,
  };
}

