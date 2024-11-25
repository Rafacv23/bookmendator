import BookButtons from "@/components/BookButtons"
import Container from "@/components/Container"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server"
import { getBook } from "./services/getBook"
import isBookInUserLibrary from "./services/isBookInUserLibrary"
import { SITE_URL } from "@/site/config"
import { Comments } from "@/types/types"
import { format } from "date-fns"
import { formatString } from "@/lib/utils"

export default async function BookPage({
  params,
}: {
  params: { key: string }
}) {
  const key = params.key
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  let bookData
  try {
    bookData = await getBook(key)
  } catch (error) {
    console.error(error)
  }

  const {
    title,
    cover,
    description,
    author: bookAuthor,
    subjects,
    rating,
  } = bookData

  let isBookInLibrary = false
  let libraryId

  if (user) {
    isBookInLibrary = await isBookInUserLibrary(key, user.id)
    const libraryResponse = await fetch(`${SITE_URL}/api/${user.id}/libraryId`)
    libraryId = await libraryResponse.json()
  }
  const res = await fetch(`${SITE_URL}/api/book/comments/${key}`)
  const comments = await res.json()

  return (
    <Container>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center max-w-4xl">
        {cover && (
          <img
            src={cover}
            alt={title}
            className="mb-4 rounded shadow-xl aspect-auto"
          />
        )}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{title}</h1>
          <h2 className="text-xl font-semibold">{bookAuthor}</h2>
          <p>User reviews: {formatString(rating)}</p>
          <div className="xl:mb-8 mb-4">
            <h3 className="text-lg font-semibold">Subjects</h3>
            <ul className="flex flex-wrap gap-2">
              {subjects?.slice(0, 5).map((subject: string) => (
                <li key={subject}>
                  <Badge variant={"outline"}>{subject}</Badge>
                </li>
              ))}
            </ul>
          </div>
          {!user ? (
            <LoginLink className={buttonVariants({ variant: "default" })}>
              Login to add this book to your library
            </LoginLink>
          ) : (
            <BookButtons
              isBookInLibrary={isBookInLibrary}
              bookId={key}
              userId={user.id}
              libraryId={libraryId}
              title={title}
              author={bookAuthor}
            />
          )}
        </div>
      </div>
      <div className="grid gap-4 w-full">
        <div className="max-w-4xl bg-card p-8 rounded-lg">
          <h3 className="text-lg font-semibold">Description</h3>
          <p>{description}</p>
        </div>
        <div className="max-w-4xl bg-card p-8 rounded-lg">
          <h3 className="text-lg font-semibold">Comments</h3>
          {comments.length > 0 ? (
            <ul className="mt-4 flex flex-col gap-8">
              {comments.map((comment: Comments) => (
                <li key={comment.content}>
                  <h5>
                    {comment.user.name}{" "}
                    <small className="text-primary/70">
                      at{" "}
                      {format(
                        new Date(comment.updatedAt),
                        "MMMM dd, yyyy 'at' HH:mm"
                      )}
                    </small>
                  </h5>
                  <p>{comment.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            `No comments yet.`
          )}
        </div>
      </div>
    </Container>
  )
}
