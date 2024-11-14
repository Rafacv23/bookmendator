import Container from "@/components/Container"
import SettingsPanel from "@/components/SettingsPanel"
import { buttonVariants } from "@/components/ui/button"
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server"
import { ChevronLeft } from "lucide-react"
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
      <h1 className="text-xl font-semibold">
        Hi {user.given_name}! This is your settings page
      </h1>
      <Link href={"/"} className={buttonVariants({ variant: "outline" })}>
        <ChevronLeft className="h-[1.2rem] w-[1.2rem]" />
        Back to start
      </Link>
      <SettingsPanel />
    </Container>
  )
}
