import { useCallback } from "react";
import { useBuilderStore } from "../store/useBuilderStore";

function PropertiesPanel() {
  const selectedId = useBuilderStore(
    (state) => state.selectedId
  );

  const block = useBuilderStore((state) =>
    selectedId
      ? state.layout.blocks[selectedId]
      : null
  );

  const updateBlock = useBuilderStore(
    (state) => state.updateBlock
  );

  const deleteBlock = useBuilderStore(
    (state) => state.deleteBlock
  );

  const blockId = block?.id;
  const updateText = useCallback(
    (value: string) => {
      if (blockId) {
        updateBlock(blockId, { text: value });
      }
    },
    [blockId, updateBlock]
  );
  const updateWidth = useCallback(
    (value: number) => {
      if (blockId) {
        updateBlock(blockId, { width: value });
      }
    },
    [blockId, updateBlock]
  );
  const updateHeight = useCallback(
    (value: number) => {
      if (blockId) {
        updateBlock(blockId, { height: value });
      }
    },
    [blockId, updateBlock]
  );
  const updateColor = useCallback(
    (value: string) => {
      if (blockId) {
        updateBlock(blockId, { color: value });
      }
    },
    [blockId, updateBlock]
  );
  const updateAlignment = useCallback(
    (value: "left" | "center" | "right") => {
      if (blockId) {
        updateBlock(blockId, { textAlign: value });
      }
    },
    [blockId, updateBlock]
  );
  const handleDelete = useCallback(() => {
    if (blockId) {
      deleteBlock(blockId);
    }
  }, [blockId, deleteBlock]);

  if (!block) {
    return (
      <div className="p-4 text-sm text-gray-400">
        Select a block to edit its properties.
      </div>
    );
  }

  return (
    <div className="space-y-5 p-4">
      <h2 className="text-sm font-semibold text-slate-900">
        Properties
      </h2>

      {/* Type */}
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">
          Type
        </label>

        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm capitalize text-slate-600">
          {block.type}
        </div>
      </div>

      {/* Text */}
      {block.type !== "image" && (
        <div>
          <label htmlFor="block-text" className="mb-1 block text-xs font-medium text-slate-600">
            Text
          </label>

          <input
            id="block-text"
            type="text"
            value={block.text}
            maxLength={1000}
            onChange={(event) => updateText(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
      )}

      {/* Width */}
      <div>
        <label htmlFor="block-width" className="mb-1 block text-xs font-medium text-slate-600">
          Width
        </label>

        <input
          id="block-width"
          type="number"
          min={50}
          max={2000}
          value={block.width}
          onChange={(event) => updateWidth(Number(event.target.value))}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Height */}
      <div>
        <label htmlFor="block-height" className="mb-1 block text-xs font-medium text-slate-600">
          Height
        </label>

        <input
          id="block-height"
          type="number"
          min={30}
          max={2000}
          value={block.height}
          onChange={(event) => updateHeight(Number(event.target.value))}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Color */}
      {block.type !== "image" && (
        <div>
          <label htmlFor="block-color" className="mb-1 block text-xs font-medium text-slate-600">
            Text Color
          </label>

          <input
            id="block-color"
            type="color"
            value={block.color}
            onChange={(event) => updateColor(event.target.value)}
            className="h-10 w-full cursor-pointer rounded-md border border-slate-300 bg-white p-1"
          />
        </div>
      )}

      {/* Alignment */}
      {block.type !== "image" && (
        <div>
          <label htmlFor="block-alignment" className="mb-1 block text-xs font-medium text-slate-600">
            Alignment
          </label>

          <select
            id="block-alignment"
            value={block.textAlign}
            onChange={(event) =>
              updateAlignment(event.target.value as "left" | "center" | "right")
            }
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      )}

      {/* Delete */}
      <button
        type="button"
        onClick={handleDelete}
        className="w-full rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
      >
        Delete block
      </button>
    </div>
  );
}

export default PropertiesPanel;