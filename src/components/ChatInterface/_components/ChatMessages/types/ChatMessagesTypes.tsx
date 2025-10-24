export interface ChatMessagesProps {
  messages: { id: string; role: string; content: string }[]
  isLoading: boolean
  error?: string | null // allow null
  suggestedQuestions: string[]
  onSelectQuestion: (q: string) => void
  setInput: (val: string) => void
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}
