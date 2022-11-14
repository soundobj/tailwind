import Head from 'next/head'
import Image from 'next/image'

import styles from '@/pages/index.module.css'
import Toggle from '@/components/Toggle/Toggle'
import Currency from '@/components/Currency/Currency'


export type Currency = {
  id: string,
  type: string,
  name: string,
  code: string,
  isSupportedInUS: boolean,
  supportsTestMode: boolean,
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

  console.log('currencies', currencies);

  return (
    <div className={styles.container}>
      <Head>
        <title>MoonfPay Challenge</title>
        <link rel="icon" href="https://www.moonpay.com/favicon-purple-32x32.png" />
      </Head>
      <nav className='container'>
        <Toggle label="foo" onChange={(checked: boolean) => console.log('toggle checked', checked)} />
      </nav>
      <main>
        <ul>
          {currencies.map((currency: Currency) =>
            <li key={currency.code}>
              <Currency {...currency} />
            </li>
          )}
        </ul>
      </main>
    </div>
  )
}
