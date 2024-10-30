export default async function BookPage({
  params,
}: {
  params: { key: string }
}) {
  const url = `https://openlibrary.org/books/${params.key}.json`
  const response = await fetch(url)
  const book = await response.json()
  const authorUrl = `https://openlibrary.org/${book.authors[0].author.key}.json`
  const authorResponse = await fetch(authorUrl)
  const author = await authorResponse.json()
  const imageUrl = `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`

  console.log(book.authors[0].author.key)

  console.log(book)
  console.log(author)

  return (
    <div>
      <img src={imageUrl} alt={book.title} />
      <h1>{book.title}</h1>
      <p>Author: {author.name || "Unknown Author"}</p>
      <p>Published: {book.publish_date || "Unknown Date"}</p>
      <p>Number of Pages: {book.number_of_pages || "N/A"}</p>
    </div>
  )
}
