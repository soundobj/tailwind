import { useState, useEffect } from 'react';
import { cloneDeep, curryRight } from 'lodash';
import {
  generateBoard, addRevealedCords,
  isCellMine, isGameCompleted,
  MineBoard, placeMines,
  RevealedCoords, updateBoard,
} from '../components/MineSweeper/utils';


function useMineSweeper() {
  const [board, setBoard] = useState<MineBoard>([[]]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [revealedCoords, setRevealedCoords] = useState<RevealedCoords>(new Map());

  useEffect(() => {
    resetGame();
  }, []);

  const updateGame = ([i, j]: number[]) => {
    const nextRevealedCoords = new Map();
    const nextBoard = updateBoard(
      cloneDeep(board),
      [i, j],
      curryRight(addRevealedCords)(nextRevealedCoords)
    )
    setRevealedCoords(nextRevealedCoords)

    if (isCellMine(nextBoard, [i, j])) {
      setIsGameOver(true);
    } else if (isGameCompleted(nextBoard)) {
      setIsGameWon(true);
    }
    setBoard(nextBoard);
  };

  const resetGame = () => {
    setBoard(placeMines(generateBoard(10), 10));
    setIsGameOver(false);
    setIsGameWon(false);
  };

  return {
    board,
    updateGame,
    resetGame,
    isGameOver,
    isGameWon,
    revealedCoords,
  };
}

export default useMineSweeper;
