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
      console.log("Book already exists in the library.")
      return existingEntry
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
    return updatedLibrary
  } catch (error) {
    console.error(error)
    throw new Error("Error adding book to library:")
  } finally {
    await prisma.$disconnect()
  }
}
