export interface PDFViewerProps {
  file: File
}

export interface PDFState {
  pages: string[]
  loading: boolean
  error?: string
  zoom: number
}
