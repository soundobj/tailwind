import Head from 'next/head'
import useMineSweeper from 'hooks/useMineSweeper';
import { useState } from 'react';
import Grid from '@/components/Grid';
import Cell from '@/components/Cell';

export default function MineSweeper() {
  const { board, updateGame, resetGame, revealedCoords, isGameOver, isGameWon } = useMineSweeper();

  const [showCells, setShowCells] = useState(false);
  // console.log('revealedCoords', revealedCoords);
  // console.log('board', board);

  return (
    <div className=''>
      <Head>
        <title>MineSweeper</title>
      </Head>
      <main className='box-border'>

        <button onClick={resetGame} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          New Game
        </button>

        <label className="relative inline-flex items-center cursor-pointer ml-4">
          <input
            type="checkbox"
            className="form-checkbox focus:outline-none focus:shadow-outline"
            onChange={() => setShowCells(!showCells)} />
          <span className="ml-2">{!showCells ? 'show' : 'hide'} cells</span>
        </label>

        {isGameOver ? <div className='text-2xl text-center'>Game Over</div> : null}
        {isGameWon ? <div className='text-2xl text-center'>Game Won</div> : null}

        <Grid
          grid={board}
          Cell={Cell}
          onCellClick={(coords: number[]) => updateGame(coords)}
        />
      </main>
    </div>
  )
}
