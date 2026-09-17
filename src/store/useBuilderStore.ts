import { create } from "zustand";
import type { Block, BuilderState } from "../types/BuilderStoreProps";
import {
  isBlockType,
  isFiniteNumber,
  isValidLayout,
  sanitizeBlockUpdates,
} from "./layoutRules";


const STORAGE_KEY = "react-builder-layout";

export const useBuilderStore = create<BuilderState>((set) => ({
  layout: {
    blocks: {},
    order: [],
  },

  selectedId: null,
  

  addBlock: (type, position) => {
    if (!isBlockType(type)) {
      return;
    }

    const id = crypto.randomUUID();

    set((state) => {
      let x = isFiniteNumber(position.x)
        ? Math.max(0, position.x)
        : 0;
      let y = isFiniteNumber(position.y)
        ? Math.max(0, position.y)
        : 0;

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

    const safeUpdates = sanitizeBlockUpdates(updates);

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
    const remainingBlocks = { ...state.layout.blocks };
    delete remainingBlocks[id];

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

      if (!block || !isFiniteNumber(x) || !isFiniteNumber(y)) {
        return state;
      }

      return {
        layout: {
          ...state.layout,

          blocks: {
            ...state.layout.blocks,

            [id]: {
              ...block,
              x: Math.max(0, x),
              y: Math.max(0, y),
            },
          },
        },
      };
    });
  },
}));