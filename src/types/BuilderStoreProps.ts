import type { BlockType } from "./BlockType";

export type Block = {
  id: string;
  type: BlockType;

  x: number;
  y: number;

  width: number;
  height: number;

  text: string;
  color: string;
  textAlign: "left" | "center" | "right";
}


export type BuilderState = {
  layout: {
    blocks: Record<string, Block>;
    order: string[];
  };

  selectedId: string | null;

  addBlock: (
    type: BlockType,
    position: { x: number; y: number }
  ) => void;

  selectBlock: (id: string | null) => void;

  updateBlockPosition: (
    id: string,
    x: number,
    y: number
  ) => void;

  updateBlock: (
    id: string,
    updates: Partial<Block>
  ) => void;

  deleteBlock: (id: string) => void;

  saveLayout: () => boolean;
  loadLayout: () => boolean;
}