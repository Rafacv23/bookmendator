import { toast } from "@/hooks/use-toast"
import deleteSearchHistory from "./services/deleteSearchHistory"
import deleteAIModel from "./services/deleteAIModel"
import deleteUserLibrary from "./services/deleteUserLibrary"
import { changeLibraryVisibility } from "./services/changeLibraryVisibility"
import { Visibility } from "@prisma/client"

export const handleDeleteSearchHistory = () => {
  deleteSearchHistory()
  toast({
    title: "Search history deleted",
    description: "Your search history has been deleted",
    variant: "default",
    duration: 3000,
  })
}

export const handleDeleteAIModel = () => {
  deleteAIModel()
  toast({
    title: "AI model deleted",
    description:
      "Your AI model has been deleted, the next time that you want to chat you will need to download it again.",
    variant: "default",
    duration: 3000,
  })
}

export const handleDeleteUserLibrary = (userId: string | undefined) => {
  if (userId) {
    deleteUserLibrary({ userId })
    toast({
      title: "Library deleted",
      description: "Your library has been deleted",
      variant: "default",
      duration: 3000,
    })
  }
}

export const handleChangeLibraryVisibility = (
  userId: string | undefined,
  value: Visibility
) => {
  if (userId) {
    changeLibraryVisibility({ userId, value })
    toast({
      title: "Library visibility changed to: " + value,
      description:
        "Your library visibility has been changed, you can change it anytime.",
      variant: "default",
      duration: 3000,
    })
  }
}
