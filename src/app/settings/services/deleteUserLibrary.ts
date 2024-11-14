"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function deleteUserLibrary({
  userId,
}: {
  userId: string | undefined
}) {
  try {
    if (!userId) {
      return { success: false, message: "User not found." }
    }

    await prisma.library.deleteMany({
      where: { userId: userId },
    })

    return { success: true, message: "Library deleted successfully." }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to delete the library." }
  } finally {
    await prisma.$disconnect()
  }
}
