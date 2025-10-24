import { useState } from "react"
import * as pdfjsLib from "pdfjs-dist"

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`
}

export const usePDFUpload = () => {
  const [state, setState] = useState({
    pdfFile: null as File | null,
    pdfText: "",
    uploadProgress: 0,
    isUploading: false,
    uploadComplete: false,
  })

  const extractPDFText = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let text = ""

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i)
      const textContent = await page.getTextContent()
      text += `\n--- Page ${i} ---\n`
      text += textContent.items.map((item: any) => item.str).join(" ")
    }

    return text
  }

  const handlePDFUpload = async (file: File) => {
    setState((prev) => ({
      ...prev,
      pdfFile: file,
      isUploading: true,
      uploadProgress: 0,
      uploadComplete: false,
    }))

    try {
      const progressSteps = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
      let stepIndex = 0

      const progressInterval = setInterval(() => {
        if (stepIndex < progressSteps.length) {
          setState((prev) => ({ ...prev, uploadProgress: progressSteps[stepIndex] }))
          stepIndex++
        }
      }, 3000)

      const text = await extractPDFText(file)
      setState((prev) => ({ ...prev, pdfText: text }))

      clearInterval(progressInterval)
      setState((prev) => ({ ...prev, uploadProgress: 100 }))

      setTimeout(() => {
        setState((prev) => ({ ...prev, isUploading: false, uploadComplete: true }))
      }, 500)
    } catch (error) {
      console.error("Error uploading PDF:", error)
      setState((prev) => ({ ...prev, isUploading: false, uploadProgress: 0 }))
    }
  }

  const resetPDF = () => {
    setState({
      pdfFile: null,
      pdfText: "",
      uploadProgress: 0,
      isUploading: false,
      uploadComplete: false,
    })
  }

  return {
    ...state,
    handlePDFUpload,
    resetPDF,
  }
}
