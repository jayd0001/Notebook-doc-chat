import { AlertCircle } from "lucide-react"
import type { ChatMessagesProps } from "./types/ChatMessagesTypes"

export function ChatMessages({
  messages,
  isLoading,
  error,
  suggestedQuestions,
  setInput,
  messagesEndRef,
}: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 curs">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${message.role === "user" ? "bg-purple-600 text-white rounded-br-none" : "bg-gray-100 text-foreground rounded-bl-none"}`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 text-foreground px-4 py-3 rounded-lg rounded-bl-none">
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex justify-start">
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg flex gap-2 max-w-xs">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {messages.length === 1 && !isLoading && (
        <div className="space-y-3 mt-6">
          <p className="text-sm text-muted-foreground font-medium">Suggested questions:</p>
          {suggestedQuestions.map((question, idx) => (
            <button
              key={idx}
              onClick={() => setInput(question)}
              className="w-full text-left text-sm p-3 rounded-lg border border-border hover:bg-gray-50 transition-colors text-foreground"
            >
              • {question}
            </button>
          ))}
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
