import { SITE_URL } from "@/site/config"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { libraryId: number } }
) {
  try {
    const libraryId = Number(params.libraryId)

    console.log(libraryId)
    // Check if a library with the given id exists and is public
    const library = await prisma.user.findUnique({
      where: { libraryId: libraryId },
      select: { libraryVisibility: true },
    })

    if (!library) {
      return new Response(JSON.stringify({ error: "Library not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (library.libraryVisibility !== "public") {
      return new Response(
        JSON.stringify({ error: "This library is private" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      )
    }

    // Fetch books related to this library
    const libraryEntries = await prisma.library.findMany({
      where: { libraryId: libraryId },
    })

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
    return new Response(JSON.stringify({ error: "Error retrieving library" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  } finally {
    await prisma.$disconnect()
  }
}
