
import React from 'react'

const Cards = () => {
  return (
    <div className="group mx-auto z-10 h-40 w-32 bg-black relative rounded">
      <div className="absolute h-40 w-32 bg-red-500 group-hover:rotate-12 group-hover:translate-x-40 group-hover:translate-y-52 ease-in-out duration-300 rounded"></div>
      <div className="absolute h-40 w-32 bg-yellow-500 group-hover:rotate-12 group-hover:-translate-x-40 group-hover:-translate-y-52 ease-in-out duration-300 rounded"></div>
      <div className="absolute h-40 w-32 bg-green-500 group-hover:-rotate-12 group-hover:-translate-x-40 group-hover:translate-y-52 ease-in-out duration-300 rounded"></div>
      <div className="absolute h-40 w-32 bg-blue-500 group-hover:-rotate-12 group-hover:translate-x-40 group-hover:-translate-y-52 ease-in-out duration-300 rounded"></div>
    </div>
  )
}

export default Cards