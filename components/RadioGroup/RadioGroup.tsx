
const RadioGroup = (props: RadioGroupProps) => {
  const { options, onChange, checkedId } = props;

  return (
    <fieldset className="flex">
      {options.map((option) => {
        const { label, id } = option
        return (<label key={id} htmlFor={id}>
          <input
            className="peer appearance-none"
            onChange={() => onChange(option.id)}
            type="radio"
            id={id}
            value={id}
            checked={id === checkedId}
          />
          <span
            className="peer-checked:border-b-4 ml-4 border-green-400 peer-focus:ring-2 p-1"
          >
            {label}
          </span>
        </label>)
      }
      )}
    </fieldset>
  )
}

export type RadioOption = {
  id: string,
  label: string,
}

// @TODO: add className property for styles overriding; same for other components
export type RadioGroupProps = {
  options: RadioOption[]
  onChange: (sortId: string) => void
  checkedId: string
}

export default RadioGroup