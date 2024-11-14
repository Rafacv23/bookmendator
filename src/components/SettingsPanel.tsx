"use client"

import { useTheme } from "next-themes"
import { Button, buttonVariants } from "./ui/button"
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import {
  Lock,
  LockOpen,
  LogOut,
  Moon,
  Sun,
  TriangleAlert,
  User,
} from "lucide-react"
import { Card } from "./ui/card"
import { Visibility } from "@prisma/client"
import {
  handleChangeLibraryVisibility,
  handleDeleteAIModel,
  handleDeleteSearchHistory,
  handleDeleteUserLibrary,
} from "@/app/settings/actions"
import { SettingConfig } from "@/types/types"

export default function SettingsPanel() {
  const { setTheme } = useTheme()
  const { user } = useKindeBrowserClient()

  const settings: SettingConfig[] = [
    {
      title: "Appearance",
      description: "Change your favourite theme for the app.",
      buttons: [
        { title: "Light", icon: <Sun />, onClick: () => setTheme("light") },
        { title: "Dark", icon: <Moon />, onClick: () => setTheme("dark") },
        { title: "System", icon: <User />, onClick: () => setTheme("system") },
      ],
    },
    {
      title: "Visibility",
      description: "Change your library visibility (private by default).",
      buttons: [
        {
          title: "Public",
          icon: <LockOpen />,
          onClick: () =>
            handleChangeLibraryVisibility(user?.id, Visibility.public),
        },
        {
          title: "Private",
          icon: <Lock />,
          onClick: () =>
            handleChangeLibraryVisibility(user?.id, Visibility.private),
        },
      ],
    },
    {
      title: "Data",
      description:
        "Keep in mind that these actions are irreversible. You can't undo these actions.",
      buttons: [
        {
          title: "Delete your search history",
          icon: <TriangleAlert />,
          onClick: handleDeleteSearchHistory,
        },
        {
          title: "Delete the AI model",
          icon: <TriangleAlert />,
          onClick: handleDeleteAIModel,
        },
        {
          title: "Delete your library",
          icon: <TriangleAlert />,
          onClick: () => handleDeleteUserLibrary(user?.id),
        },
        {
          title: "Delete your account",
          icon: <TriangleAlert />,
          onClick: () => console.log("deleted account"),
        },
      ],
    },
  ]

  return (
    <Card className="p-8 gap-4 flex flex-col items-start">
      {settings.map((option) => (
        <div key={option.title}>
          <h2 className="text-lg font-medium">{option.title}</h2>
          <Card className="p-4 flex flex-col w-80 md:w-96 items-start gap-2 mt-4">
            <small>{option.description}</small>
            <ul className="flex flex-col w-full gap-2 mt-2">
              {option.buttons.map((btn) => (
                <li key={btn.title}>
                  <Button onClick={btn.onClick} className="w-full">
                    {btn.icon} {btn.title}
                  </Button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      ))}
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
