import type { PDFPageListProps } from "./types/PDFPageListTypes"

export function PDFPageList({ pages, zoom }: PDFPageListProps) {
  return (
    <div className="space-y-4 flex flex-col items-center">
      {pages.map((pageImage, index) => (
        <div
          key={`page_${index}`}
          className="border border-border rounded-lg overflow-hidden shadow-sm bg-white"
          style={{ width: `${zoom * 100}%`, maxWidth: "100%" }}
        >
          <img
            src={pageImage || "/placeholder.svg"}
            alt={`Page ${index + 1}`}
            className="w-full h-auto"
          />
        </div>
      ))}
    </div>
  )
}
