import { useRef, useState } from 'react'

type UseControlledValueOptions<T> = {
  value?: T
  defaultValue?: T
}

export function useControlledValue<T>({ value, defaultValue }: UseControlledValueOptions<T>) {
  const { current: isControlled } = useRef(value !== undefined)

  const [state, setState] = useState(defaultValue)

  const currentValue = isControlled ? value : state

  function setValue(newValue: T) {
    if (!isControlled) {
      setState(newValue)
    }
  }

  return [currentValue, setValue] as const
}
