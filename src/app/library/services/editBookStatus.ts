"use server"

import { BookReview, BookStatus, PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

interface Props {
  bookId: string
  libraryId?: number
  bookReview: BookReview
  bookStatus: BookStatus
}

export default async function editBookStatus({
  bookId,
  libraryId,
  bookReview,
  bookStatus,
}: Props) {
  try {
    const existingEntry = await prisma.library.findFirst({
      where: {
        id: libraryId,
        bookId: bookId,
      },
    })

    if (!existingEntry) {
      return { success: false, message: "Book not found in library." }
    }

    const updatedBook = await prisma.library.update({
      where: {
        id: libraryId,
        bookId: bookId,
      },
      data: { bookReview: bookReview, bookStatus: bookStatus },
    })

    revalidatePath("/library")

    console.log("Book updated:", updatedBook)
    return { success: true, message: "Book updated." }
  } catch (error) {
    console.error("Error editing book:", error)
    return {
      success: false,
      message: "Failed to editing the book of the library.",
    }
  } finally {
    await prisma.$disconnect()
  }
}
