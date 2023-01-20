import { useState } from 'react';
import { useMachine } from '@xstate/react';
import { cloneDeep } from 'lodash';
import {
  generateBoard,
  isCellMine, isGameCompleted,
  MineBoard, placeMines, updateBoard, sanitizeBoard, clearReset
} from '../components/MineSweeper/utils';

import mineSweeperMachine from '../components/MineSweeper/mineSweeperMachine';
import { filterCoordinates, outwardSpiralSequence, sequencer, bottomToTopSequence } from '@/components/GridAnimator/utils';

type MineSweeper = {
  board: MineBoard;
  state: "GAME_OVER" | "GAME_WON" | "GAME_STARTED" | "NEW_GAME" | "RESET_GAME";
  updateGame: (coordinates: number[]) => void;
  resetGame: () => void;
}

function useMineSweeper(): MineSweeper {
  const [board, setBoard] = useState<MineBoard>([[]]);
  const resetSequence = bottomToTopSequence(board)
  const [state, send] = useMachine(mineSweeperMachine, {
    services: {
      newGame: async () => newGame(),
      resetBoard: async () => {
        setBoard(sanitizeBoard(board))
        setTimeout(() => {
          setBoard(clearReset(board))
        })
      },
      runSequence: () => sequencer(resetSequence, 60, (sequenceItem) => {
        const nextBoard = cloneDeep(board)
        sequenceItem.map((item: number[]) => {
          const [x, y] = item;
          nextBoard[x][y].className = 'reset'
        })
        setBoard(nextBoard)
      }),
      gameOver: async (context, event) => {
        const { i, j } = event.data;
        const sequence = filterCoordinates(
          outwardSpiralSequence(board, [i, j]),
          board,
          { value: 'M' }
        );
        sequencer(sequence, 200, (sequenceItem) => {
          const [x, y] = sequenceItem;
          const nextBoard = cloneDeep(board)
          nextBoard[x][y].className = 'mine'
          nextBoard[x][y].revealed = true
          setBoard(nextBoard);
        })
      },
    },
  })

  console.log('state', state.value);

  const newGame = () => setBoard(placeMines(generateBoard(10), 10))

  const updateGame = ([i, j]: number[]) => {
    const nextBoard = updateBoard(cloneDeep(board),[i, j])
    if (isCellMine(nextBoard, [i, j])) {
      send('END_GAME', { data: { i, j } })
    } else if (isGameCompleted(nextBoard)) {
      send('GAME_WON')
    }
    setBoard(nextBoard);
  };

  const resetGame = () => send('RESTART')

  return {
    board,
    updateGame,
    resetGame,
    //@ts-ignore
    state: state.value,
  };
}

export default useMineSweeper;
