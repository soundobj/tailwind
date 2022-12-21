import { useState, useEffect } from "react"
import { cloneDeep } from "lodash"

import { sequencer } from "./utils"

const useGridAnimator = (props: GridAnimatorProps) => {
  const { inputGrid, rate, sequence, animationClassName } = props
  const [grid, setGrid] = useState<any[][]>(inputGrid)

  useEffect(() => {
    sequencer(sequence, rate, (sequenceItem: number[][]) => {
      const newGrid = cloneDeep(grid)
      sequenceItem.forEach((pos) => {
        const [x, y] = pos
        newGrid[x][y].className = animationClassName
      })
      setGrid(newGrid)
    })
  }, [sequence, rate, grid, animationClassName])
}

export default useGridAnimator

type GridAnimatorProps = {
  inputGrid: any[][],
  rate: number, // in ms
  sequence: any[][],
  animationClassName: string,
}
