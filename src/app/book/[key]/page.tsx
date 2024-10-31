export default async function BookPage({
  params,
}: {
  params: { key: string }
}) {
  const key = params.key // No need to await here
  const url = `https://openlibrary.org/books/${key}.json`

  // Fetch the book details
  const response = await fetch(url)
  if (!response.ok) {
    return <div>Error fetching book details.</div> // Error handling
  }

  const book = await response.json()

  console.log(book)

  // Handle cases where the author data might not exist
  const authorUrl = book.authors?.[0]?.author?.key
    ? `https://openlibrary.org${book.authors[0].author.key}.json`
    : null

  let author
  if (authorUrl) {
    const authorResponse = await fetch(authorUrl)
    if (authorResponse.ok) {
      author = await authorResponse.json()
    } else {
      author = { name: "Unknown Author" } // Fallback in case of author fetch failure
    }
  } else {
    author = { name: "Unknown Author" } // Fallback if author key is not available
  }

  // Image URL handling with a fallback
  const imageUrl = book.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : null

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex">
        {imageUrl && <img src={imageUrl} alt={book.title} className="mb-4" />}
        <div>
          <h1 className="text-xl font-bold">{book.title}</h1>
          <p>Author: {author.name}</p>
          <p>short description</p>
        </div>
      </div>
      <div className="flex">
        <div>
          <h3>Description</h3>
          <p>Aqui ira la descripcion completa del libro</p>
        </div>
        <div>
          <h3>Editors</h3>
          <h3>Languages</h3>
          <h3>Subjects</h3>
        </div>
      </div>
      <p>Published: {book.publish_date || "Unknown Date"}</p>
      <p>Number of Pages: {book.number_of_pages || "N/A"}</p>
    </div>
  )
}
