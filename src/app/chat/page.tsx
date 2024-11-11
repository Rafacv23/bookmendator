"use client"

import { useState, useEffect } from "react"
import Container from "@/components/Container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizontal } from "lucide-react"
import * as webllm from "@mlc-ai/web-llm"
import { MLCEngine } from "@mlc-ai/web-llm"
import { Message, Report } from "@/types/types"
import TextareaAutosize from "react-textarea-autosize"

export default function ChatPage() {
  const [engine, setEngine] = useState<MLCEngine | null>(null)
  const [userMessage, setUserMessage] = useState(
    sessionStorage.getItem("question") || ""
  )
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [initProgress, setInitProgress] = useState<string>("")

  useEffect(() => {
    const initializeEngine = async () => {
      const initProgressCallback = (report: Report) => {
        setInitProgress(report.text)
      }
      const selectedModel = "Llama-3.2-1B-Instruct-q4f32_1-MLC"
      const engineInstance = await webllm.CreateMLCEngine(selectedModel, {
        initProgressCallback,
      })
      setEngine(engineInstance)
      setInitProgress("") // Clear init progress after setup
    }

    initializeEngine()
  }, [])

  const handleSendMessage = async () => {
    if (!userMessage || !engine || initProgress) return // Ensure engine is ready

    const newChatMessages: Message[] = [
      ...chatMessages,
      { role: "user", content: userMessage },
    ]
    setChatMessages(newChatMessages)
    sessionStorage.removeItem("question")
    setUserMessage("")
    setIsGenerating(true)

    const request = {
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are a book recommender and should respond with book recommendations, any type of book.",
        },
        ...newChatMessages.map((message) => ({
          ...message,
          role: message.role === "user" ? "user" : "assistant",
        })),
      ],
    }

    try {
      const asyncChunkGenerator = await engine.chat.completions.create(request)

      let aiMessage = ""

      for await (const chunk of asyncChunkGenerator) {
        aiMessage += chunk.choices[0]?.delta?.content || ""
        setChatMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { role: "assistant", content: aiMessage }, // Agregar el mensaje del asistente
        ])
      }
    } catch (error) {
      console.error("Error during chat completion:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Container>
      <h1>Chat</h1>
      <div className="flex flex-col gap-8 max-w-3xl">
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
            disabled={isGenerating}
            placeholder="Type your next question"
            className="bg-card overflow-hidden resize-none flex min-h-[60px] w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
      <div className="max-w-3xl flex flex-col items-center gap-4 mt-8">
        <small>Model: Llama-3.2</small>
        <small>{initProgress}</small>
      </div>
    </Container>
  )
}
