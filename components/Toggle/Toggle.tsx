import { FilterValue } from "@/pages/index"
import { ChangeEvent } from "react"


const Toggle = (props: TogglePros) => {
  const { label, id, onChange} = props

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({checked: event.target.checked, id})
  }

  return (
    <label className="relative flex justify-between items-center group p-2 text-xl">
      {label}
      <input
        id={id}
        type="checkbox"
        onChange={onInputChange}
        className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" />
      <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6" />
    </label>
  )
}

export type TogglePros = {
  label: string,
  id: string,
  onChange: (nextFilterValue: FilterValue) => void,
}

export default Toggle