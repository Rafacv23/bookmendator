import Link from "next/link"

export default async function SearchPage({
  params,
}: {
  params: { query: string }
}) {
  const url = `https://openlibrary.org/search.json?q=${params.query}`
  const response = await fetch(url)
  const data = await response.json()

  const books = data.docs.map((book) => ({
    title: book.title,
    author: book.author_name?.[0] || "Unknown Author",
    key: book.key.replace("/works/", "").replace("/books/", ""), // Extract key without prefix
    isbn: book.isbn?.[0] || "no-isbn",
    cover: book.cover_i || null,
  }))

  console.log(books)

  return (
    <div>
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
    </div>
  )
}
