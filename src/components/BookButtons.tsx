"use client"

import { Bookmark, BotMessageSquare, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import addBookToLibrary from "@/app/book/[key]/services/addBookToLibrary"
import { useState } from "react"

interface BookButtonsProps {
  bookId: string
  userId: string
}

export default function BookButtons({ bookId, userId }: BookButtonsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleAddBookToLibrary = async () => {
    setIsLoading(true)
    try {
      await addBookToLibrary({ bookId: bookId, userId: userId })
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
      <Button disabled={isLoading} onClick={handleAddBookToLibrary}>
        {isLoading ? "Adding..." : "Add to library"}
        <Bookmark />
      </Button>
      <Button>
        <Share2 />
      </Button>
    </div>
  )
}
