"use server"

import { PrismaClient, Visibility } from "@prisma/client"

const prisma = new PrismaClient()

export const changeLibraryVisibility = async ({
  userId,
  value,
}: {
  userId: string | undefined
  value: Visibility
}) => {
  try {
    if (!userId) {
      return { success: false, message: "User not found." }
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        libraryVisibility: value,
      },
    })
  } catch (error) {
    console.error(error)
    return { success: false, message: "Somethign happend." }
  } finally {
    await prisma.$disconnect()
  }
}
