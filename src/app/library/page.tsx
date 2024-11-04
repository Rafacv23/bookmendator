import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SITE_URL } from "@/site/config"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Link from "next/link"

export default async function Page() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const res = await fetch(`${SITE_URL}/api/library/${user.id}`)
  const library = await res.json()

  console.log(library)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center font-bold text-3xl">
          Welcome to Bookmendator this is your personal library Page
        </h2>
        <ul>
          {library.map((book) => (
            <li key={book.bookId} className="flex items-center gap-4">
              <Link href={`/book/${book.key}`}>
                <Card className="hover:shadow-lg transition-all hover:scale-105 hover:cursor-pointer max-w-sm w-96 h-40">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {book.book.cover && (
                      <img
                        loading="lazy"
                        src={book.book.cover}
                        alt={`${book.book.title} cover`}
                        className="w-20 h-28 rounded object-cover aspect-auto"
                      />
                    )}
                    <div className="space-y-2">
                      <CardTitle>{book.book.title}</CardTitle>
                      <CardDescription>{book.book.author}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
