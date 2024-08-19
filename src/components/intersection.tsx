import React from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

const threshold: number[] = []
for (let i = 0; i <= 1.0; i += 0.01) {
  threshold.push(i)
}

type Props = {
  children: React.ReactNode
  onChange: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void
}

export function Intersection({ children, onChange }: Props) {
  const { ref } = useIntersectionObserver({ threshold, onChange })
  return <div ref={ref}>{children}</div>
}
