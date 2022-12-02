import Head from 'next/head'
import { useState } from 'react'
import { flattenObject, filterByValue, sortByProperty } from '../utils'
import deepclone from 'lodash/cloneDeep'

type People = {
  location: any
};

export async function getServerSideProps() {
  const people = await fetch('https://randomuser.me/api/?results=20')
    .then((response) => response.json())

  return {
    props: {
      people: people.results,
    },
  }
}

export default function user(props: { people: People[] }) {
  const { people } = props;
  const flattenLocations  = people.map(person => flattenObject(person.location))
  const keys = Object.keys(flattenLocations[0])

  const [isSortASC, setIsSortASC] = useState<boolean>(true)
  const [locations, setLocations] = useState<any[]>(deepclone(flattenLocations))
  const [searchTerm, setSearchTerm] = useState<string>('')

  const sortColumn = (column: string) => {
    setLocations(sortByProperty(locations, column, isSortASC))
    setIsSortASC(!isSortASC)
  }

  const searchTermFilter = (e: any) => {
    const searchTerm = e.target.value.toLowerCase()
    setSearchTerm(searchTerm)
    const matches = flattenLocations.filter((location) => filterByValue(location, searchTerm))
    setLocations(matches)
  }

  return (
    <div className='container md mx-auto h-full'>
      <Head>
        <title>User Table</title>
      </Head>
      <main className='ml-3 mr-3'>
        <input
          className='border-2 border-black p-2 rounded' 
          type="text"
          onChange={searchTermFilter}
          placeholder="Search"
        />
        <table className='border-separate w-full'>
          <thead className='sticky top-0 z-10 bg-white'>
            <tr>
              {keys.map(key =>
                <th key={key} className="border-b-2 p-2">
                  <button onClick={() => sortColumn(key)}>
                    {key}
                  </button>
                </th>)}
            </tr>
          </thead>
          <tbody>
            {locations.map((location, i) => <tr key={`location_${i}`} className="border-0">
              {keys.map(data => {
                const locationToString = "" + location[data]
                const shouldHighLightCell = searchTerm.length && locationToString.toLowerCase().includes(searchTerm)
                return (
                  <td
                    className={`border-b-2 p-2 ${ shouldHighLightCell ? "bg-green-500" : ""}`}
                    key={`location_${i}_${data}`}>
                    {locationToString}
                  </td>)
              })}
            </tr>)}
          </tbody>
        </table>
      </main>
    </div>
  )
}
