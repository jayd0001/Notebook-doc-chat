export interface ChatHeaderProps {
  fileName: string
  onUploadClick: () => void
  onReset: () => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
}
