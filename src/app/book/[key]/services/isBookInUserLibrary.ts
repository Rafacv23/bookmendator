import { SITE_URL } from "@/site/config"

export default async function isBookInUserLibrary(
  bookId: string,
  userId: string
) {
  // Check if the book is already in the library
  const res = await fetch(`${SITE_URL}/api/library/${userId}`)
  const library = await res.json()

  return library.some((entry: LibraryEntry) => entry.bookId === bookId)
}
