import { Button, buttonVariants } from "@/components/ui/button"
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export default async function Header() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <header className="row-start-1 flex gap-6 flex-wrap items-center justify-center">
      {user ? (
        <>
          <Button>Chats</Button>
          <Button>Search</Button>
          <Button>Library</Button>
          <LogoutLink className={buttonVariants({ variant: "destructive" })}>
            Logout
          </LogoutLink>
        </>
      ) : (
        <>
          <LoginLink>Sign in</LoginLink>
          <LoginLink>Log in</LoginLink>
        </>
      )}
    </header>
  )
}
