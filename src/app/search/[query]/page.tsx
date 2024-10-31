import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Book } from "@/types/types"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import Link from "next/link"

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
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <li key={book.key} className="flex items-center gap-4">
              <Link href={`/book/${book.key}`}>
                <Card className="hover:shadow-lg transition-all hover:scale-105 hover:cursor-pointer max-w-sm w-96 h-40">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {book.cover && (
                      <img
                        loading="lazy"
                        src={book.cover}
                        alt={`${book.title} cover`}
                        className="w-20 h-28 rounded object-cover aspect-auto"
                      />
                    )}
                    <div className="space-y-2">
                      <CardTitle>{book.title}</CardTitle>
                      <CardDescription>{book.author}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
