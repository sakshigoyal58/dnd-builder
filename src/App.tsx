import { useCallback, useEffect, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import Canvas from "./Components/Canvas";
import Palette from "./Components/Palette";
import PropertiesPanel from "./Components/PropertiesPanel";
import { useBuilderStore } from "./store/useBuilderStore";

function App() {
  const [status, setStatus] = useState("Ready to build");
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

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

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex min-h-svh flex-col bg-slate-100 text-slate-900">

        {/* Toolbar */}
        <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
          <div>
            <p className="text-sm font-semibold tracking-wide text-slate-900">
              Canvas Builder
            </p>
            <p
              className="text-xs text-slate-500"
              role="status"
              aria-live="polite"
            >
              {status}
            </p>
          </div>

          <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save
          </button>

          <button
            type="button"
            onClick={handleLoad}
            className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Load
          </button>
          </div>
        </header>

        {/* Builder */}
        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)_18rem]">

          {/* Palette */}
          <aside className="border-b border-slate-200 bg-white lg:border-b-0 lg:border-r">
            <Palette />
          </aside>

          {/* Canvas */}
          <main className="min-h-[55vh] min-w-0 bg-slate-100 lg:min-h-0">
            <Canvas />
          </main>

          {/* Properties */}
          <aside className="border-t border-slate-200 bg-white lg:border-l lg:border-t-0">
            <PropertiesPanel />
          </aside>

        </div>
      </div>
    </DndContext>
  );
}

export default App;