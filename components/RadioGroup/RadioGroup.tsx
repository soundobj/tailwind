import { useState } from "react";

const RadioGroup = (props: RadioGroupProps) => {
  const { options, onChange, groupLabel, checkedId } = props;
  const [checked, setChecked] = useState<string>(checkedId);

  const onGroupChange = (option: RadioOption) => {
    const { id } = option
    setChecked(id)
    onChange(id)
  }

  return (
    <div className="flex text-xl p-2">
      <span className="grow">{groupLabel}</span>
      <fieldset className="flex">
        {options.map((option) => {
          const { label, id } = option
          return (<label key={id} htmlFor={id}>
            <input
              className="peer appearance-none"
              onChange={() => onGroupChange(option)}
              type="radio"
              id={id}
              value={id}
              checked={id === checked}
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
    </div>

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
  groupLabel?: string
  checkedId: string
}

export default RadioGroup