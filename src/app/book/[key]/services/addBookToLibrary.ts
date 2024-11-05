"use server"

import {
  BookReview,
  BookStatus,
  PrismaClient,
  Visibility,
} from "@prisma/client"
import { revalidatePath } from "next/cache"

interface Props {
  userId: string
  bookId: string
  bookStatus?: BookStatus
  visibility?: Visibility
  bookReview?: BookReview
}

const prisma = new PrismaClient()

export default async function addBookToLibrary({
  userId,
  bookId,
  bookStatus = BookStatus.toRead,
  visibility = Visibility.private,
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
        visibility,
        bookStatus,
        bookReview,
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
