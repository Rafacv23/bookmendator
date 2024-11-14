"use client"

import { useTheme } from "next-themes"
import { Button, buttonVariants } from "./ui/button"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs"
import { LogOut, Moon, Sun, TriangleAlert, User } from "lucide-react"
import { Card } from "./ui/card"
import { useToast } from "@/hooks/use-toast"
import deleteSearchHistory from "@/app/settings/services/deleteSearchHistory"
import deleteAIModel from "@/app/settings/services/deleteAIModel"

export default function SettingsPanel() {
  const { setTheme } = useTheme()
  const { toast } = useToast()

  const handleDeleteSearchHistory = () => {
    deleteSearchHistory()
    toast({
      title: "Search history deleted",
      description: "Your search history has been deleted",
      variant: "default",
      duration: 3000,
    })
  }

  const handleDeleteAIModel = () => {
    deleteAIModel()
    toast({
      title: "AI model deleted",
      description:
        "Your AI model has been deleted, the next time that you want to chat you will need to download it again.",
      variant: "default",
      duration: 3000,
    })
  }

  return (
    <Card className="p-8 gap-4 flex flex-col items-start">
      <h2 className="text-lg font-medium">Appearance</h2>
      <Card className="p-4 flex flex-col items-start gap-2">
        <small>Set your favourite theme for the app.</small>
        <ul className="flex flex-wrap gap-2 mt-2">
          <Button
            onClick={() => setTheme("light")}
            className="hover:cursor-pointer"
          >
            <Sun className="h-[1.2rem] w-[1.2rem]" /> Light
          </Button>
          <Button
            onClick={() => setTheme("dark")}
            className="hover:cursor-pointer"
          >
            <Moon className="h-[1.2rem] w-[1.2rem]" /> Dark
          </Button>
          <Button
            onClick={() => setTheme("system")}
            className="hover:cursor-pointer"
          >
            <User className="h-[1.2rem] w-[1.2rem]" /> System
          </Button>
        </ul>
      </Card>
      <h2 className="text-lg font-medium">Visibility</h2>
      <Card className="p-4 flex flex-col items-start w-full gap-2">
        <small>Change your library visibility (private by default).</small>
        <ul className="flex flex-wrap gap-2 mt-2">
          <Button>Public</Button>
          <Button>Private</Button>
        </ul>
      </Card>
      <h2 className="text-lg font-medium">Data</h2>
      <Card className="p-4 flex flex-col items-start w-full gap-2">
        <small className="flex items-center gap-2">
          <TriangleAlert className="h-[1.2rem] w-[1.2rem]" /> Keep in mind that
          this actions are irreversible.
        </small>
        <ul className="flex flex-col w-full gap-2 mt-2">
          <Button onClick={handleDeleteSearchHistory}>
            Delete your searchs history
          </Button>
          <Button onClick={handleDeleteAIModel}>
            Delete the model (AI model)
          </Button>
          <Button>Delete your library</Button>
          <Button>Delete your account</Button>
        </ul>
      </Card>
      <h2 className="text-lg font-medium">Manage</h2>
      <Card className="p-4 flex flex-col items-start w-full gap-2">
        <LogoutLink
          className={buttonVariants({
            variant: "destructive",
            className: "w-full",
          })}
        >
          <LogOut className="h-[1.2rem] w-[1.2rem]" />
          Close session
        </LogoutLink>
      </Card>
    </Card>
  )
}
