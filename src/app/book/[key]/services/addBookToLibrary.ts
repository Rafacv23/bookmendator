"use server"

import { BookReview, BookStatus, PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

interface Props {
  userId: string
  bookId: string
  libraryId: number
  bookStatus?: BookStatus
  bookReview?: BookReview
}

const prisma = new PrismaClient()

export default async function addBookToLibrary({
  userId,
  bookId,
  libraryId,
  bookStatus = BookStatus.toRead,
  bookReview = BookReview.unrated,
}: Props) {
  try {
    // Check if the book is already in the library
    const existingEntry = await prisma.library.findFirst({
      where: {
        userId,
        bookId,
      },
    })

    if (existingEntry) {
      return { success: true, message: "This book is already in the library." }
    }

    // Add the book to the library
    const updatedLibrary = await prisma.library.create({
      data: {
        userId,
        bookId,
        bookStatus,
        bookReview,
        libraryId,
      },
    })
    revalidatePath("/library")

    console.log("Book added to library:", updatedLibrary)
    return { success: true, message: "Book added to library." }
  } catch (error) {
    console.error("Error adding book:", error)
    return {
      success: false,
      message: "Failed to adding the book to the library.",
    }
  } finally {
    await prisma.$disconnect()
  }
}
