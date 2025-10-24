export interface PDFUploadAreaProps {
  onUpload: (file: File) => void
  isUploading: boolean
  progress: number
}
