import type { ChatInterfaceProps } from "./types/ChartInterfaceTypes"
import { ChatHeader } from "./_components/ChatHeader/ChatHeader"
import { ChatInput } from "./_components/ChatInput/ChatInput"
import { ChatMessages } from "./_components/ChatMessages/ChatMessages"
import { useChat } from "./_hooks/useChat"

export function ChatInterface({
  pdfText,
  pdfFile,
  onReset,
  onUploadNew,
  children,
}: ChatInterfaceProps & { children?: React.ReactNode }) {
  const {
    state,
    setInput,
    messagesEndRef,
    fileInputRef,
    handleSendMessage,
    handleFileSelect,
    suggestedQuestions,
  } = useChat({
    pdfText,
    onUploadNew,
  })

  return (
    <div className="flex flex-col h-full bg-white">
      <ChatHeader
        fileName={pdfFile.name}
        onUploadClick={() => fileInputRef.current?.click()}
        onReset={onReset}
        fileInputRef={fileInputRef}
        onFileSelect={handleFileSelect}
      />

      <ChatMessages
        messages={state.messages}
        isLoading={state.isLoading}
        error={state.error}
        suggestedQuestions={suggestedQuestions}
        onSelectQuestion={setInput}
        setInput={setInput}
        messagesEndRef={messagesEndRef}
      />

      <ChatInput
        input={state.input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
        isLoading={state.isLoading}
      />

      {children}
    </div>
  )
}
