import { useCallback, useMemo, useState } from 'react'

export function useToggle(initial = false) {
  const [state, setState] = useState(initial)

  const toggle = useCallback(() => setState((state) => !state), [])
  const on = useCallback(() => setState(true), [])
  const off = useCallback(() => setState(false), [])

  const actions = useMemo(() => ({ toggle, on, off }), [toggle, on, off])

  return [state, actions] as const
}
