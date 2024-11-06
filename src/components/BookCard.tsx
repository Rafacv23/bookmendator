import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import BookSettings from "./BookSettings"
import { BookReview, BookStatus } from "@prisma/client"

export interface BookCardProps {
  id: string
  cover: string
  title: string
  author: string
  isLibrary: boolean
  libraryId?: number
  bookStatus?: BookStatus
  bookReview?: BookReview
  userId: string
}

export default function BookCard({
  id,
  cover,
  title,
  author,
  isLibrary,
  libraryId,
  bookStatus,
  bookReview,
  userId,
}: BookCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all hover:scale-105 hover:cursor-pointer max-w-sm w-96 h-auto">
      <Link href={`/book/${id}`}>
        <CardHeader className="flex flex-row items-center gap-4">
          {cover && (
            <img
              loading="lazy"
              src={cover}
              alt={`${title} cover`}
              className="w-20 h-28 rounded object-cover aspect-auto"
            />
          )}
          <div className="space-y-2">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{author}</CardDescription>
          </div>
        </CardHeader>
      </Link>
      {isLibrary ? (
        <BookSettings
          bookId={id}
          libraryId={libraryId}
          bookReview={bookReview}
          bookStatus={bookStatus}
          userId={userId}
        />
      ) : null}
    </Card>
  )
}
