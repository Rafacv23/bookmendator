import Container from "@/components/Container"
import { buttonVariants } from "@/components/ui/button"
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server"
import Link from "next/link"

export default async function SettingsPage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-xl">You are not logged in</h1>
          <div className="flex flex-row gap-4">
            <Link href={"/"} className={buttonVariants({ variant: "outline" })}>
              Back to start
            </Link>
            <LoginLink className={buttonVariants({ variant: "default" })}>
              Log in
            </LoginLink>
            <RegisterLink className={buttonVariants({ variant: "default" })}>
              Create an account
            </RegisterLink>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <h1>Hi {user.given_name} This is your settings page</h1>
      <div>
        <button>Delete your account</button>
        <button>Change your library visibility</button>
        <button>Delete your library</button>
        <button>Delete your searchs history</button>
        <button>Delete the data (All related to AI)</button>
        <button>Set your favourite theme for the app</button>
        <LogoutLink>Close session</LogoutLink>
      </div>
    </Container>
  )
}
