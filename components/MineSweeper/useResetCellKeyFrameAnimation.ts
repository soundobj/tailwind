import { hasBoardGotValue } from "./utils"

const useResetCellKeyFrameAnimation = (
  board: any,
  callback: (args: any) => void,
  interval: number = 50
) => {

  const reset = () => {

    return new Promise<void>((resolve: () => void) => {

      if (!hasBoardGotValue(board, true, 'revealed')) {
        return
      }

      callback((prevState: any[][]) => {
        const nextState = prevState.map((row) => {
          return row.map((cell) => {
            if (cell.revealed) {
              return {
                ...cell,
                reset: true,
              }
            } else {
              return cell
            }
          })
        })
        return nextState
      })

      setTimeout(() => {
        callback((prevState: any[][]) => {
          const nextState = prevState.map((row) => {
            return row.map((cell) => {
              delete cell.reset
              return cell
            })
          })
          return nextState
        })
        return resolve()
      }, interval)
    }
    )
  }

  return {
    reset,
  }

}

export default useResetCellKeyFrameAnimation