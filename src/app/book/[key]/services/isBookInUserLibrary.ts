import { SITE_URL } from "@/site/config"
import { Library } from "@prisma/client"

export default async function isBookInUserLibrary(
  bookId: string,
  userId: string
) {
  // Check if the book is already in the library
  const res = await fetch(`${SITE_URL}/api/library/${userId}`)

  //check if the user is logged in
  if (!userId) {
    return false
  }
  const library: Library[] = await res.json()

  return library.some((entry) => entry.bookId === bookId)
}
