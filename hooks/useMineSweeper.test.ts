import useMineSweeper from './useMineSweeper';

import { renderHook } from '@testing-library/react';

const mockBoard = [
  [0, 0, 0, 0, 0],
  [0, 0, 'M', 'M', 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 'M', 0],
]

const nextBoard = [
  [ 'B', '1', 0, 0, 0 ],
  [ 'B', '1', 'M', 'M', 0 ],
  [ 'B', '1', '3', 0, 0 ],
  [ 'B', 'B', '1', 'M', 0 ]
]

jest.mock('@/components/MineSweeper/utils', () => ({
  ...jest.requireActual('@/components/MineSweeper/utils'),
  generateBoard: jest.fn(),
  placeMines: jest.fn().mockImplementation(() => mockBoard),
}));  

describe('useMineSweeper', () => {
  it('should initialize the game state correctly', () => {
    const { result } = renderHook(() => useMineSweeper());
    expect(result.current.board).toEqual(mockBoard);
    expect(result.current.isGameOver).toBe(false);
    expect(result.current.isGameWon).toBe(false);
  });
  it('should update the game state correctly', () => {
    const { result } = renderHook(() => useMineSweeper());
    result.current.updateGame([0, 0]);
    expect(result.current.isGameOver).toBe(false);
    expect(result.current.isGameWon).toBe(false);
  })
})

afterEach(() => {
  jest.clearAllMocks();
})




