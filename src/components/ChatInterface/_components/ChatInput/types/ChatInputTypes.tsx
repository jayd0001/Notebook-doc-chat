export interface ChatInputProps {
  input: string
  setInput: (val: string) => void
  handleSendMessage: (e: React.FormEvent) => void
  isLoading: boolean
}
