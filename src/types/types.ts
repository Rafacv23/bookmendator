import { Comment } from "@prisma/client"

export interface Book {
  key: string
  title: string
  author: string
  description: string
  cover: string
}

export interface Comments extends Comment {
  user: { name: string }
}

export interface Report {
  progress: number
  timeElapsed: number
  text: string
}

export interface Message {
  role: "user" | "assistant"
  content: string
}
