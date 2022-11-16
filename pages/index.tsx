import { useState } from 'react'
import orderBy from 'lodash/orderBy'
import shuffle from 'lodash/shuffle'

import Head from 'next/head'

import Toggle from '@/components/Toggle/Toggle'
import CurrencyComp from '@/components/Currency/Currency'
import RadioGroup from '@/components/RadioGroup/RadioGroup'

import { Filters, FilterValue, Currency } from 'types'
import { filterCurrencies } from 'utils'

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

const SORT_OPTIONS = [
  { id: 'code', label: 'Code' },
  { id: 'name', label: 'Name' },
]

export default function Home(props: { currencies: Currency[] }) {

  const { currencies } = props;

  const [filters, setFilters] = useState<Filters>({
    // @TODO: create consts for reoccurring strings ie 'isSupportedInUS'
    isSupportedInUS: false,
    supportsTestMode: false,
  });

  const [shouldShuffle, setShouldShuffle] = useState<boolean>(false);

  // defaulting to first sort option
  const [sort, setSort] = useState<string>(SORT_OPTIONS[0].id)

  const onToggleChange = (nextFilterValue: FilterValue) => {
    const { id } = nextFilterValue;
    const nextFilters = Object.assign({}, filters);
    nextFilters[id] = !nextFilters[id]
    setFilters(nextFilters)
  }

  const onSortChange = (sortId: string) => {
    setSort(sortId);
    setShouldShuffle(false);
  }

  const shuffleCurrencies = (nextFilterValue: FilterValue) => {
    /*
      I assume that we should remove sorting when we shuffle and viceversa, if we are sorting
      the shuffle should be removed
    */
    setShouldShuffle(nextFilterValue.checked);
    setSort('');
  }

  const filteredAndSortedCurrencies = orderBy(filterCurrencies(filters, currencies), [sort], ['asc'])
  const shuffledCurrencies = ((shouldShuffle) ? shuffle(filteredAndSortedCurrencies) : filteredAndSortedCurrencies) as Currency[]
  
  return (
    <div className='container md mx-auto'>
      <Head>
        <title>MoonPay Challenge</title>
        <link rel="icon" href="https://www.moonpay.com/favicon-purple-32x32.png" />
      </Head>
      <nav className='ml-3 mr-3'>
        {/* @TODO i18n */}
        <Toggle id={'isSupportedInUS'} label={'Supported in USA'} onChange={onToggleChange} />
        <Toggle id={'supportsTestMode'} label={'Supports Test Mode'} onChange={onToggleChange} />
        <Toggle id={'shuffle'} label={'Shuffle'} onChange={shuffleCurrencies} checked={shouldShuffle} />
        <div className="flex text-xl p-2">
          <span className="grow">Sort by</span>
          <RadioGroup onChange={onSortChange} options={SORT_OPTIONS} checkedId={sort} />
        </div>
      </nav>
      <main>
        <ul className='grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {shuffledCurrencies.map((currency: Currency) =>
            <li key={currency.code}>
              <CurrencyComp {...currency} />
            </li>
          )}
        </ul>
      </main>
    </div>
  )
}
