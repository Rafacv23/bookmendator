"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

interface Props {
  userId: string
  bookId: string
}

const prisma = new PrismaClient()

export default async function deleteBookFromLibrary({ userId, bookId }: Props) {
  try {
    // Check if the book is already in the library
    const existingEntry = await prisma.library.findFirst({
      where: {
        userId,
        bookId,
      },
    })

    if (!existingEntry) {
      return { success: false, message: "This book is not in the library." }
    }

    // Add the book to the library
    const updatedLibrary = await prisma.library.delete({
      where: { id: existingEntry.id, userId: existingEntry.userId },
    })
    revalidatePath("/library")

    console.log("Book removed from library:", updatedLibrary)
    return { success: true, message: "Book removed from library." }
  } catch (error) {
    console.error("Error removing book:", error)
    return {
      success: false,
      message: "Failed to removing the book to the library.",
    }
  } finally {
    await prisma.$disconnect()
  }
}
