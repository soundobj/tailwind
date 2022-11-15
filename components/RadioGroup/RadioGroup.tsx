import { useState } from "react";

const RadioGroup = (props: RadioGroupProps) => {
  const { options, onChange } = props;
  const [checked, setChecked] = useState<string>();

  const onGroupChange = (option: RadioOption) => {
    const { id } = option
    setChecked(id)
    onChange(id)
  }

  return (
    <fieldset className="">
      <span>Sort by</span>
      {options.map((option) => {
        const { label, id } = option
        return (<div key={id}>
          <label htmlFor={id}>{label}</label>
          <input
            className=""
            onChange={() => onGroupChange(option)}
            type="radio"
            id={id}
            value={id}
            checked={id === checked}
          />
        </div>)
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
}

export default RadioGroup