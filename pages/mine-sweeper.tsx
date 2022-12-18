import Head from 'next/head'
import { useRef, useState } from 'react';
import { generateBoard, placeMines } from '@/components/MineSweeper/utils';

export default function MineSweeper() {
  const [board, setBoard] = useState(placeMines(generateBoard(10), 10));

  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  console.log(board);

  return (
    <div className=''>
      <Head>
        <title>MineSweeper</title>
      </Head>
      <main className='box-border'>
        <div className='grid grid-cols-10 max-w-lg m-auto gap-1'>
          {board.map((row, i) => (
            <>
              {row.map((cell, j) => (
                <div key={`cell_${i}_${j}`} className={`bg-gray-300 relative w-full justify-self-center border-black border before:h-0 before:inline-block before:pt-[100%] before:relative before:w-[1px]`}>
                  <div className='absolute top-0 left-0 bottom-0 w-full grid justify-items-start align-items'>
                    <div className='p-8'>
                      <h2>{cell}</h2>
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
