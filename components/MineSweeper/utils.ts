import { cloneDeep } from 'lodash';

export type Cell = {
  value: (number | string),
  revealed?: boolean,
  flagged?: boolean,
  className?: string,
  reset?: boolean,
}

export const generateBoard = (size: number): Cell[][] => {
  const board = []
  for (let i = 0; i < size; i++) {
    const row = []
    for (let j = 0; j < size; j++) {
      row.push({ value: 0 })
    }
    board.push(row)
  }
  return board
}

export type MineBoard = Cell[][]

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
    if (board[x][y].value !== 'M') {
      board[x][y] = { value: 'M' }
      i++
    }
  }
  return board
}


export const countMines = (board: MineBoard): number => {
  let foundMines = 0
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j].value === 'M') {
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
      if (i >= 0 && i < board.length && k >= 0 && k < board[i].length && board[i][k].value == 'M')
        numMines += 1;
    }
  }
  return numMines;
}
export const updateBoard = function (
  board: MineBoard,
  click: [number, number],
) {
  let [x, y] = click

  if (board[x][y].value === 'M') {
    board[x][y] = { value: 'X', className: 'mine', revealed: true }
  } else {
    let numMines = adjacentMines(board, x, y)
    if (numMines > 0) {
      board[x][y] = { value: numMines.toString(), className: 'adjacent', revealed: true, }
    } else {
      board[x][y] = { value: 'B', className: 'blank', revealed: true, }
      for (let a = x - 1; a <= x + 1; a++) {
        for (let b = y - 1; b <= y + 1; b++) {
          // ensure coords are valid and ignore revealed blank spaces
          if (a >= 0 && a < board.length && b >= 0 && b < board[a].length && board[a][b].value !== 'B')
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
    if (isValidMove(board, x, y) && board[x][y].value === 'M') {
      mines += 1
    }
  })
  return mines
}

export const revealCells = (board: MineBoard, pos: [number, number]): MineBoard => {
  const [x, y] = pos
  if (board[x][y].value === 'M') {
    board[x][y].value = 'X'
    return board // GAME OVER 
  }
  const adjacentMines = countAdjacentMines(board, pos)
  if (adjacentMines) {
    board[x][y].value = adjacentMines.toString()
    return board
  } else {
    board[x][y].value = 'B'
    iterateAdjacentCells(board, pos, (board: MineBoard, pos: number[]) => {
      const [x, y] = pos
      if (isValidMove(board, x, y) && board[x][y].value !== 'B') {
        revealCells(board, [x, y])
      }
    })
  }
  return board
}

export const hasBoardGotValue = (board: MineBoard, value: any, prop: keyof Cell = 'value'): boolean => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j][prop] === value) {
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
  return board[x][y].value === 'X'
}

export const getCoordsKey = (pos: [number, number]) => {
  const [x, y] = pos
  return `${x},${y}`
}

export type RevealedCoords = Map<string, [number, number]>
export const addRevealedCords = (pos: [number, number], set: RevealedCoords) => {
  set.set(getCoordsKey(pos), pos)
}

export const sanitizeBoard = (board: MineBoard): MineBoard => {
  const nextBoard = cloneDeep(board)
  return nextBoard.map((row) => row.map((cell) => {
    cell.reset = true
    cell.className = undefined
    delete cell.revealed
    return cell
  }))
}

export const clearReset = (board: MineBoard): MineBoard => {
  const nextBoard = cloneDeep(board)
  return nextBoard.map((row) => row.map((cell) => {
    delete cell.reset
    return cell
  }))
}
