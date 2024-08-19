import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: React.ReactNode
}

export function Portal({ children }: Props) {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (container) return
    const existing = document.getElementById('portal-container')
    if (existing) {
      setContainer(existing)
      return
    }
    const el = document.createElement('div')
    el.id = 'portal-container'
    el.style.position = 'absolute'
    document.body.appendChild(el)
    setContainer(el)
  }, [container])

  return container ? createPortal(children, container) : null
}
