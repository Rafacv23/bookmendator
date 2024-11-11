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

interface Report {
  progress: number
  timeElapsed: number
  text: string
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const [engine, setEngine] = useState<MLCEngine | null>(null)
  const [userMessage, setUserMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [initProgress, setInitProgress] = useState("") // Track initialization progress

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

    const newChatMessages = [
      ...chatMessages,
      { role: "user", content: userMessage },
    ]
    setChatMessages(newChatMessages)
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

    const asyncChunkGenerator = await engine.chat.completions.create(request)

    // Aquí vamos a empezar a mostrar los fragmentos poco a poco
    let aiMessage = "" // Variable para almacenar el mensaje acumulado

    for await (const chunk of asyncChunkGenerator) {
      aiMessage += chunk.choices[0]?.delta?.content || "" // Acumulamos el fragmento
      setChatMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), // Eliminar el último mensaje del asistente (si lo hay)
        { role: "assistant", content: aiMessage }, // Agregar el mensaje acumulado
      ])
    }

    setIsGenerating(false)
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
          <Textarea
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your next question"
            className="bg-card"
            disabled={isGenerating}
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
      <small>Model: Llama-3.2</small>
      <small>{initProgress}</small>
    </Container>
  )
}
