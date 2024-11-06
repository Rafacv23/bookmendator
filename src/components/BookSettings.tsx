import { CardFooter } from "@/components/ui/card"
import { BookReview, BookStatus } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import BookSettingsForm from "@/components/BookSettingsForm"
import { formatString } from "@/lib/utils"
import CommentDrawer from "@/components/CommentDrawer"

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
      <CommentDrawer />
    </CardFooter>
  )
}
