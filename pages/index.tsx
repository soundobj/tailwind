import { useState  } from 'react'
import filter from 'lodash/filter'
import orderBy from 'lodash/orderBy'

import Head from 'next/head'

import Toggle from '@/components/Toggle/Toggle'
import Currency from '@/components/Currency/Currency'
import RadioGroup from '@/components/RadioGroup/RadioGroup'

// @TODO: move reused types to own ts definitions file
export type Currency = {
  id: string,
  type: string,
  name: string,
  code: string,
  isSupportedInUS: boolean,
  supportsTestMode: boolean,
}

export type Filters = Record<string,boolean>

export type FilterValue = {
  checked: boolean,
  id: string,
}

const SORT_OPTIONS = [
  { id: 'code', label: 'Code'},
  { id: 'name', label: 'Name'},
]

// @TODO: move utilities to its own utils.ts file and write tests for them
const getTruthyFilters = (filters: Filters): Filters => Object.keys(filters).reduce<Filters>((acc, cur) => {
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

export async function getServerSideProps() {

  // @TODO: handle exceptions
  // @TODO: handle pagination
  const currencies = await fetch('https://api.moonpay.com/v3/currencies')
    .then((response) => response.json())

  return {
    props: {
      currencies,
    },
  }
}

export default function Home(props: { currencies: Currency[] }) {

  const { currencies } = props;

  const [filters, setFilters] = useState<Filters>({
    // @TODO: create consts for reoccurring strings ie 'isSupportedInUS'
    isSupportedInUS: false,
    supportsTestMode: false,
  });

  const [sort, setSort] = useState<String>()

  const onToggleChange = (nextFilterValue: FilterValue) => {
    const { id } = nextFilterValue;
    const nextFilters = Object.assign({}, filters);
    nextFilters[id] = !nextFilters[id]
    setFilters(nextFilters)
  }

  const filteredCurrencies = orderBy(filterCurrencies(filters, currencies), [sort], ['asc']) as Currency[];
  
  return (
    <div className='container md mx-auto'>
      <Head>
        <title>MoonPay Challenge</title>
        <link rel="icon" href="https://www.moonpay.com/favicon-purple-32x32.png" />
      </Head>
      <nav className='ml-3 mr-3'>
        <Toggle id={'isSupportedInUS'} label={'Show supported in USA'} onChange={onToggleChange} />
        <Toggle id={'supportsTestMode'} label={'Show Supports Test Mode'} onChange={onToggleChange} />
        <RadioGroup onChange={setSort} options={SORT_OPTIONS} />
      </nav>
      <main>
        <ul className='grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {filteredCurrencies.map((currency: Currency) =>
            <li key={currency.code}>
              <Currency {...currency} />
            </li>
          )}
        </ul>
      </main>
    </div>
  )
}
