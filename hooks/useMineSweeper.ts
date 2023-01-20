import { useState, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { cloneDeep } from 'lodash';
import {
  generateBoard,
  isCellMine, isGameCompleted,
  MineBoard, placeMines, updateBoard,
} from '../components/MineSweeper/utils';

import mineSweeperMachine from '../components/MineSweeper/mineSweeperMachine';
import { filterCoordinates, outwardSpiralSequence, sequencer, bottomToTopSequence } from '@/components/GridAnimator/utils';

function useMineSweeper() {
  const [board, setBoard] = useState<MineBoard>([[]]);
  const resetSequence = bottomToTopSequence(board)
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [state, send] = useMachine(mineSweeperMachine, {
    services: {
      resetBoard: async () => {
        setTimeout(() => {
          const nextBoard = cloneDeep(board)
          nextBoard.map((row) => row.map((cell) => {
            delete cell.reset
            return cell
          }))
          setBoard(nextBoard)
        })
      },
      runSequence: () => sequencer(resetSequence, 60, (sequenceItem) => {
        const nextBoard = cloneDeep(board)
        sequenceItem.map((item: number[]) => {
          const [x, y] = item;
          nextBoard[x][y].className = 'reset'
        })
        setBoard(nextBoard)
      }).then(() => {
        newGame()
      })
    },
  })

  const newGame = () => {
    setBoard(placeMines(generateBoard(10), 10));
    setIsGameOver(false);
    setIsGameWon(false);
  }

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
    setBoard(nextBoard)
    state.matches('IDLE') && send('START')
  };

  useEffect(() => newGame(), []);

  return {
    board,
    updateGame,
    resetGame,
    isGameOver,
    isGameWon,
  };
}

export default useMineSweeper;
