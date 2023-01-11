import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import {
  generateBoard,
  isCellMine, isGameCompleted,
  MineBoard, placeMines, updateBoard,
} from '../components/MineSweeper/utils';

import useResetCellKeyFrameAnimation from '@/components/MineSweeper/useResetCellKeyFrameAnimation';
import { filterCoordinates, outwardSpiral, sequencer } from '@/components/GridAnimator/utils';


function useMineSweeper() {
  const [board, setBoard] = useState<MineBoard>([[]]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const { reset } = useResetCellKeyFrameAnimation(board, setBoard);

  const newGame = () => {
    setBoard(placeMines(generateBoard(10), 10));
    setIsGameOver(false);
    setIsGameWon(false);
  }

  useEffect(() => newGame(), []);

  const updateGame = ([i, j]: number[]) => {
    const nextBoard = updateBoard(
      cloneDeep(board),
      [i, j],
    )

    if (isCellMine(nextBoard, [i, j])) {
      setIsGameOver(true);
      const sequence = filterCoordinates(
        outwardSpiral(nextBoard, [i, j]),
        nextBoard,
        { value: 'M' }
      );
      sequencer(sequence, 200, (sequenceItem) => {
        const [x, y] = sequenceItem;
        const nextBoard = cloneDeep(board)
        nextBoard[x][y].className = 'mine'
        setBoard(nextBoard);
      })
    } else if (isGameCompleted(nextBoard)) {
      setIsGameWon(true);
    }
    setBoard(nextBoard);
  };

  const resetGame = () => {
    reset().then(() => newGame())
  };

  return {
    board,
    updateGame,
    resetGame,
    isGameOver,
    isGameWon,
  };
}

export default useMineSweeper;
