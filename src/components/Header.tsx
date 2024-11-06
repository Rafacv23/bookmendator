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
  Menu,
  MessageSquare,
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
import { ThemeBtn } from "@/components/ThemeBtn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SpecialBtn from "./ui/SpecialBtn"

export default async function Header() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <header className="row-start-1 flex gap-6 flex-wrap items-center justify-between p-4 fixed z-50 mx-0 w-full backdrop-blur-md bg-card/50 rounded-b-lg">
      {user ? (
        <>
          <Button variant={"outline"}>
            <MessageSquare />
            <span className="hidden sm:block">Chats</span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <SpecialBtn>Ask | Search</SpecialBtn>
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
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({ variant: "outline" })}
            >
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/library" className="flex items-center gap-2 ">
                  <Library className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                  Library
                </Link>
              </DropdownMenuItem>
              <ThemeBtn />
              <DropdownMenuItem>
                <LogoutLink className="flex items-center gap-2">
                  <LogOut className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                  Logout
                </LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <RegisterLink className={buttonVariants({ variant: "outline" })}>
            <UserPlus />
            New user
          </RegisterLink>
          <LoginLink className={buttonVariants({ variant: "outline" })}>
            <LogIn />
            Log in
          </LoginLink>
        </>
      )}
    </header>
  )
}
