import {
  generateUploadButton,
  generateUploadDropzone
} from "@uploadthing/react"
import type { FileRouter } from "@/server/file-upload"

export const UploadButton = generateUploadButton<FileRouter>()
export const UploadDropzone = generateUploadDropzone<FileRouter>()
