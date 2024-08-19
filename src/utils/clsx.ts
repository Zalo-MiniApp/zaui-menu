import { type ClassValue, clsx as cl } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function clsx(...args: ClassValue[]) {
  return twMerge(cl(args))
}
