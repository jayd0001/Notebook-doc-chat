import { Button } from "../../../Button/Button"
import { ZoomIn, ZoomOut } from "lucide-react"
import type { PDFToolbarProps } from "./types/PDFToolbarTypes"

export function PDFToolbar({ zoom, onZoomIn, onZoomOut }: PDFToolbarProps) {
  return (
    <div className="flex items-center justify-center gap-2 p-4 border-b border-border bg-white">
      <Button
        variant="outline"
        size="sm"
        onClick={onZoomOut}
        disabled={zoom <= 0.5}
        className="flex items-center gap-2 bg-transparent"
      >
        <ZoomOut className="w-4 h-4" /> Zoom Out
      </Button>
      <span className="text-sm font-medium min-w-12 text-center">{Math.round(zoom * 100)}%</span>
      <Button
        variant="outline"
        size="sm"
        onClick={onZoomIn}
        disabled={zoom >= 2}
        className="flex items-center gap-2"
      >
        <ZoomIn className="w-4 h-4" /> Zoom In
      </Button>
    </div>
  )
}
