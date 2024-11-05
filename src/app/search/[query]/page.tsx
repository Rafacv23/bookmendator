import BookCard from "@/components/BookCard"
import { Book } from "@/types/types"

interface BookApiResponse {
  author_name: string[]
  author_key: string
  first_publish_year: number
  key: string
  title: string
  isbn: string[]
  cover_i: string
  place: string
}

export default async function SearchPage({
  params,
}: {
  params: { query: string }
}) {
  const url = `https://openlibrary.org/search.json?q=${params.query}`
  const response = await fetch(url)
  const data = await response.json()

  const books: Book[] = data.docs.map((book: BookApiResponse) => ({
    title: book.title,
    author: book.author_name?.[0] || "Unknown Author",
    authorKey: book.author_key,
    publishedYear: book.first_publish_year,
    key: book.key.replace("/works/", "").replace("/books/", ""), // Extract key without prefix
    isbn: book.isbn?.[0] || "no-isbn",
    cover: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : `https://placehold.co/100x160?text=${book.title}`, // Generate cover image URL
    place: book.place,
  }))

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-7xl">
        <h1>
          Results for {data.q} total results {data.num_found}
        </h1>
        <ul className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {books.map((book) => (
            <li key={book.key} className="flex items-center gap-4">
              <BookCard
                id={book.key}
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
