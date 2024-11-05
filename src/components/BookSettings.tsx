import { MessageSquareMore } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { BookReview, BookStatus } from "@prisma/client"
import { Badge } from "./ui/badge"
import BookSettingsForm from "./BookSettingsForm"
import { formatString } from "@/lib/utils"

interface BookSettingsProps {
  bookId: string
  libraryId?: number
  bookStatus?: BookStatus
  bookReview?: BookReview
}

export default function BookSettings({
  bookId,
  libraryId,
  bookReview,
  bookStatus,
}: BookSettingsProps) {
  return (
    <CardFooter className="grid gap-4">
      <div className="flex flex-row justify-between">
        <div className="flex gap-2">
          <Badge variant={"outline"}>{formatString(bookReview)}</Badge>
          <Badge variant={"outline"}>{formatString(bookStatus)}</Badge>
        </div>
        <BookSettingsForm
          bookId={bookId}
          libraryId={libraryId}
          bookReview={bookReview}
          bookStatus={bookStatus}
        />
      </div>
      <Button>
        <MessageSquareMore /> Leave a comment
      </Button>
    </CardFooter>
  )
}
