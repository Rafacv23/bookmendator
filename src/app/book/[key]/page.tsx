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

export default async function BookPage({
  params,
}: {
  params: { key: string }
}) {
  const key = await params.key
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  let bookData
  try {
    bookData = await getBook(key)
  } catch (error) {
    console.error(error)
    return <div>Error fetching book details.</div>
  }

  const {
    title,
    cover,
    description,
    author: bookAuthor,
    subjects,
    rating,
  } = bookData

  const isBookInLibrary = await isBookInUserLibrary(key, user.id)

  return (
    <Container>
      <div className="sm:flex gap-4">
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
          <p>User reviews: {rating}</p>
          {!user ? (
            <LoginLink className={buttonVariants({ variant: "default" })}>
              Login to add this book to your library
            </LoginLink>
          ) : (
            <BookButtons
              isBookInLibrary={isBookInLibrary}
              bookId={key}
              userId={user.id}
            />
          )}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold">Description</h3>
          <p>{description}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Subjects</h3>
          <ul className="flex flex-wrap gap-2">
            {subjects?.slice(0, 5).map((subject: string) => (
              <li key={subject}>
                <Badge>{subject}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Comments</h3>
        Aqui irán los comentarios de los usuarios
      </div>
    </Container>
  )
}
