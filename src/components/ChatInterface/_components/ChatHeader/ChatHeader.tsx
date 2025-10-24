import { Upload, X } from "lucide-react"
import { Button } from "../../../Button/Button"
import type { ChatHeaderProps } from "./types/ChatHeaderTypes"

export function ChatHeader({
  fileName,
  onUploadClick,
  onReset,
  fileInputRef,
  onFileSelect,
}: ChatHeaderProps) {
  return (
    <div className="border-b border-border p-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Document Chat</h1>
        <p className="text-xs text-muted-foreground mt-1">{fileName}</p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onUploadClick}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" /> Upload New
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={onFileSelect}
          className="hidden"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
