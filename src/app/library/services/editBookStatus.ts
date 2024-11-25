"use server"

import {
  BookReview,
  BookStatus,
  PrismaClient,
  RatingLabel,
} from "@prisma/client"
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

    const reviews = await prisma.library.findMany({
      where: {
        bookId: bookId,
        bookReview: { not: null }, // Consider only entries with a review
      },
    })

    const likes = reviews.filter(
      (review) => review.bookReview === "like"
    ).length
    const dislikes = reviews.filter(
      (review) => review.bookReview === "dislike"
    ).length
    const totalReviews = likes + dislikes

    // Determine the new rating label
    let newRating: RatingLabel = RatingLabel.unrated
    if (totalReviews > 0) {
      const likeRatio = likes / totalReviews

      if (likeRatio >= 0.9) {
        newRating = RatingLabel.extremelyPositive
      } else if (likeRatio >= 0.75) {
        newRating = RatingLabel.veryPositive
      } else if (likeRatio >= 0.5) {
        newRating = RatingLabel.mostlyPositive
      } else if (likeRatio >= 0.25) {
        newRating = RatingLabel.mixed
      } else if (likeRatio >= 0.1) {
        newRating = RatingLabel.negative
      } else {
        newRating = RatingLabel.veryNegative
      }
    }

    // whe are going to recalculate the average rating of the book with the new rating in consideration
    await prisma.book.update({
      where: { id: bookId },
      data: { rating: newRating },
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
