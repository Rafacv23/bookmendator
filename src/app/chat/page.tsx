"use client"

import Container from "@/components/Container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SendHorizontal } from "lucide-react"
import TextareaAutosize from "react-textarea-autosize"
import { useChat } from "@/hooks/useChat"

export default function ChatPage() {
  const {
    userMessage,
    setUserMessage,
    chatMessages,
    isGenerating,
    initProgress,
    handleSendMessage,
  } = useChat()

  return (
    <Container>
      <div className="flex flex-col gap-8 max-w-4xl">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              msg.role === "user" ? "items-end" : "items-start"
            } gap-2`}
          >
            <Badge>{msg.role === "user" ? "User" : "AI"}</Badge>
            <Card className="p-4 rounded-md">{msg.content}</Card>
          </div>
        ))}
        <div className="flex flex-row justify-between items-center gap-4 min-w-96">
          <TextareaAutosize
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your next question"
            className="bg-card overflow-hidden resize-none flex min-h-[36px] w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button
            type="submit"
            onClick={handleSendMessage}
            disabled={isGenerating || initProgress !== ""}
          >
            Ask
            <SendHorizontal />
          </Button>
        </div>
      </div>
      <div className="max-w-3xl flex flex-col items-center gap-4 mt-8 text-primary/80">
        <small>Model: Llama-3.2</small>
        <small>{initProgress}</small>
      </div>
    </Container>
  )
}
