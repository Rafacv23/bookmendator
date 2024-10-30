import { Button, buttonVariants } from "@/components/ui/button"
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import {
  Library,
  LogIn,
  LogOut,
  MessageSquare,
  Search,
  UserPlus,
} from "lucide-react"

export default async function Header() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <header className="row-start-1 flex gap-6 flex-wrap items-center justify-center">
      {user ? (
        <>
          <Button>
            <MessageSquare />
            Chats
          </Button>
          <Button>
            <Search />
            Search
          </Button>
          <Button variant="outline">
            <Library />
            Library
          </Button>
          <LogoutLink className={buttonVariants({ variant: "destructive" })}>
            <LogOut />
            Logout
          </LogoutLink>
        </>
      ) : (
        <>
          <RegisterLink>
            <UserPlus />
            New user
          </RegisterLink>
          <LoginLink>
            <LogIn />
            Log in
          </LoginLink>
        </>
      )}
    </header>
  )
}
