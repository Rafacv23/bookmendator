import BookCard from "@/components/BookCard"
import Container from "@/components/Container"
import GoingUpBtn from "@/components/GoingUpBtn"
import { buttonVariants } from "@/components/ui/button"
import { Book } from "@/types/types"
import { ChevronLeft } from "lucide-react"
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
  params: Promise<{ query: string }>
}) {
  const query = (await params).query
  const url = `https://openlibrary.org/search.json?q=${query}`
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
    <Container>
      <h1 className="text-primary/80 text-center font-light">
        Results for: {data.q} <br />
        Total: {data.num_found}
      </h1>
      <div className="flex gap-4 justify-between">
        <Link href={"/"} className={buttonVariants({ variant: "outline" })}>
          <ChevronLeft className="h-[1.2rem] w-[1.2rem]" />
          Back to start
        </Link>
      </div>
      <ul className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {books.map((book) => (
          <li key={book.key} className="flex items-center gap-4">
            <BookCard
              id={book.key}
              title={book.title}
              author={book.author}
              cover={book.cover}
              isLibrary={false}
              userId={""}
            />
          </li>
        ))}
      </ul>
      <GoingUpBtn />
    </Container>
  )
}
