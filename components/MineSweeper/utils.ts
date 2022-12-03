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

const UP = [-1, 0]
const RIGHT = [0, 1]
const DOWN = [1, 0]
const LEFT = [0, -1]

export const DOWN_RIGHT = [DOWN, RIGHT, UP, RIGHT]
export const UP_LEFT = [UP, LEFT, DOWN, LEFT]

export const traverseBoard = (
  x: number,
  y: number,
  board: MineBoard,
  traverseSteps: number[][],
  cellValueCallBack?: (value: string | number) => 'BREAK' | 'CONTINUE' | 'CHANGE_DIR'
): number[][] => {
  const boardLocations = []
  let direction = 0
  let invalidMoves = 0 // end of board === two invalid moves in a row
  let lastInvalidMoveIndex = undefined
  const boardCells = board.length * board[0].length
  for (let i = 0; i < boardCells; i++) {
    const [ix, iy] = traverseSteps[direction]
    x += ix
    y += iy
    if (!isMoveValid(x, y, board) && invalidMoves > 1) {
      // console.log('we are at the end');
      break
    } else if (!isMoveValid(x, y, board)) {
      // console.log('change direction');
      lastInvalidMoveIndex = i
      invalidMoves += 1
      if (direction === 3) {
        direction = 0
      } else {
        direction += 1
      }
      continue
    }
    if (lastInvalidMoveIndex !== undefined) {
      invalidMoves = 0
    }
    boardLocations.push([x, y])
    // console.log('direction', direction, 'loc:', [x, y]);
  }

  return boardLocations
}


export const revealCells = (x: number, y: number, board: MineBoard): number[][] => {
  const visitedCells = new Set<string>()
  const visibleCells: number[][] = []
  if (isFoundHint(x, y, board) || isCellMined(x, y, board)) {
    // if a mine or a hint is directly clicked on, return the coordinate
    visibleCells.push([x, y])
    console.log('coord is hint or mine');
    return visibleCells
  }

  visibleCells.push([x, y])
  visitedCells.add(`${x}${y}`)

  const recursiveEmptyCells = (x: number, y: number, board: MineBoard) => {
    // console.log('x', x, 'y', y);    
    for (let i = 0; i < directions.length; i++) {
      const [ix, iy] = directions[i]
      let tx = y + ix
      let ty = y + iy
      if (!isMoveValid(tx, ty, board) || isCellMined(tx, ty, board) || visitedCells.has(`${tx}${ty}`)) {
        console.log('not vaild or already visited', tx, ty);
        continue
      }
      if (isFoundHint(tx, ty, board)) {
        visibleCells.push([tx, ty])
        visitedCells.add(`${tx}${ty}`)
        console.log('coord is hint', tx, ty);
        continue
      }
      visibleCells.push([tx, ty])
      visitedCells.add(`${tx}${ty}`)
      recursiveEmptyCells(tx, ty, board)

    }
  }

  recursiveEmptyCells(x, y, board)
  console.log('visitedCells', visitedCells);

  return visibleCells

}

export const adjacentMines = function (board: MineBoard, x: number, y: number) {
  let numMines = 0;
  //loops to check all 8 squares around the click
  for (let i = x - 1; i <= x + 1; i++) { 
    for (let k = y - 1; k <= y + 1; k++) {
      //makes sure the algorithm is only checking squares that are ON the board
      if (i >= 0 && i < board.length && k >= 0 && k < board[i].length && board[i][k] == 'M') 
        numMines += 1;
    }
  }

  return numMines;
}
export const updateBoard = function (board: MineBoard, click: [number, number]) { //main function
  if (!board) return board

  let [x, y] = click
  if (board[x][y] === 'M') { //game over
    board[x][y] = 'X';
  } else {
    let numMines = adjacentMines(board, x, y);
    if (numMines > 0) {
      board[x][y] = numMines.toString()
    } else {
      board[x][y] = 'B'
      for (let a = x - 1; a <= x + 1; a++) { //another nested loop to check all 8 squares around a click
        for (let b = y - 1; b <= y + 1; b++) { // this time we're looking for squares around the click that are NOT blank
          //making sure we stay on the board here 
          if (a >= 0 && a < board.length && b >= 0 && b < board[a].length && board[a][b] !== 'B')
            updateBoard(board, [a, b])
        }
      }
    }
  }
  return board;
};