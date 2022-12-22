import {
  bottomCornerToTopCornerSequence,
  bottomToTop,
  sequencer,
  outwardSpiral,
} from './utils';

jest.useFakeTimers();

describe('grid animatior utils', () => {
  describe('bottomCornerToTopCornerSequence', () => {
    it('should return an array of coordinates in the correct order', () => {
      const board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      const expected = [
        [2, 2],
        [2, 1],
        [2, 0],
        [1, 2],
        [1, 1],
        [1, 0],
        [0, 2],
        [0, 1],
        [0, 0],
      ];
      expect(bottomCornerToTopCornerSequence(board)).toEqual(expected);
    });
  });
  describe('bottomToTop', () => {
    it('should return an array of coordinates in the correct order', () => {
      const board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      const expected = [
        [[2, 2]],
        [[2, 1], [1, 2]],
        [[2, 0], [1, 1], [0, 2]],
        [[1, 0], [0, 1]],
        [[0, 0]],
      ];
      const visited = new Map<string, boolean>([['2,2', true]]);
      const sequence = [[[2, 2]]];
      bottomToTop(
        board,
        [[2, 2]],
        sequence,
        visited
      );
      expect(sequence).toMatchObject(expected);
    });
  });
  describe('outwardSpiral', () => {
    it('should return an array of coordinates in the correct order', () => {
      const board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      const expected = [
        [2, 2],
        [2, 3],
        [1, 3],
        [1, 2],
        [1, 1],
        [2, 1],
        [3, 1],
        [3, 2],
        [3, 3],
        [0, 3],
        [0, 2],
        [0, 1],
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0]
      ];
      const res = outwardSpiral(board);
      expect(res).toMatchObject(expected);
    });
  });
  describe('sequencer', () => {
    it('should call the callback with the correct sequence', () => {
      const sequence = [
        [[2, 2]],
        [[2, 1], [1, 2]],
        [[2, 0], [1, 1], [0, 2]],
        [[1, 0], [0, 1]],
        [[0, 0]],
      ];
      const callback = jest.fn();
      sequencer(sequence, 100, callback);
      jest.runAllTimers();
      expect(callback).toHaveBeenCalledTimes(5);
      expect(callback).toHaveBeenCalledWith([[2, 2]]);
      expect(callback).toHaveBeenCalledWith([[2, 1], [1, 2]]);
      expect(callback).toHaveBeenCalledWith([[2, 0], [1, 1], [0, 2]]);
      expect(callback).toHaveBeenCalledWith([[1, 0], [0, 1]]);
      expect(callback).toHaveBeenCalledWith([[0, 0]]);
    });
  });
});