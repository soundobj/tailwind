import { useState, useEffect } from "react"
import { cloneDeep } from "lodash"

import { sequencer } from "./utils"

const useGridAnimator = (props: GridAnimatorProps) => {
  const { inputGrid, sequence, animationClassName } = props
  let { rate } = props
  rate ||= 500
  const [grid, setGrid] = useState<any[][]>(inputGrid)

  useEffect(() => {
    // @ts-ignore
    sequencer(sequence, rate, (sequenceItem: number[][]) => {
      setGrid((prevGrid: any[][]) => {
        sequenceItem.forEach((pos) => {
          const [x, y] = pos
          prevGrid[x][y].className = animationClassName
        })
        return prevGrid
      })
    })
  }, [sequence, rate, grid, animationClassName])
}

export default useGridAnimator

  type GridAnimatorProps = {
    inputGrid: any[][],
    sequence: any[][],
    animationClassName: string,
    rate?: number,
  }
