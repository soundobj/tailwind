import {
  generateBoard,
  placeMines,
  countMines,
  updateBoard,
  countAdjacentMines,
  revealCells,
  isGameOver,
  isGameCompleted,
  isCellMine,
} from "./utils"

describe("mine sweeper", () => {
  describe('generateBoard', () => {
    it('generates board', () => {
      const expected = [
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
      ]
      expect(generateBoard(5)).toMatchObject(expected)
    })
  })
  describe('placeMines', () => {
    it('places all mines randmomly on the board', () => {
      const board = [
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
      ]
      expect(countMines(placeMines(board, 5))).toBe(5)
    })
  })
  describe('updateBoard', () => {
    it('reveals all the neighbouring hint cells of any consecutive empty cells from initial coord', () => {
      const board = [
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 'M' }, { value: 'M' }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 'M' }, { value: 0 }],
        [{ value: 0 }, { value: 'M' }, { value: 0 }, { value: 0 }, { value: 0 }],
      ]

      const expected = [
        [{ value: 'B' }, { value: '1' }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 'B' }, { value: '1' }, { value: 'M' }, { value: 'M' }, { value: 0 }],
        [{ value: 'B' }, { value: '1' }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: '1' }, { value: '1' }, { value: 0 }, { value: 'M' }, { value: 0 }],
        [{ value: 0 }, { value: 'M' }, { value: 0 }, { value: 0 }, { value: 0 }],
      ]

      const res = updateBoard(board, [0, 0])
      expect(res).toMatchObject(expected)
    })

  })
  describe('revealCells', () => {
    it('reveals all the neighbouring hint cells of any consecutive empty cells from initial coord', () => {
      const board = [
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 'M' }, { value: 'M' }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 'M' }, { value: 0 }],
        [{ value: 0 }, { value: 'M' }, { value: 0 }, { value: 0 }, { value: 0 }],
      ]

      const expected = [
        [{ value: 'B' }, { value: '1' }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 'B' }, { value: '1' }, { value: 'M' }, { value: 'M' }, { value: 0 }],
        [{ value: 'B' }, { value: '1' }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: '1' }, { value: '1' }, { value: 0 }, { value: 'M' }, { value: 0 }],
        [{ value: 0 }, { value: 'M' }, { value: 0 }, { value: 0 }, { value: 0 }],
      ]

      const res = revealCells(board, [0, 0])
      expect(res).toMatchObject(expected)
    })
  })
  describe('countAdjacentMines', () => {
    it('counts all the mines adjacent to a cell', () => {
      const board = [
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 'M' }, { value: 'M' }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
        [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 'M' }, { value: 0 }],
        [{ value: 0 }, { value: 'M' }, { value: 0 }, { value: 0 }, { value: 0 }],
      ]
      const res = countAdjacentMines(board, [0, 2])
      expect(res).toBe(2)
    })
  })
  describe('isGameOver', () => {
    it('should return true if there is an X on the board', () => {
      const board = [[{ value: ' ' }, { value: ' ' }, { value: ' ' }],
      [{ value: ' ' }, { value: 'X' }, { value: ' ' }],
      [{ value: ' ' }, { value: ' ' }, { value: ' ' }]
      ]
      expect(isGameOver(board)).toBe(true)
    })
    it('should return false if there are no Xs on the board', () => {
      const board = [[{ value: ' ' }, { value: ' ' }, { value: ' ' }],
      [{ value: ' ' }, { value: ' ' }, { value: ' ' }],
      [{ value: ' ' }, { value: ' ' }, { value: ' ' }]
      ]
      expect(isGameOver(board)).toBe(false)
    })
    it('should return false if the board is empty', () => {
      const board: { value: string }[][] = []
      expect(isGameOver(board)).toBe(false)
    })
  })
  describe('isGameCompleted', () => {
    it('should return false if there is a 0 on the board', () => {
      const board = [[{ value: ' ' }, { value: ' ' }, { value: ' ' }],
      [{ value: ' ' }, { value: 0 }, { value: ' ' }],
      [{ value: ' ' }, { value: ' ' }, { value: ' ' }]
      ]
      expect(isGameCompleted(board)).toBe(false)
    })
    it('should return true if there are no 0s on the board', () => {
      const board = [[{ value: ' ' }, { value: ' ' }, { value: ' ' }],
      [{ value: ' ' }, { value: ' ' }, { value: ' ' }],
      [{ value: ' ' }, { value: ' ' }, { value: ' ' }]
      ]
      expect(isGameCompleted(board)).toBe(true)
    })
  })
  describe('isCellMine', () => {
    it('should return true if the cell is a mine', () => {
      const board = [[{ value: ' ' }, { value: ' ' }, { value: ' ' }],
      [{ value: ' ' }, { value: 'X' }, { value: ' ' }],
      [{ value: ' ' }, { value: ' ' }, { value: ' ' }]
      ]
      expect(isCellMine(board, [1, 1])).toBe(true)
    })
    it('should return false if the cell is not a mine', () => {
      const board = [[{ value: ' ' }, { value: ' ' }, { value: ' ' }],
      [{ value: ' ' }, { value: ' ' }, { value: ' ' }],
      [{ value: ' ' }, { value: ' ' }, { value: ' ' }]
      ]
      expect(isCellMine(board, [1, 1])).toBe(false)
    })
  })
})

