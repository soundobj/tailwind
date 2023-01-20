import Head from 'next/head'
import useMineSweeper from 'hooks/useMineSweeper';
import Grid from '@/components/Grid';
import Cell from '@/components/Cell';

export default function MineSweeper() {
  const { board, updateGame, resetGame, state } = useMineSweeper();

  return (
    <div className=''>
      <Head>
        <title>MineSweeper</title>
      </Head>
      <main className='box-border'>
        <button onClick={resetGame} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          New Game
        </button>
        <Grid
          grid={board}
          Cell={Cell}
          onCellClick={(coords: number[]) => updateGame(coords)}
        />
        {state === "GAME_OVER" ? <div className='text-2xl text-center'>Game Over</div> : null}
        {state === "GAME_WON" ? <div className='text-2xl text-center'>Game Won</div> : null}
      </main>
    </div>
  )
}
