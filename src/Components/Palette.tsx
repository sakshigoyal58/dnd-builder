import { PALETTE_ITEMS } from '../constants/PaletteItems'
import DraggableCard from '../Items/DraggableCard'
import Panel from '../Items/Panel'

function Palette() {
  return (
    <Panel title="Blocks">
      {PALETTE_ITEMS.map((item) => (
        <DraggableCard
          key={item.type}
          id={`palette-${item.type}`}
          label={item.label}
          data={{ blockType: item.type }}
        />
      ))}
    </Panel>
  )
}

export default Palette