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

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-7xl">
        <h1 className="text-center font-bold text-3xl">
          This is your personal library page
        </h1>
        <ul className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
      </main>
    </div>
  )
}
