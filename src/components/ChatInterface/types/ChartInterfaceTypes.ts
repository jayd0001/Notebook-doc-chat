export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export interface ChatInterfaceProps {
  pdfText: string
  pdfFile: File
  onReset: () => void
  onUploadNew: (file: File) => void
}

export interface UseChatProps {
  pdfText: string
  onUploadNew: (file: File) => void
}

export interface ChatState {
  messages: Message[]
  input: string
  isLoading: boolean
  error: string | null
}
