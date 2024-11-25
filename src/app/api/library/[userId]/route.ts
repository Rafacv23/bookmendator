import { SITE_URL } from "@/site/config"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(
  request: Request, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  try {
    const { userId } = context.params
    // check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return new Response("User not found", { status: 404 })
    }

    // retrieve library of the user
    const libraryEntries = await prisma.library.findMany({
      where: { userId: userId },
      orderBy: { modifiedAt: "desc" },
    })

    if (!libraryEntries) {
      return new Response("Library not found", { status: 404 })
    }

    const booksData = await Promise.all(
      libraryEntries.map(async (entry) => {
        const bookResponse = await fetch(`${SITE_URL}/api/book/${entry.bookId}`)

        if (!bookResponse.ok) {
          throw new Error(`Failed to fetch data for book ID: ${entry.bookId}`)
        }

        const bookData = await bookResponse.json()

        return {
          ...entry,
          book: bookData,
        }
      })
    )

    return new Response(JSON.stringify(booksData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    return new Response("Error retrieving library", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
