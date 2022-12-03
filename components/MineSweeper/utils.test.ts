import {
  generateBoard,
  placeMines,
  countMines,
  placeMineHints,
  getVisibleCells,
  revealCells,
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
  describe('placeMineHints', () => {
    it('places mine hints on board', () => {
      const board = [
        [0,   0,  0,  0,  0],
        [0,   0, 'x','x', 0],
        [0,   0,  0,  0,  0],
        [0,   0,  0, 'x', 0],
        [0,  'x', 0,  0,  0],
      ]
      const expected = [
        [0,   1,  2,  2,  1],
        [0,   1, 'x','x', 1],
        [0,   1,  3,  3,  2],
        [1,   1,  2, 'x', 1],
        [1,  'x', 2,  1,  1],
      ]
      const res = placeMineHints(board)      
      expect(res).toMatchObject(expected)
    })
  })
  describe('getVisibleCells', () => {
    it('places mine hints on board', () => {
      const board = [
        [0,   1,  2,  2,  1],
        [0,   1, 'x','x', 1],
        [0,   1,  3 ,  3,  2],
        [1,   1,  2, 'x', 1],
        [1,  'x', 2,  1,  1],
      ]

      const expected = [
        [0,0], 
        [0,1],
        [1,0],
        [2,0],
        [3,0],
        [1,1],
        [2,1],
      ]
      const res = getVisibleCells(0, 0, board)
      console.log('res', res);
         
      expect(res).toMatchObject(expected)
    })
  })
  describe('revealCells', () => {
    it('reveals all the neighbouring hint cells of any consecutive empty cells from initial coord', () => {
      const board = [
        [0,   1,  2,  2,  1],
        [0,   1, 'x','x', 1],
        [0,   1,  3 ,  3,  2],
        [1,   1,  2, 'x', 1],
        [1,  'x', 2,  1,  1],
      ]

      const expected = [
        [2,1], 
        [2,3],
        [2,0],
        [2,4],
        [1,0],
        [3,4],
        [1,1],
        [3,3],
        [1,2],
        [3,2],
        [1,1],
      ]
      const res = revealCells(0, 0, board)
      console.log('res', res);
      // expect(res).toMatchObject(expected)
    })
  })
  describe.only('updateBoard', () => {
    it.only('reveals all the neighbouring hint cells of any consecutive empty cells from initial coord', () => {
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
      console.log('res', res);
      expect(res).toMatchObject(expected)
    })
  })
})

