import { useState, useEffect, useRef } from "react"
import * as pdfjsLib from "pdfjs-dist"
import type { PDFState } from "../types/PDFViewerTypes"

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`
}

export function usePDFViewer(file: File) {
  const [state, setState] = useState<PDFState>({
    pages: [],
    loading: false,
    error: undefined,
    zoom: 0.5,
  })

  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])

  useEffect(() => {
    setState((prev) => ({ ...prev, pages: [], loading: true, error: undefined }))
    canvasRefs.current = []

    const renderPDF = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        const renderedPages: string[] = []

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum)
          const viewport = page.getViewport({ scale: 1.5 })

          const canvas = document.createElement("canvas")
          const context = canvas.getContext("2d")
          if (!context) throw new Error("Failed to get canvas context")

          canvas.width = viewport.width
          canvas.height = viewport.height

          await page.render({ canvas, viewport }).promise
          renderedPages.push(canvas.toDataURL("image/png"))
        }

        setState((prev) => ({ ...prev, pages: renderedPages, loading: false }))
      } catch (err) {
        console.error("Error rendering PDF:", err)
        setState((prev) => ({
          ...prev,
          error: "Failed to load PDF. Please try again.",
          pages: [],
          loading: false,
        }))
      }
    }

    renderPDF()
  }, [file])

  const handleZoomIn = () => setState((prev) => ({ ...prev, zoom: Math.min(prev.zoom + 0.1, 2) }))
  const handleZoomOut = () =>
    setState((prev) => ({ ...prev, zoom: Math.max(prev.zoom - 0.1, 0.5) }))

  return {
    ...state,
    handleZoomIn,
    handleZoomOut,
    canvasRefs,
  }
}
