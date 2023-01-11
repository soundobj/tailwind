import { hasBoardGotValue } from "./utils"

const useResetCellKeyFrameAnimation = (
  board: any,
  callback: (args: any) => void,
) => {

  const reset = () => {

    return new Promise<void>((resolve: () => void) => {

      if (!hasBoardGotValue(board, true, 'revealed')) {
        return
      }

      callback((prevState: any[][]) => {
        const nextState = prevState.map((row) => row.map((cell) => ({
          ...cell,
          reset: true,
        })))
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
      })
    })
  }

  return {
    reset,
  }
}

export default useResetCellKeyFrameAnimation