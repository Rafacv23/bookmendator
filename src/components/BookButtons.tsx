"use client"

import { Bookmark, BookmarkX, BotMessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import addBookToLibrary from "@/app/book/[key]/services/addBookToLibrary"
import { useState } from "react"
import deleteBookFromLibrary from "@/app/book/[key]/services/deleteBookFromLibrary"
import ShareBtn from "./ShareBtn"

interface BookButtonsProps {
  bookId: string
  userId: string
  isBookInLibrary: boolean
  libraryId: { libraryId: number }
}

export default function BookButtons({
  bookId,
  userId,
  isBookInLibrary,
  libraryId,
}: BookButtonsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleAddBookToLibrary = async () => {
    setIsLoading(true)
    try {
      await addBookToLibrary({
        bookId: bookId,
        userId: userId,
        libraryId: libraryId.libraryId,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveBookFromLibrary = async () => {
    setIsLoading(true)
    try {
      await deleteBookFromLibrary({ bookId: bookId, userId: userId })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button>
        Ask AI
        <BotMessageSquare />
      </Button>
      {isBookInLibrary ? (
        <Button disabled={isLoading} onClick={handleRemoveBookFromLibrary}>
          {isLoading ? "Removing..." : "Remove from your library"}
          <BookmarkX />
        </Button>
      ) : (
        <Button disabled={isLoading} onClick={handleAddBookToLibrary}>
          {isLoading ? "Adding..." : "Add to library"}
          <Bookmark />
        </Button>
      )}
      <ShareBtn />
    </div>
  )
}
