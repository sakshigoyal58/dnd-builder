import { useCallback, useEffect } from "react";
import {
  DndContext,
  type DragEndEvent,
} from "@dnd-kit/core";

import Canvas from "./Components/Canvas";
import Palette from "./Components/Palette";
import PropertiesPanel from "./Components/PropertiesPanel";
import { useBuilderStore } from "./store/useBuilderStore";

function App() {
  const addBlock = useBuilderStore(
    (state) => state.addBlock
  );

  const updateBlockPosition = useBuilderStore(
    (state) => state.updateBlockPosition
  );

  const saveLayout = useBuilderStore(
    (state) => state.saveLayout
  );

  const loadLayout = useBuilderStore(
    (state) => state.loadLayout
  );

  // Load saved layout when the application starts
  useEffect(() => {
    loadLayout();
  }, [loadLayout]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over, delta } = event;

    if (!over) {
      return;
    }

    // Existing block
    if (String(active.id).startsWith("block-")) {
      const blockId = String(active.id).replace(
        "block-",
        ""
      );

      const block =
        useBuilderStore.getState().layout.blocks[
          blockId
        ];

      if (!block) {
        return;
      }

      const newX = Math.max(
        0,
        block.x + delta.x
      );

      const newY = Math.max(
        0,
        block.y + delta.y
      );

      updateBlockPosition(
        blockId,
        newX,
        newY
      );

      return;
    }

    // Palette -> Canvas
    if (over.id !== "canvas") {
      return;
    }

    const blockType =
      active.data.current?.blockType;

    if (!blockType) {
      return;
    }

    const initialRect =
      active.rect.current.initial;

    const canvasRect = over.rect;

    if (!initialRect || !canvasRect) {
      return;
    }

    const x =
      initialRect.left +
      delta.x -
      canvasRect.left;

    const y =
      initialRect.top +
      delta.y -
      canvasRect.top;

    addBlock(blockType, {
      x: Math.max(0, x),
      y: Math.max(0, y),
    });
  }, [addBlock, updateBlockPosition]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen flex-col">

        {/* Toolbar */}
        <header className="flex h-12 items-center justify-end gap-2 border-b bg-white px-4">
          <button
            type="button"
            onClick={saveLayout}
            className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            Save
          </button>

          <button
            type="button"
            onClick={loadLayout}
            className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            Load
          </button>
        </header>

        {/* Builder */}
        <div className="flex min-h-0 flex-1">

          {/* Palette */}
          <aside className="w-60 border-r">
            <Palette />
          </aside>

          {/* Canvas */}
          <main className="min-w-0 flex-1">
            <Canvas />
          </main>

          {/* Properties */}
          <aside className="w-60 border-l">
            <PropertiesPanel />
          </aside>

        </div>
      </div>
    </DndContext>
  );
}

export default App;