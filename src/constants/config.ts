// API config

const env = import.meta.env

export const ApiConfig = {
  BASE_URL: env.VITE_API_BASE_URL,
  ENDPOINT: env.VITE_CHAT_COMPLETIONS_ENDPOINT,
} as const

// PDF config
export const PDFJSConfig = {
  BASE_URL: "https://unpkg.com/pdfjs-dist@",
  WORKER_PATH: "/build/pdf.worker.min.js",
} as const
