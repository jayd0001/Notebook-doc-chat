import { PDFPageList } from "./_components/PDFPageList/PDFPageList"
import { PDFStatus } from "./_components/PDFStatus/PDFStatus"
import { PDFToolbar } from "./_components/PDFToolbar/PDFToolbar"
import { usePDFViewer } from "./_hooks/usePDFViewer"
import type { PDFViewerProps } from "./types/PDFViewerTypes"

export function PDFViewer({ file }: PDFViewerProps) {
  const { pages, loading, error, zoom, handleZoomIn, handleZoomOut } = usePDFViewer(file)

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <PDFToolbar zoom={zoom} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        <PDFStatus loading={loading} error={error} />
        {!loading && !error && pages.length > 0 && <PDFPageList pages={pages} zoom={zoom} />}
      </div>
    </div>
  )
}
