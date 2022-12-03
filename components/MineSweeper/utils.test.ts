import {
  generateBoard,
  placeMines,
  countMines,
  updateBoard,
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
})

