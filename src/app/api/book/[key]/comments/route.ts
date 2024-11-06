import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    const key = params.key

    const book = await prisma.book.findUnique({
      where: { id: key },
    })

    if (!book) {
      return new Response("Book not found", { status: 404 })
    }

    const comments = await prisma.comment.findMany({
      where: { bookId: key },
    })

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    return new Response("Error retrieving comments", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
