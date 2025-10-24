import type { PDFUploadAreaProps } from "./types/PDFUploadAreaTypes"
import { usePDFUpload } from "./_hooks/usePDFUpload"
import { UploadingOverlay } from "./_components/UploadingOverlay/UploadingOverlay"
import { UploadCard } from "./_components/UploadCard/UploadCard"

export function PDFUploadArea({ onUpload, isUploading, progress }: PDFUploadAreaProps) {
  const { isDragging, handleDragOver, handleDragLeave, handleDrop, handleFileSelect } =
    usePDFUpload(onUpload)

  if (isUploading) return <UploadingOverlay progress={progress} />

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gray-100 transition-colors ${
        isDragging ? "bg-gray-200" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <UploadCard onFileSelect={handleFileSelect} />
    </div>
  )
}
