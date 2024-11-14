import BookCard, { BookCardProps } from "@/components/BookCard"
import Container from "@/components/Container"
import { buttonVariants } from "@/components/ui/button"
import { SITE_URL } from "@/site/config"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { BookReview, BookStatus } from "@prisma/client"
import { ChevronLeft, Lock } from "lucide-react"
import Link from "next/link"

interface LibraryEntry {
  book: BookCardProps
  id: number
  bookReview: BookReview
  bookStatus: BookStatus
}

export default async function Page() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const res = await fetch(`${SITE_URL}/api/library/${user.id}`)
  const library = await res.json()

  const books = library.map((entry: LibraryEntry) => ({
    ...entry.book,
    libraryId: entry.id,
    bookReview: entry.bookReview,
    bookStatus: entry.bookStatus,
  }))

  return (
    <Container>
      <h1 className="text-center font-semibold text-xl">
        Welcome {user.given_name} to your personal library
      </h1>
      {books.length > 0 ? (
        <>
          <div className="flex gap-4 justify-between">
            <Link href={"/"} className={buttonVariants({ variant: "outline" })}>
              <ChevronLeft className="h-[1.2rem] w-[1.2rem]" />
              Back to start
            </Link>
            <Link
              href={"/settings"}
              className={buttonVariants({ variant: "outline" })}
            >
              <Lock className="h-[1.2rem] w-[1.2rem]" />
              Change your library visibility {library.libraryVisibility}
            </Link>
          </div>
          <ul className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {books.map((book: BookCardProps) => (
              <li key={book.id} className="flex items-center gap-4">
                <BookCard
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  cover={book.cover}
                  isLibrary={true}
                  libraryId={book.libraryId}
                  bookStatus={book.bookStatus}
                  bookReview={book.bookReview}
                  userId={user.id}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 max-w-xl">
          <p>
            This looks so empty... Lets going to add some books to your library.
            This will help our AI to improve his recommendations about new
            books.
          </p>
          <Link href={"/"} className={buttonVariants({ variant: "outline" })}>
            <ChevronLeft className="h-[1.2rem] w-[1.2rem]" />
            Back to start
          </Link>
        </div>
      )}
    </Container>
  )
}
