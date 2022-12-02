export const generateBoard = (size: number): number[][] => {
  const board = []
  for (let i = 0; i < size; i++) {
    const row = []
    for (let j = 0; j < size; j++) {
      row.push(0)
    }
    board.push(row)
  }
  return board
}

export type MineBoard = (number | string)[][]

export const getRandomCoordinates = (boardLength: number) => {
  return [
    Math.floor(Math.random() * boardLength),
    Math.floor(Math.random() * boardLength),
  ]
}

export const placeMines = (board: MineBoard, mines: number): MineBoard => {
  if (board.length * 2 <= mines) {
    throw new Error('size of mines should not exceed board size')
  }
  for (let i = 0; i < mines;) {
    const [x, y] = getRandomCoordinates(board.length)
    if (board[x][y] !== 'x') {
      board[x][y] = 'x'
      i++
    }
  }
  return board
}

export const countMines = (board: MineBoard): number => {
  let foundMines = 0
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === 'x') {
        foundMines++
      }
    }
  }
  return foundMines
}

/*
  [n-1][n-1] ->  [n-1][n] -> [n-1][n+1]
  [n][n-1] ->    [n][n] ->   [n][n+1]
  [n+1][n-1] ->  [n+1][n] -> [n+1][n+1]
*/
export const getAdjacentMineCount = (x: number, y: number, board: MineBoard): number => {
  const deviations = [-1, 0, 1]
  let mineCount = 0
  for (let i = 0; i < deviations.length; i++) {
    for (let j = 0; j < deviations.length; j++) {
      const testX = deviations[i] + x
      const testY = deviations[j] + y
      if (board[testX] !== undefined && board[testX][testY] !== undefined) {
        mineCount += board[testX][testY] === 'x' ? 1 : 0
      }
    }
  }
  return mineCount
}

export const placeMineHints = (board: MineBoard): MineBoard => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const cell = board[i][j]
      if (cell === 'x') {
        continue
      }
      board[i][j] = getAdjacentMineCount(i, j, board)
    }
  }
  return board
}

/*
  if you click on a mine or a hint just return the coordinate
  if you click on a zero return all empty cells on every direction until you find a hint or the edge of the board

  0 0 0 0 0
  -2 -1 x +1 +2
  0 0 0 0 0
*/
export const getVisibleCells = (x: number, y: number, board: MineBoard): number[][] => {
  const directions = [
    //north
    {
      foundHint: false,
      nextPos: (x: number, y: number): [number, number] => [x + 1, y]
    }
  ]

}