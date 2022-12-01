import Head from 'next/head'
import { useState } from 'react'
import { flattenObject } from '../utils'

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

const sortByProperty1 = (list: any[], property: string, isSortASC: boolean): any[] => list.sort((a, b) => {
  const value = a[property]
  if (typeof value === 'string') {
    return (isSortASC) ? a[property].localeCompare(b[property]) : b[property].localeCompare(a[property])
  } else if (typeof value === 'number') {
    return (isSortASC) ? a[property] - (b[property]) : b[property] - a[property]
  }
})

const sortByProperty = (list: any[], property: string, isSortASC: boolean): any[] => list.sort((a, b) => {
  const value1 = a[property]
  const value2 = b[property]
  if (isSortASC) {
    if (value1 < value2) return -1
    if (value1 > value2) return 1
    return 0
  }
  if (value2 < value1) return -1
  if (value2 > value1) return 1
  return 0
})

export default function user(props: { people: People[] }) {
  const { people } = props;

  const [isSortASC, setIsSortASC] = useState<boolean>(true)
  const [locations, setLocations] = useState<any[]>(people.map(person => flattenObject(person.location)))
  const [searchTermMatches, setSearchTermMatches] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const keys = Object.keys(locations[0])

  const sortColumn = (column: string) => {
    setLocations(sortByProperty(locations, column, isSortASC))
    setIsSortASC(!isSortASC)
  }

  const searchTermFilter = (e: any) => {
    const searchTerm = e.target.value
    setSearchTerm(searchTerm)
    const matches = locations.filter(location =>
      Object.values(location).some(
        value => ('' + value).includes(searchTerm)
      ))
    setSearchTermMatches(matches)
  }

  const items = searchTermMatches.length ? searchTermMatches : locations

  return (
    <div className='container md mx-auto h-full'>
      <Head>
        <title>User Table</title>
      </Head>
      <main className='ml-3 mr-3'>
        {/* @ts-ignore */}
        <input className='border-2 border-black p-2' type="text" onChange={searchTermFilter} />
        {(searchTerm && !searchTermMatches.length) && <span className='ml-3'>No Matches Found</span>}
        <table className='table-auto'>
          <thead className='sticky top-0 z-10 bg-white border-b-2 border-black'>
            <tr>
              {keys.map(key =>
                <th key={key}>
                  <button onClick={() => sortColumn(key)}>
                    {key}
                  </button>
                </th>)}
            </tr>
          </thead>
          <tbody>
            {items.map((location, i) => <tr key={`location_${i}`}>
              {keys.map(data => {
                const locationToString = "" + location[data]
                const shouldHighLightCell = searchTerm.length && locationToString.includes(searchTerm)
                return (
                  <td
                    className={`border-2 border-black p-2 ${ shouldHighLightCell ? "bg-red-500" : ""}`}
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
