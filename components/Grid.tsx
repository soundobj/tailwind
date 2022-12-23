import { ComponentType } from "react"

const Grid = (props: GridProps) => {
  const { grid, onCellClick, Cell } = props

  return (
    <div className='grid grid-cols-10 max-w-lg m-auto gap-1'>
      {grid.map((row: (string | number)[], i: number) => (
        <>
          {row.map((cell, j) => (
            <div
              key={`grid_${i}_${j}`}
              onClick={typeof onCellClick === 'function' ? () => onCellClick([i, j]) : undefined}
              className="bg-gray-300 relative w-full justify-self-center border-black border before:h-0 before:inline-block before:pt-[100%] before:relative before:w-[1px]">
              <div className='absolute top-0 left-0 bottom-0 w-full grid justify-items-start align-items'>
                <Cell value={cell} />
              </div>
            </div>
          ))}
        </>
      ))}
    </div>
  )
}

interface GridProps {
  grid: any[][],
  onCellClick?: (pos: number[]) => void
  Cell: ComponentType<CellProps>
}

type CellProps = {
  value: string | number
  className?: string
}


export default Grid