import type { Block, BuilderState } from "../types/BuilderStoreProps";
import type { BlockType } from "../types/BlockType";
import {
  MAX_BLOCK_DIMENSION,
  MAX_TEXT_LENGTH,
  MIN_BLOCK_HEIGHT,
  MIN_BLOCK_WIDTH,
} from "../constants/BuilderLimits";

const BLOCK_TYPES: BlockType[] = ["text", "button", "container", "image"];

export const isBlockType = (value: unknown): value is BlockType =>
  typeof value === "string" && BLOCK_TYPES.includes(value as BlockType);

export const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isColor = (value: unknown): value is string =>
  typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);

const isTextAlign = (
  value: unknown
): value is Block["textAlign"] =>
  value === "left" || value === "center" || value === "right";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isValidBlock = (id: string, value: unknown): value is Block => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.id === id &&
    isBlockType(value.type) &&
    isFiniteNumber(value.x) &&
    value.x >= 0 &&
    isFiniteNumber(value.y) &&
    value.y >= 0 &&
    isFiniteNumber(value.width) &&
    value.width >= MIN_BLOCK_WIDTH &&
    value.width <= MAX_BLOCK_DIMENSION &&
    isFiniteNumber(value.height) &&
    value.height >= MIN_BLOCK_HEIGHT &&
    value.height <= MAX_BLOCK_DIMENSION &&
    typeof value.text === "string" &&
    value.text.length <= MAX_TEXT_LENGTH &&
    isColor(value.color) &&
    isTextAlign(value.textAlign)
  );
};

export const isValidLayout = (
  value: unknown
): value is BuilderState["layout"] => {
  if (!isRecord(value) || !isRecord(value.blocks) || !Array.isArray(value.order)) {
    return false;
  }

  const blocks = value.blocks;
  const ids = new Set(value.order);

  return (
    value.order.length === ids.size &&
    value.order.every(
      (id) => typeof id === "string" && isValidBlock(id, blocks[id])
    ) &&
    Object.keys(blocks).every((id) => ids.has(id))
  );
};

export const sanitizeBlockUpdates = (
  updates: Partial<Block>
): Partial<Block> => {
  const safeUpdates: Partial<Block> = {};

  if (typeof updates.text === "string") {
    safeUpdates.text = updates.text.slice(0, MAX_TEXT_LENGTH);
  }
  if (isFiniteNumber(updates.width)) {
    safeUpdates.width = Math.min(
      MAX_BLOCK_DIMENSION,
      Math.max(MIN_BLOCK_WIDTH, updates.width)
    );
  }
  if (isFiniteNumber(updates.height)) {
    safeUpdates.height = Math.min(
      MAX_BLOCK_DIMENSION,
      Math.max(MIN_BLOCK_HEIGHT, updates.height)
    );
  }
  if (isColor(updates.color)) {
    safeUpdates.color = updates.color;
  }
  if (isTextAlign(updates.textAlign)) {
    safeUpdates.textAlign = updates.textAlign;
  }

  return safeUpdates;
};
