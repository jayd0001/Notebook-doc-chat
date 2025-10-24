import { Send } from "lucide-react"
import { Button } from "../../../Button/Button"
import type { ChatInputProps } from "./types/ChatInputTypes"

export function ChatInput({ input, setInput, handleSendMessage, isLoading }: ChatInputProps) {
  return (
    <div className="border-t border-border p-4 bg-white">
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the document..."
          disabled={isLoading}
          className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}
