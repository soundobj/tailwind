import Head from 'next/head'
import useMineSweeper from 'hooks/useMineSweeper';

export default function MineSweeper() {
  const { board, updateGame, resetGame, isGameOver, isGameWon } = useMineSweeper();

  return (
    <div className=''>
      <Head>
        <title>MineSweeper</title>
      </Head>
      <main className='box-border'>

        <button onClick={resetGame} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          New Game
        </button>
        {isGameOver ? <div className='text-2xl text-center'>Game Over</div> : null}
        {isGameWon ? <div className='text-2xl text-center'>Game Won</div> : null}

        <div className='grid grid-cols-10 max-w-lg m-auto gap-1'>
          {board.map((row: number[], i: number) => (
            <>
              {row.map((cell, j) => (
                <div
                  key={`cell_${i}_${j}`}
                  onClick={() => updateGame([i, j])}
                  className={`bg-gray-300 relative w-full justify-self-center border-black border before:h-0 before:inline-block before:pt-[100%] before:relative before:w-[1px]`}>
                  <div className='absolute top-0 left-0 bottom-0 w-full grid justify-items-start align-items'>
                    <div className='p-[40%]'>
                      {cell}
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
