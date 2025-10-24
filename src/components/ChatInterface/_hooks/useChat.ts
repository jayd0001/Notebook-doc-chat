import { useState, useRef, useEffect } from "react"
import { chatWithGroq } from "../../../actions/actions"
import type { ChatState, Message, UseChatProps } from "../types/ChartInterfaceTypes"

export function useChat({ pdfText, onUploadNew }: UseChatProps) {
  const [state, setState] = useState<ChatState>({
    messages: [
      {
        id: "1",
        role: "assistant",
        content: "Your document is ready! Feel free to ask me any questions about it.",
      },
    ],
    input: "",
    isLoading: false,
    error: null,
  })

  const suggestedQuestions = [
    "What is the main topic of this document?",
    "Can you summarize the key points?",
    "What are the conclusions or recommendations?",
  ]

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [state.messages])

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!state.input.trim() || state.isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: state.input,
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      input: "",
      isLoading: true,
      error: null,
    }))

    try {
      const conversationHistory = state.messages
        .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
        .join("\n\n")

      const result = await chatWithGroq({
        pdfText,
        conversationHistory,
        userInput: state.input,
      })

      if (!result.success) throw new Error(result.error)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.text,
      }

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
      }))
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "An error occurred",
      }))
    } finally {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }))
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      onUploadNew(files[0])
    }
  }

  const setInput = (value: string) => {
    setState((prev) => ({ ...prev, input: value }))
  }

  return {
    state,
    setInput,
    suggestedQuestions,
    messagesEndRef,
    fileInputRef,
    handleSendMessage,
    handleFileSelect,
  }
}
