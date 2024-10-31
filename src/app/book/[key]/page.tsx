import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, Share2 } from "lucide-react"

export default async function BookPage({
  params,
}: {
  params: { key: string }
}) {
  const key = await params.key // Access directly without awaiting
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
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`
    : `https://placehold.co/180x280?text=${book.title}`

  // Handle description safely
  const description = book.description?.value || "No description available."

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="sm:flex gap-4">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={book.title}
              className="mb-4 rounded shadow-xl aspect-auto"
            />
          )}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">{book.title}</h1>
            <h2 className="text-xl font-semibold">{author.name}</h2>
            <div className="flex gap-2">
              <Button>Start Reading</Button>
              <Button>
                <Bookmark />
              </Button>
              <Button>
                <Share2 />
              </Button>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Description</h3>
            <p>{description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Subjects</h3>
            <ul className="flex flex-wrap gap-2">
              {book.subjects?.slice(0, 5).map((subject: string) => (
                <li key={subject}>
                  <Badge>{subject}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
