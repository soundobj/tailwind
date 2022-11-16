import { Currency as CurrencyProps } from "../../types"

const Currency = (props: CurrencyProps) => {

  const { code, name, isSupportedInUS, supportsTestMode, type } = props

  return (
    <article className="p-3 bg-slate-200 m-4 rounded shadow-xl">
      <header>
        <dl className="flex justify-between">
          <dt>
            {name}
          </dt>
          <dd className="before:content-['('] before:mr-0.5 after:content-[')'] after:ml-0.5 uppercase">
            {code}
          </dd>
        </dl>
      </header>
      <main className="mt-10 mb-10">
        {(type === 'fiat')
          ? <img className="w-40 m-auto" src="/money-svgrepo-com.svg" title="fiat" />
          : <img className="w-40 m-auto" src="/qtum-svgrepo-com.svg" title="crypto" />
        }
      </main>
      <footer>
        <dl className="flex items-center">
          <dt>
            US support:
          </dt>
          <dd className="grow">
            {isSupportedInUS
              ? <img className="w-5 h-5" src="/box-tick-svgrepo-com.svg" title="yes" />
              : <img className="w-5 h-5" src="/box-cross-svgrepo-com.svg" title="no" />}
          </dd>
          <dt>
            Test Mode:
          </dt>
          <dd>
            {supportsTestMode
              ? <img className="w-5 h-5" src="/box-tick-svgrepo-com.svg" title="yes" />
              : <img className="w-5 h-5" src="/box-cross-svgrepo-com.svg" title="no" />}
          </dd>
        </dl>
      </footer>
    </article>
  )
}

export default Currency