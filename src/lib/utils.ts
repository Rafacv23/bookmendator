import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatString(input: string | undefined): string {
  // Split the string into words, capitalize the first letter of each word, and join them back
  if (!input) return ""
  const formatted = input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Add ellipses at the end
  return formatted
}
