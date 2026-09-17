import { create } from "zustand";
import type { Block, BuilderState } from "../types/BuilderStoreProps";
import type { BlockType } from "../types/BlockType";


const STORAGE_KEY = "react-builder-layout";
const BLOCK_TYPES: BlockType[] = ["text", "button", "container", "image"];
const MAX_TEXT_LENGTH = 1000;
const MAX_DIMENSION = 2000;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isBlockType = (value: unknown): value is BlockType =>
  typeof value === "string" && BLOCK_TYPES.includes(value as BlockType);

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isColor = (value: unknown): value is string =>
  typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);

const isTextAlign = (
  value: unknown
): value is Block["textAlign"] =>
  value === "left" || value === "center" || value === "right";

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
    value.width >= 50 &&
    value.width <= MAX_DIMENSION &&
    isFiniteNumber(value.height) &&
    value.height >= 30 &&
    value.height <= MAX_DIMENSION &&
    typeof value.text === "string" &&
    value.text.length <= MAX_TEXT_LENGTH &&
    isColor(value.color) &&
    isTextAlign(value.textAlign)
  );
};

const isValidLayout = (value: unknown): value is BuilderState["layout"] => {
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

export const useBuilderStore = create<BuilderState>((set) => ({
  layout: {
    blocks: {},
    order: [],
  },

  selectedId: null,
  

  addBlock: (type, position) => {
    const id = crypto.randomUUID();

    set((state) => {
      let x = position.x;
      let y = position.y;

      // Prevent blocks from being created exactly
      // on top of each other
      while (
        Object.values(state.layout.blocks).some(
          (block) =>
            Math.abs(block.x - x) < 20 &&
            Math.abs(block.y - y) < 20
        )
      ) {
        x += 20;
        y += 20;
      }

      const block: Block = {
        id,
        type,
        x,
        y,
        width: 200,
        height: 100,
        text: type === "image" ? "" : type === "button" ? "Button" : "Text",
        color: "#111827",
        textAlign: "left",
      };

      return {
        layout: {
          blocks: {
            ...state.layout.blocks,
            [id]: block,
          },

          order: [...state.layout.order, id],
        },

        selectedId: id,
      };
    });
  },

  selectBlock: (id) => {
    set({
      selectedId: id,
    });
  },

  updateBlock: (id, updates) => {
  set((state) => {
    const block = state.layout.blocks[id];

    if (!block) {
      return state;
    }

    const safeUpdates: Partial<Block> = {};

    if (typeof updates.text === "string") {
      safeUpdates.text = updates.text.slice(0, MAX_TEXT_LENGTH);
    }
    if (isFiniteNumber(updates.width)) {
      safeUpdates.width = Math.min(MAX_DIMENSION, Math.max(50, updates.width));
    }
    if (isFiniteNumber(updates.height)) {
      safeUpdates.height = Math.min(MAX_DIMENSION, Math.max(30, updates.height));
    }
    if (isColor(updates.color)) {
      safeUpdates.color = updates.color;
    }
    if (isTextAlign(updates.textAlign)) {
      safeUpdates.textAlign = updates.textAlign;
    }

    return {
      layout: {
        ...state.layout,

        blocks: {
          ...state.layout.blocks,

          [id]: {
            ...block,
            ...safeUpdates,
          },
        },
      },
    };
  });
},

deleteBlock: (id) => {
  set((state) => {
    const { [id]: _, ...remainingBlocks } =
      state.layout.blocks;

    return {
      layout: {
        blocks: remainingBlocks,
        order: state.layout.order.filter(
          (blockId) => blockId !== id
        ),
      },
      selectedId:
        state.selectedId === id
          ? null
          : state.selectedId,
    };
  });
},
saveLayout: () => {
    const layout =
      useBuilderStore.getState().layout;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(layout)
      );
      return true;
    } catch {
      return false;
    }
  },

  loadLayout: () => {
    try {
      const savedLayout =
        localStorage.getItem(STORAGE_KEY);

      if (!savedLayout) {
        return false;
      }

      const parsed = JSON.parse(savedLayout);

      if (!isValidLayout(parsed)) {
        return false;
      }

      set({
        layout: {
          blocks: { ...parsed.blocks },
          order: [...parsed.order],
        },
        selectedId: null,
      });
      return true;
    } catch {
      return false;
    }
  },

  updateBlockPosition: (id, x, y) => {
    set((state) => {
      const block = state.layout.blocks[id];

      if (!block) {
        return state;
      }

      return {
        layout: {
          ...state.layout,

          blocks: {
            ...state.layout.blocks,

            [id]: {
              ...block,
              x,
              y,
            },
          },
        },
      };
    });
  },
}));