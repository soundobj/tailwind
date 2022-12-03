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

// export const placeMineHints = (board: MineBoard): MineBoard => {
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board.length; j++) {
//       const cell = board[i][j]
//       if (cell === 'x') {
//         continue
//       }
//       board[i][j] = getAdjacentMineCount(i, j, board)
//     }
//   }
//   return board
// }

export const adjacentMines = function (board: MineBoard, x: number, y: number) {
  let numMines = 0;
  // check all 8 squares around the click
  for (let i = x - 1; i <= x + 1; i++) { 
    for (let k = y - 1; k <= y + 1; k++) {
      // ensure coords are valid
      if (i >= 0 && i < board.length && k >= 0 && k < board[i].length && board[i][k] == 'M') 
        numMines += 1;
    }
  }
  return numMines;
}
export const updateBoard = function (board: MineBoard, click: [number, number]) { //main function
  let [x, y] = click
  if (board[x][y] === 'M') { 
    board[x][y] = 'X' //game over
  } else {
    let numMines = adjacentMines(board, x, y)
    if (numMines > 0) {
      board[x][y] = numMines.toString()
    } else {
      board[x][y] = 'B'
       // check all 8 squares around the click
      for (let a = x - 1; a <= x + 1; a++) {
        for (let b = y - 1; b <= y + 1; b++) {
          // ensure coords are valid and ignore revealed blank spaces
          if (a >= 0 && a < board.length && b >= 0 && b < board[a].length && board[a][b] !== 'B')
            updateBoard(board, [a, b])
        }
      }
    }
  }
  return board;
};