import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function localizeDate(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}
