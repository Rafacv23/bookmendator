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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Forms from "./Forms"
import Link from "next/link"

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
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Search /> Search
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="hidden">
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription>
              </DialogHeader>
              <Forms />
            </DialogContent>
          </Dialog>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/library"
          >
            <Library />
            Library
          </Link>
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
