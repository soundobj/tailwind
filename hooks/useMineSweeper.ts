import { useState, useEffect } from 'react';

import { cloneDeep } from 'lodash';
import {
  generateBoard,
  hasBoardGotValue,
  isCellMine, isGameCompleted,
  MineBoard, placeMines, updateBoard,
} from '../components/MineSweeper/utils';

import { filterCoordinates, outwardSpiralSequence, sequencer, bottomToTopSequence } from '@/components/GridAnimator/utils';


function useMineSweeper() {
  const [board, setBoard] = useState<MineBoard>([[]]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isResetingGame, setisResetingGame] = useState(false);
  const [isBoardReset, setIsBoardReset] = useState(false);
  const [isSquencerStarted, setIsSquencerStarted] = useState(false);

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
        outwardSpiralSequence(nextBoard, [i, j]),
        nextBoard,
        { value: 'M' }
      );
      sequencer(sequence, 200, (sequenceItem) => {
        const [x, y] = sequenceItem;
        const nextBoard = cloneDeep(board)
        nextBoard[x][y].className = 'mine'
        nextBoard[x][y].revealed = true
        setBoard(nextBoard);
      })
    } else if (isGameCompleted(nextBoard)) {
      setIsGameWon(true);
    }
    setBoard(nextBoard);
  };

  const resetGame = () => {
    const nextBoard = cloneDeep(board)

    //sanitize board of old classes
    nextBoard.map((row) => row.map((cell) => {
      cell.reset = true
      cell.className = undefined
      delete cell.revealed
      return cell
    }))

    // console.log(JSON.stringify(nextBoard));

    setBoard(nextBoard)
    setisResetingGame(true)
  };

  useEffect(() => {
    if (!isResetingGame) {
      return
    }

    if (board[0][0].reset) {
      const nextBoard = cloneDeep(board)
      nextBoard.map((row) => row.map((cell) => {
        delete cell.reset
        return cell
      }))

      setBoard(nextBoard)
      setIsBoardReset(true)
      return
    }

    if (isBoardReset && !isSquencerStarted) {
      const resetSequence = bottomToTopSequence(board)

      sequencer(resetSequence, 60, (sequenceItem) => {
        const nextBoard = cloneDeep(board)
        sequenceItem.map((item: number[]) => {
          const [x, y] = item;
          nextBoard[x][y].className = 'reset'
        })
        setBoard(nextBoard)
      }).then(() => {
        newGame()
        setisResetingGame(false)
        setIsBoardReset(false)
        setIsSquencerStarted(false)
        setIsGameWon(false);
        setIsGameOver(false);
      })
      setIsSquencerStarted(true)
    }
  }, [board, isResetingGame, isBoardReset, isSquencerStarted])

  return {
    board,
    updateGame,
    resetGame,
    isGameOver,
    isGameWon,
  };
}

export default useMineSweeper;
