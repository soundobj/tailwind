import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import { generateBoard, isCellMine, isGameCompleted, MineBoard, placeMines, updateBoard } from '../components/MineSweeper/utils';


function useMineSweeper() {
  const [board, setBoard] = useState<MineBoard>([[]]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const updateGame = ([i, j]: number[]) => {
    console.log('updateGame', i, j);
    
    const nextBoard = updateBoard(cloneDeep(board), [i, j]);
console.log('nextBoard', nextBoard);

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
    isGameWon
  };
}

export default useMineSweeper;
