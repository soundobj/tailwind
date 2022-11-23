import { Currency } from "types"
import CurrencyComp from '../Currency/Currency'

const CurrencyList = (props: CurrencyListProps) => {
  const { items } = props
  return (
    <ul className='grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
    {items.map((currency: Currency) =>
      <li key={currency.code}>
        <CurrencyComp {...currency} />
      </li>
    )}
  </ul>
  )
}

type CurrencyListProps = {
  items: any[]
}

export default CurrencyList