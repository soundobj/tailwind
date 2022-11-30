const Item = (props: { id: number }) => {
  const { id } = props

  return (
    <article className="p-3 bg-slate-200 m-4 rounded shadow-xl h-80 w-80 flex center justify-center">
      {id}
    </article>
  )
}

export default Item