import { Loader2 } from "lucide-react"
import type { UploadingOverlayProps } from "./types/UploadingOverlayTypes"

export function UploadingOverlay({ progress }: UploadingOverlayProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="w-full max-w-md px-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between gap-6">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-purple-600">Uploading PDF</p>
            </div>
            <div className="w-16 flex-shrink-0 text-right">
              <p className="text-2xl font-bold text-purple-600">{progress}%</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-sm">
              <div
                className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 h-full transition-all duration-500 ease-out rounded-full shadow-lg"
                style={{
                  width: `${progress}%`,
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
