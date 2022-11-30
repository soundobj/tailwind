import Head from 'next/head'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { useRef, useState } from 'react';

import Item from '@/components/Item/Item';

export default function Infinite() {

  const [items, setItems] = useState<number[]>(Array.from(Array(12).keys()))
  const itemsLengthRef = useRef(items.length)

  const onIntersection = () => {
    const lastIndex = itemsLengthRef.current -1
    const nextSize = lastIndex + 12
    setItems(Array.from(Array(nextSize).keys()))
    console.log('reached intersection li', lastIndex, 'nextSize', nextSize);
    itemsLengthRef.current = nextSize
  }

  const { targetRef } = useIntersectionObserver(onIntersection)

  return (
    <div className='container md mx-auto h-full'>
      <Head>
        <title>Infinite scroll</title>
      </Head>
      <main className='ml-3 mr-3'>
        <ul className='grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {items.map((item) => {
            return (<li key={`infinite_${item}`}>
              <Item id={item} />
            </li>)
          })}
        </ul>
        <span className= 'invisible' ref={targetRef} />
      </main>
    </div>
  )
}
