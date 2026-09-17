import type { BlockType } from "../types/BlockType"


export interface PaletteItem {
  type: BlockType
  label: string
}

export const PALETTE_ITEMS: PaletteItem[] = [
  { type: 'text', label: 'Text' },
  { type: 'button', label: 'Button' },
  { type: 'container', label: 'Container' },
  { type: 'image', label: 'Image' },
]