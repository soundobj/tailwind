import { ComponentType } from "react"
import { Cell as CellType } from "./MineSweeper/utils"
import React from 'react'

const Grid = (props: GridProps) => {
  const { grid, onCellClick, Cell } = props

  return (
    <div className='grid grid-cols-10 max-w-lg m-auto gap-1'>
      {grid.map((row: CellType[], i: number) => (
        <React.Fragment key={`grid_fragment_${i}`}>
          {row.map((cell, j) => (
            <div
              key={`grid_${i}_${j}`}
              onClick={typeof onCellClick === 'function' ? () => onCellClick([i, j]) : undefined}
              className="bg-gray-300 relative w-full justify-self-center border-black border before:h-0 before:inline-block before:pt-[100%] before:relative before:w-[1px]">
              <div className='absolute top-0 left-0 bottom-0 w-full grid justify-items-start align-items'>
                <Cell {...cell} />
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}

interface GridProps {
  grid: any[][],
  onCellClick?: (pos: number[]) => void
  Cell: ComponentType<CellType>
}

export default Grid