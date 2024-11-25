import BookCard, { BookCardProps } from "@/components/BookCard"
import Container from "@/components/Container"
import { buttonVariants } from "@/components/ui/button"
import { SITE_URL } from "@/site/config"
import { BookReview, BookStatus } from "@prisma/client"
import Link from "next/link"

interface LibraryEntry {
  book: BookCardProps
  id: number
  bookReview: BookReview
  bookStatus: BookStatus
}

export default async function Page({
  params,
}: {
  params: Promise<{ libraryId: number }>
}) {
  const libraryId = (await params).libraryId
  const res = await fetch(`${SITE_URL}/api/library/user/${libraryId}`)
  const library = await res.json()

  const books = Array.isArray(library)
    ? library.map((entry: LibraryEntry) => ({
        ...entry.book,
        libraryId: entry.id,
        bookReview: entry.bookReview,
        bookStatus: entry.bookStatus,
      }))
    : []

  return (
    <Container>
      {books.length > 0 ? (
        <>
          <h1 className="text-center font-bold text-3xl">
            This is your personal library page
          </h1>
          <ul className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {books.map((book: BookCardProps) => (
              <li key={book.id} className="flex items-center gap-4">
                <BookCard
                  id={book.id}
                  bookStatus={book.bookStatus}
                  author={book.author}
                  cover={book.cover}
                  isLibrary={false}
                  libraryId={book.libraryId}
                  title={book.title}
                  bookReview={book.bookReview}
                  userId={""}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <h2>This library doesnt exists</h2>
          <Link href="/" className={buttonVariants({ variant: "default" })}>
            Go back
          </Link>
        </div>
      )}
    </Container>
  )
}
