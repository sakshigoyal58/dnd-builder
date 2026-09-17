import type { Block } from "../types/BuilderStoreProps";
import BlockEditorFields from "./BlockEditorFields";
import PropertyField from "./PropertyField";

type BlockPropertiesFormProps = {
  block: Block;
  onUpdate: (updates: Partial<Block>) => void;
  onDelete: () => void;
};

function BlockPropertiesForm({
  block,
  onUpdate,
  onDelete,
}: BlockPropertiesFormProps) {
  return (
    <div className="space-y-5 p-4">
      <h2 className="text-sm font-semibold text-slate-900">Properties</h2>

      <PropertyField label="Type">
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm capitalize text-slate-600">
          {block.type}
        </div>
      </PropertyField>

      <BlockEditorFields block={block} onUpdate={onUpdate} />

      <button
        type="button"
        onClick={onDelete}
        className="w-full rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
      >
        Delete block
      </button>
    </div>
  );
}

export default BlockPropertiesForm;
