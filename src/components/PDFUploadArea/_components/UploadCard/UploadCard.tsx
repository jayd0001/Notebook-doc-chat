import { Upload } from "lucide-react"
import type { UploadCardProps } from "./types/UploadCardTypes"

export function UploadCard({ onFileSelect }: UploadCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-12 max-w-sm w-full mx-4">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="flex justify-center">
          <Upload className="w-8 h-8 text-purple-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Upload PDF to start chatting</h2>
        <p className="text-sm text-gray-600">Click or drag and drop your file here</p>
        <label className="inline-block">
          <input
            type="file"
            accept=".pdf"
            onChange={onFileSelect} // now types match
            className="hidden"
          />
          <span className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium cursor-pointer hover:bg-purple-700 transition-colors inline-block text-sm">
            Choose PDF
          </span>
        </label>
      </div>
    </div>
  )
}
