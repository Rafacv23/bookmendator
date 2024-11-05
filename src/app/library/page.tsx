import BookCard, { BookCardProps } from "@/components/BookCard"
import { SITE_URL } from "@/site/config"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

interface LibraryEntry {
  book: BookCardProps
}

export default async function Page() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const res = await fetch(`${SITE_URL}/api/library/${user.id}`)
  const library = await res.json()

  const books = library.map((entry: LibraryEntry) => entry.book)

  console.log(books)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center font-bold text-3xl">
          This is your personal library page
        </h1>
        <ul className="grid gap-4">
          {books.map((book: BookCardProps) => (
            <li key={book.id} className="flex items-center gap-4">
              <BookCard
                id={book.id}
                title={book.title}
                author={book.author}
                cover={book.cover}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
