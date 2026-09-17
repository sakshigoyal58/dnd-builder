import { create } from "zustand";
import type { Block, BuilderState } from "../types/BuilderStoreProps";


const STORAGE_KEY = "react-builder-layout";

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

    return {
      layout: {
        ...state.layout,

        blocks: {
          ...state.layout.blocks,

          [id]: {
            ...block,
            ...updates,
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

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(layout)
    );
  },

  loadLayout: () => {
    const savedLayout =
      localStorage.getItem(STORAGE_KEY);

    if (!savedLayout) {
      return;
    }

    try {
      const parsed = JSON.parse(savedLayout);

      if (
        !parsed ||
        typeof parsed !== "object" ||
        !parsed.blocks ||
        !Array.isArray(parsed.order)
      ) {
        return;
      }

      set({
        layout: {
          blocks: parsed.blocks,
          order: parsed.order,
        },
        selectedId: null,
      });
    } catch {
      console.error("Invalid saved layout");
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