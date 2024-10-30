import { Book } from "@/types/types"
import Link from "next/link"

interface BookApiResponse {
  author_name: string[]
  key: string
  title: string
  isbn: string
  cover_i: string
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
    key: book.key.replace("/works/", "").replace("/books/", ""), // Extract key without prefix
    isbn: book.isbn?.[0] || "no-isbn",
    cover: book.cover_i || null,
  }))

  console.log(books)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Search Page</h1>
        <ul>
          {books.map((book) => (
            <li key={book.key}>
              <Link href={`/book/${book.key}`}>
                {book.title} by {book.author}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
