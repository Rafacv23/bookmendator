import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  try {
    const { key } = await context.params

    const book = await prisma.book.findUnique({
      where: { id: key },
    })

    if (!book) {
      return new Response("Book not found", { status: 404 })
    }

    return new Response(JSON.stringify(book), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    return new Response("Error retrieving book", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
