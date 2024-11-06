"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

interface CommentProps {
  userId: string
  bookId: string
  message: string
}

export default async function comment({
  userId,
  bookId,
  message,
}: CommentProps) {
  try {
    const addComment = await prisma.comment.create({
      data: {
        userId,
        bookId,
        content: message,
      },
    })

    revalidatePath("/library")

    console.log("Comment added:", addComment)
    return { success: true, message: "Comment added." }
  } catch (error) {
    console.error("Error editing comment:", error)
    return {
      success: false,
      message: "Failed to adding the comment.",
    }
  } finally {
    prisma.$disconnect()
  }
}
