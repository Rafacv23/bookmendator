import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export async function GET(
  request: Request, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { userId } = await context.params
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    if (!user) {
      return new Response("User not found", { status: 404 })
    }
    const userLibrary = await prisma.user.findUnique({
      where: { id: userId },
      select: { libraryId: true, libraryVisibility: true },
    })
    return new Response(JSON.stringify(userLibrary), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    return new Response("Error retrieving libraryId", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
