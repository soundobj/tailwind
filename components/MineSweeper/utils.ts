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
    if (board[x][y] !== 'M') {
      board[x][y] = 'M'
      i++
    }
  }
  return board
}

export const countMines = (board: MineBoard): number => {
  let foundMines = 0
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === 'M') {
        foundMines++
      }
    }
  }
  return foundMines
}

export const adjacentMines = function (board: MineBoard, x: number, y: number) {
  let numMines = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let k = y - 1; k <= y + 1; k++) {
      if (i >= 0 && i < board.length && k >= 0 && k < board[i].length && board[i][k] == 'M')
        numMines += 1;
    }
  }
  return numMines;
}
export const updateBoard = function (board: MineBoard, click: [number, number]) { //main function
  let [x, y] = click
console.log('UPDATE BOARD', x, y);

  if (board[x][y] === 'M') {
    board[x][y] = 'X' //game over
  } else {
    let numMines = adjacentMines(board, x, y)
    if (numMines > 0) {
      board[x][y] = numMines.toString()
    } else {
      board[x][y] = 'B'
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


export const isValidMove = (board: any[][], x: number, y: number): boolean => {
  return (x >= 0 && x < board.length && y >= 0 && y < board[x].length)
}

export const iterateAdjacentCells = (board: any[][], pos: [number, number], callBack: (board: any[][], pos: number[]) => void) => {
  const [x, y] = pos
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      callBack(board, [i, j])
    }
  }
}

export const countAdjacentMines = (board: MineBoard, pos: [number, number]): number => {
  let mines = 0
  iterateAdjacentCells(board, pos, (board: MineBoard, pos: number[]) => {
    const [x, y] = pos
    if (isValidMove(board, x, y) && board[x][y] === 'M') {
      mines += 1
    }
  })
  return mines
}

export const revealCells = (board: MineBoard, pos: [number, number]): MineBoard => {
  const [x, y] = pos
  if (board[x][y] === 'M') {
    board[x][y] = 'X'
    return board // GAME OVER 
  }
  const adjacentMines = countAdjacentMines(board, pos)
  if (adjacentMines) {
    board[x][y] = adjacentMines.toString()
    return board
  } else {
    board[x][y] = 'B'
    iterateAdjacentCells(board, pos, (board: MineBoard, pos: number[]) => {
      const [x, y] = pos
      if (isValidMove(board, x, y) && board[x][y] !== 'B') {
        revealCells(board, [x, y])
      }
    })
  }
  return board
}

export const hasBoardGotValue = (board: MineBoard, value: any): boolean => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === value) {
        return true;
      }
    }
  }
  return false;
}

export const isGameOver = (board: MineBoard): boolean => hasBoardGotValue(board, 'X')

export const isGameCompleted = (board: MineBoard): boolean => !hasBoardGotValue(board, 0)

export const isCellMine = (board: MineBoard, pos: [number, number]): boolean => {
  const [x, y] = pos
  return board[x][y] === 'X'
}
