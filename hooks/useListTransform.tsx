import { useState } from "react";
import orderBy from 'lodash/orderBy'
import shuffle from 'lodash/shuffle'
import { filterItems } from 'utils'

import { InputValue } from 'types'

function useListTransform <T>(
    sortOptions: { id: string, label: string}[],
    filterVals: Record<string, boolean>,
    list: T[],
  ) {

  const [filters, setFilters] = useState<Record<string, boolean>>(filterVals);

  const [shouldShuffle, setShouldShuffle] = useState<boolean>(false);

  // defaulting to first sort option
  const [sort, setSort] = useState<string>(sortOptions[0].id)

  const onFilterChange = (nextInputValue: InputValue) => {
    const { id } = nextInputValue;
    const nextFilters = Object.assign({}, filters);
    nextFilters[id] = !nextFilters[id]
    setFilters(nextFilters)
  }

  const onSortChange = (sortId: string) => {
    setSort(sortId);
    setShouldShuffle(false);
  }

  const shuffleItems = (nextInputValue: InputValue) => {
    /*
      I assume that we should remove sorting when we shuffle and viceversa, if we are sorting
      the shuffle should be removed
    */
    setShouldShuffle(nextInputValue.checked);
    setSort('');
  }

  const filteredAndSortedItems = orderBy(filterItems(filters, list), [sort], ['asc'])
  const items = ((shouldShuffle) ? shuffle(filteredAndSortedItems) : filteredAndSortedItems) as T[]

  return {
    selectedSort: sort,
    shuffleItems,
    shouldShuffle,
    items,
    onSortChange,
    onFilterChange
  }
}

export default useListTransform