"use client"

import { Bookmark, BotMessageSquare, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import addBookToLibrary from "@/app/book/[key]/services/addBookToLibrary"

interface BookButtonsProps {
  bookId: string
  userId: string
}

export default function BookButtons({ bookId, userId }: BookButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button>
        Ask AI
        <BotMessageSquare />
      </Button>
      <Button
        onClick={() => addBookToLibrary({ bookId: bookId, userId: userId })}
      >
        Add to library
        <Bookmark />
      </Button>
      <Button>
        <Share2 />
      </Button>
    </div>
  )
}
