import Head from 'next/head'
import { useState } from 'react'

type FolderItem = {
  name: string,
  children?: FolderItem[]
  className?: string
}

const folders = [
  { name: "a" },
  {
    name: "b", children: [
      { name: "c" },
      { name: "d" },
      {
        name: "e", children: [
          { name: "f" },
          { name: "g" },
          { name: "h" },
        ]
      },
    ]
  },
]

const Item = (props: FolderItem) => {
  const { name, children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const Node = () => (
    <button className='w-10 flex justify-end' onClick={() => setIsOpen(!isOpen)}>
      {children && <span>{isOpen ? '-' : "+"}</span>}
      {name}
    </button>
  )

  return (
    <>
      <Node />
      {children &&
        <fieldset className={isOpen ? 'visible' : 'hidden'}>
          {children.map((child) => {
            return (
              <div className='ml-3' key={child.name}>
                <Item {...child} />
              </div>
            )
          })}
        </fieldset>
      }
    </>
  )
}

export default function Folders() {


  return (
    <div className='container md mx-auto h-full'>
      <Head>
        <title>Folders</title>
      </Head>
      <main className='ml-3 mr-3'>
        <fieldset>
          {folders.map((folder) => {
            return (<Item key={folder.name} {...folder} />)
          })}
        </fieldset>
      </main>
    </div>
  )
}
