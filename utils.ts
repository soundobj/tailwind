import filter from 'lodash/filter'
import { Filters } from "types";

export const getTruthyFilters = (filters: Filters): Filters => Object.keys(filters).reduce<Filters>((acc, cur) => {
  if (filters[cur]) {
    acc[cur] = true;
  }
  return acc;
}, {});

export const filterItems = <T>(filters: Filters, currencies: T[]): T[] => {
  /* 
    I have assumed that we only want to filter on properties when they are true, otherwise we would
    have an inital load with already filtered currencies i the ones with filter properties being false
  */
  return filter(currencies, { ...getTruthyFilters(filters) }) as T[]
}

export const flattenObject = (obj: any) => {
  const flattened: any = {}

  Object.keys(obj).forEach((key) => {
    const value = obj[key]

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value))
    } else {
      flattened[key] = value
    }
  })

  return flattened
}

export const filterByValue = (list: Record<string, string | number>, str: string) => {
  const strLowerCase = str.toLowerCase()
  return Object.values(list).some(
    value => ('' + value).toLowerCase().includes(strLowerCase)
  )
}

export const sortByProperty = (list: any[], property: string, isSortASC: boolean): any[] => list.sort((a, b) => {
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

export const sortByProperty1 = (list: any[], property: string, isSortASC: boolean): any[] => list.sort((a, b) => {
  const value = a[property]
  if (typeof value === 'string') {
    return (isSortASC) ? a[property].localeCompare(b[property]) : b[property].localeCompare(a[property])
  } else if (typeof value === 'number') {
    return (isSortASC) ? a[property] - (b[property]) : b[property] - a[property]
  }
})