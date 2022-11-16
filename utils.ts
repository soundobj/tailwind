import filter from 'lodash/filter'
import { Filters, Currency } from "types";

export const getTruthyFilters = (filters: Filters): Filters => Object.keys(filters).reduce<Filters>((acc, cur) => {
  if (filters[cur]) {
    acc[cur] = true;
  }
  return acc;
}, {});

export const filterCurrencies = (filters: Filters, currencies: Currency[]): Currency[] => {
  /* 
    I have assumed that we only want to filter on properties when they are true, otherwise we would
    have an inital load with already filtered currencies i the ones with filter properties being false
  */
  return filter(currencies, {...getTruthyFilters(filters)})
}