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

const isMoveValid = (x: number, y: number, board: MineBoard): boolean => {
  if (board[x] !== undefined && board[x][y] !== undefined && !isCellMined(x, y, board)) {
    return true
  }
  return false
}

const isCellMined = (x: number, y: number, board: MineBoard): boolean => {
  const value = board[x][y]
  return typeof value === 'string' && value !== 'x'
}

const isFoundHint = (x: number, y: number, board: MineBoard): boolean => board[x][y] !== 0

const directions: number[][] = [
  [-1, 0],  // north
  [-1, -1], // north west
  [-1, 1],  // north east
  [0, 1],   //east
  [0, -1],  // west
  [1, 0],   // south
  [1, -1],  // south west
  [1, 1],   // south east
]

//@TODO: diagonal misses neighbour cells, need to find a recursive way: from any 0 any direction

export const getVisibleCells = (x: number, y: number, board: MineBoard): number[][] => {
  const visibleCells: number[][] = []
  const origX = x
  const origY = y

  if (isFoundHint(x, y, board) || isCellMined(x, y, board)) {
    // if a mine or a hint is directly clicked on, return the coordinate
    visibleCells.push([x, y])
    console.log('coord is hint or mine');
    return visibleCells
  }

  visibleCells.push([x, y])

  // if you click on a zero return all empty cells on every direction until you find a hint or the edge of the board
  directions.forEach(direction => {
    const [nextX, nextY] = direction
    // console.log('nextX', nextX, 'nextY', nextY);
    x = origX,
    y = origY

    // skip original position so we do not get duplicates
    x += nextX
    y += nextY

    for (let i = 0; i < board.length; i++) {
      // console.log('x', x, 'y', y);
      if (!isMoveValid(x, y, board)) {
        // console.log('not valid', x, y);
        break
      }
      if (isFoundHint(x, y, board)) {
        // console.log('found hint', x, y);
        visibleCells.push([x, y])
        break
      }
      // console.log('adding', x, y);
      visibleCells.push([x, y])
      x += nextX
      y += nextY
    }
  })
  return visibleCells
}