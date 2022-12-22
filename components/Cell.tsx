const Cell = (props: CellProps) => {
  const { className, value } = props

  return (
    <div className={className}>
      {value}
    </div>
  )
}

interface CellProps {
  className?: string
  value: string | number
}

export default Cell