import { useState, useEffect } from "react"
import * as webllm from "@mlc-ai/web-llm"
import { MLCEngine } from "@mlc-ai/web-llm"
import { Message, Report } from "@/types/types"

export const useChat = () => {
  const [engine, setEngine] = useState<MLCEngine | null>(null)
  const [userMessage, setUserMessage] = useState<string>("")
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
    setUserMessage("") // Reset user input
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
      // @ts-expect-error No overload matches this call"
      const asyncChunkGenerator = await engine.chat.completions.create(request)

      let aiMessage = ""

      for await (const chunk of asyncChunkGenerator) {
        aiMessage += chunk.choices[0]?.delta?.content || ""
        setChatMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { role: "assistant", content: aiMessage }, // Add assistant message
        ])
      }
    } catch (error) {
      console.error("Error during chat completion:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    userMessage,
    setUserMessage,
    chatMessages,
    isGenerating,
    initProgress,
    handleSendMessage,
  }
}
