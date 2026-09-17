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

  if (!block) {
    return (
      <div className="p-4 text-sm text-gray-400">
        Select a block to edit its properties.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-sm font-semibold">
        Properties
      </h2>

      {/* Type */}
      <div>
        <label className="mb-1 block text-xs font-medium">
          Type
        </label>

        <div className="rounded border bg-gray-50 px-3 py-2 text-sm">
          {block.type}
        </div>
      </div>

      {/* Text */}
      {block.type !== "image" && (
        <div>
          <label className="mb-1 block text-xs font-medium">
            Text
          </label>

          <input
            type="text"
            value={block.text}
            onChange={(event) =>
              updateBlock(block.id, {
                text: event.target.value,
              })
            }
            className="w-full rounded border px-3 py-2 text-sm"
          />
        </div>
      )}

      {/* Width */}
      <div>
        <label className="mb-1 block text-xs font-medium">
          Width
        </label>

        <input
          type="number"
          min={50}
          value={block.width}
          onChange={(event) =>
            updateBlock(block.id, {
              width: Number(event.target.value),
            })
          }
          className="w-full rounded border px-3 py-2 text-sm"
        />
      </div>

      {/* Height */}
      <div>
        <label className="mb-1 block text-xs font-medium">
          Height
        </label>

        <input
          type="number"
          min={30}
          value={block.height}
          onChange={(event) =>
            updateBlock(block.id, {
              height: Number(event.target.value),
            })
          }
          className="w-full rounded border px-3 py-2 text-sm"
        />
      </div>

      {/* Color */}
      {block.type !== "image" && (
        <div>
          <label className="mb-1 block text-xs font-medium">
            Text Color
          </label>

          <input
            type="color"
            value={block.color}
            onChange={(event) =>
              updateBlock(block.id, {
                color: event.target.value,
              })
            }
            className="h-10 w-full cursor-pointer"
          />
        </div>
      )}

      {/* Alignment */}
      {block.type !== "image" && (
        <div>
          <label className="mb-1 block text-xs font-medium">
            Alignment
          </label>

          <select
            value={block.textAlign}
            onChange={(event) =>
              updateBlock(block.id, {
                textAlign: event.target.value as
                  | "left"
                  | "center"
                  | "right",
              })
            }
            className="w-full rounded border px-3 py-2 text-sm"
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
        onClick={() => deleteBlock(block.id)}
        className="w-full rounded border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
      >
        Delete block
      </button>
    </div>
  );
}

export default PropertiesPanel;