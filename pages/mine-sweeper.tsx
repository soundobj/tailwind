import Head from 'next/head'
import useMineSweeper from 'hooks/useMineSweeper';
import { useState } from 'react';

export default function MineSweeper() {
  const { board, updateGame, resetGame, revealedCoords, isGameOver, isGameWon } = useMineSweeper();

  const [showCells, setShowCells] = useState(false);
  console.log('revealedCoords', revealedCoords);
  

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

        <div className='grid grid-cols-10 max-w-lg m-auto gap-1'>
          {board.map((row: (string | number)[], i: number) => (
            <>
              {row.map((cell, j) => (
                <div
                  key={`cell_${i}_${j}`}
                  onClick={() => updateGame([i, j])}
                  className={`bg-gray-300 relative w-full justify-self-center border-black border before:h-0 before:inline-block before:pt-[100%] before:relative before:w-[1px]`}>
                  <div className='absolute top-0 left-0 bottom-0 w-full grid justify-items-start align-items'>
                    <div className='p-[40%]'>
                      { showCells ? cell : typeof cell === 'string' ? cell : null} 
                    </div>
                  </div>
                </div>
              ))}
            </>
          ))}
        </div>
      </main>
    </div>
  )
}
