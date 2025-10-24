import { PDFUploadArea } from "../PDFUploadArea/PDFUploadArea"
import { PDFViewer } from "../PDFViewer/PDFViewer"
import { ChatInterface } from "../ChatInterface/ChatInterface"
import { usePDFUpload } from "../../_hooks/usePDFUpload"
import type { LayoutProps } from "./types/LayoutTypes"

export function Layout({ UploadComponent, ViewerComponent, ChatComponent }: LayoutProps) {
  const {
    pdfFile,
    pdfText,
    uploadProgress,
    isUploading,
    uploadComplete,
    handlePDFUpload,
    resetPDF,
  } = usePDFUpload()

  const Upload = UploadComponent || PDFUploadArea
  const Viewer = ViewerComponent || PDFViewer
  const Chat = ChatComponent || ChatInterface

  if (!pdfFile || isUploading) {
    return <Upload onUpload={handlePDFUpload} isUploading={isUploading} progress={uploadProgress} />
  }

  if (uploadComplete) {
    return (
      <div className="flex h-screen bg-background">
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col border-r border-border">
          <Chat
            pdfText={pdfText}
            pdfFile={pdfFile}
            onReset={resetPDF}
            onUploadNew={handlePDFUpload}
          />
        </div>

        {/* PDF Viewer */}
        <div className="w-1/2 border-l border-border">
          <Viewer file={pdfFile} />
        </div>
      </div>
    )
  }

  return <Upload onUpload={handlePDFUpload} isUploading={isUploading} progress={uploadProgress} />
}
