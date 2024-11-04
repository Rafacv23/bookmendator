import { SITE_URL } from "@/site/config"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

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
            <li key={book.bookId}>{book.bookId}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
