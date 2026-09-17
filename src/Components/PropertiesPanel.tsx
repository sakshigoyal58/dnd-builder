import { useCallback } from "react";
import BlockPropertiesForm from "../Items/BlockPropertiesForm";
import type { Block } from "../types/BuilderStoreProps";
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
  const handleUpdate = useCallback(
    (updates: Partial<Block>) => {
      if (blockId) {
        updateBlock(blockId, updates);
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
    <BlockPropertiesForm
      block={block}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}

export default PropertiesPanel;