import { useCallback } from "react";
import type { Block } from "../types/BuilderStoreProps";
import {
  MAX_BLOCK_DIMENSION,
  MAX_TEXT_LENGTH,
  MIN_BLOCK_HEIGHT,
  MIN_BLOCK_WIDTH,
} from "../constants/BuilderLimits";
import NumberPropertyField from "./NumberPropertyField";
import PropertyField from "./PropertyField";

type BlockEditorFieldsProps = {
  block: Block;
  onUpdate: (updates: Partial<Block>) => void;
};

function BlockEditorFields({
  block,
  onUpdate,
}: BlockEditorFieldsProps) {
  const updateText = useCallback(
    (text: string) => onUpdate({ text }),
    [onUpdate]
  );
  const updateWidth = useCallback(
    (width: number) => onUpdate({ width }),
    [onUpdate]
  );
  const updateHeight = useCallback(
    (height: number) => onUpdate({ height }),
    [onUpdate]
  );
  const updateColor = useCallback(
    (color: string) => onUpdate({ color }),
    [onUpdate]
  );
  const updateAlignment = useCallback(
    (textAlign: Block["textAlign"]) => onUpdate({ textAlign }),
    [onUpdate]
  );

  return (
    <>
      {block.type !== "image" && (
        <PropertyField label="Text" htmlFor="block-text">
          <input
            id="block-text"
            type="text"
            value={block.text}
            maxLength={MAX_TEXT_LENGTH}
            onChange={(event) => updateText(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </PropertyField>
      )}

      <NumberPropertyField
        id="block-width"
        label="Width"
        min={MIN_BLOCK_WIDTH}
        max={MAX_BLOCK_DIMENSION}
        value={block.width}
        onChange={updateWidth}
      />

      <NumberPropertyField
        id="block-height"
        label="Height"
        min={MIN_BLOCK_HEIGHT}
        max={MAX_BLOCK_DIMENSION}
        value={block.height}
        onChange={updateHeight}
      />

      {block.type !== "image" && (
        <PropertyField label="Text Color" htmlFor="block-color">
          <input
            id="block-color"
            type="color"
            value={block.color}
            onChange={(event) => updateColor(event.target.value)}
            className="h-10 w-full cursor-pointer rounded-md border border-slate-300 bg-white p-1"
          />
        </PropertyField>
      )}

      {block.type !== "image" && (
        <PropertyField label="Alignment" htmlFor="block-alignment">
          <select
            id="block-alignment"
            value={block.textAlign}
            onChange={(event) =>
              updateAlignment(event.target.value as Block["textAlign"])
            }
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </PropertyField>
      )}
    </>
  );
}

export default BlockEditorFields;