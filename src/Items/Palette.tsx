import { useMemo } from 'react'
import { PALETTE_ITEMS } from '../constants/PaletteItems'
import DraggableCard from './DraggableCard'
import Panel from './Panel'

function Palette() {
  const items = useMemo(
    () => PALETTE_ITEMS.map((item) => ({
      ...item,
      data: { blockType: item.type },
    })),
    []
  )

  return (
    <Panel title="Blocks">
      {items.map((item) => (
        <DraggableCard
          key={item.type}
          id={`palette-${item.type}`}
          label={item.label}
          data={item.data}
        />
      ))}
    </Panel>
  )
}

export default Palette