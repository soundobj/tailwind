import {
  generateBoard,
  placeMines,
  countMines,
  updateBoard,
  countAdjacentMines,
  revealCells
} from "./utils"

describe("mine sweeper", () => {
  describe('generateBoard', () => {
    it('generates board', () => {
      const expected = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]
      expect(generateBoard(5)).toMatchObject(expected)
    })
  })
  describe('placeMines', () => {
    it('places all mines randmomly on the board', () => {
      const board = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]
      expect(countMines(placeMines(board, 5))).toBe(5)
    })
  })
  describe('updateBoard', () => {
    it('reveals all the neighbouring hint cells of any consecutive empty cells from initial coord', () => {
      const board = [
        [0,   0,  0,  0, 0],
        [0,   0, 'M','M', 0],
        [0,   0,  0 ,  0,  0],
        [0,   0,  0, 'M', 0],
        [0,  'M', 0,  0,  0],
      ]

      const expected = [
        [ 'B', '1', 0, 0, 0 ],
        [ 'B', '1', 'M', 'M', 0 ],
        [ 'B', '1', 0, 0, 0 ],
        [ '1', '1', 0, 'M', 0 ],
        [ 0, 'M', 0, 0, 0 ]
      ]

      const res = updateBoard(board, [0, 0])
      expect(res).toMatchObject(expected)
    })
  })
  describe('revealCells', () => {
    it('reveals all the neighbouring hint cells of any consecutive empty cells from initial coord', () => {
      const board = [
        [0,   0,  0,  0, 0],
        [0,   0, 'M','M', 0],
        [0,   0,  0 ,  0,  0],
        [0,   0,  0, 'M', 0],
        [0,  'M', 0,  0,  0],
      ]

      const expected = [
        [ 'B', '1', 0, 0, 0 ],
        [ 'B', '1', 'M', 'M', 0 ],
        [ 'B', '1', 0, 0, 0 ],
        [ '1', '1', 0, 'M', 0 ],
        [ 0, 'M', 0, 0, 0 ]
      ]

      const res = revealCells(board, [0, 0])
      expect(res).toMatchObject(expected)
    })
  })
  describe('countAdjacentMines', () => {
    it('counts all the mines adjacent to a cell', () => {
      const board = [
        [0,   0,  0,  0, 0],
        [0,   0, 'M','M', 0],
        [0,   0,  0 ,  0,  0],
        [0,   0,  0, 'M', 0],
        [0,  'M', 0,  0,  0],
      ]
      const res = countAdjacentMines(board, [0, 2])
      expect(res).toBe(2)
    })
  })
})

