import Head from 'next/head'

import Toggle from '@/components/Toggle/Toggle'
import CurrencyList from '@/components/CurrencyList/CurrencyList'
import RadioGroup from '@/components/RadioGroup/RadioGroup'

import { Currency } from 'types'
import useListTransform from 'hooks/useListTransform'

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

const FILTERS = {
  isSupportedInUS: false,
  supportsTestMode: false,
}

export default function Home(props: { currencies: Currency[] }) {

  const { currencies } = props;

  const {
    items,
    shouldShuffle,
    selectedSort,
    shuffleItems,
    onSortChange,
    onFilterChange
  } = useListTransform(SORT_OPTIONS, FILTERS, currencies)

  return (
    <div className='container md mx-auto'>
      <Head>
        <title>MoonPay Challenge</title>
        <link rel="icon" href="https://www.moonpay.com/favicon-purple-32x32.png" />
      </Head>
      <nav className='ml-3 mr-3'>
        {/* @TODO i18n */}
        <Toggle id={'isSupportedInUS'} label={'Supported in USA'} onChange={onFilterChange} />
        <Toggle id={'supportsTestMode'} label={'Supports Test Mode'} onChange={onFilterChange} />
        <Toggle id={'shuffle'} label={'Shuffle'} onChange={shuffleItems} checked={shouldShuffle} />
        <div className="flex text-xl p-2">
          <span className="grow">Sort by</span>
          <RadioGroup onChange={onSortChange} options={SORT_OPTIONS} checkedId={selectedSort} />
        </div>
      </nav>
      <main>
        <CurrencyList items={items} />
      </main>
    </div>
  )
}
