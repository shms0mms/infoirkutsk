import { z } from "zod"

const settingsSchema = z.object({
  sidebar: z.object({
    isOpen: z.boolean().default(false)
  })
})
type SettingsSchema = z.infer<typeof settingsSchema>

enum FILE_TYPE {
  "excel" = "excel",
  "word" = "word",
  "pdf" = "pdf"
}
enum STATUS {
  "accepted" = "accepted",
  "in-progress" = "in-progress",
  "rejected" = "rejected"
}
const materialSchema = z.object({
  title: z.string(),
  description: z.string(),
  fileType: z.nativeEnum(FILE_TYPE),
  fileUrl: z.string().url(),
  author: z.string(),
  publishedAt: z.date(),
  status: z.nativeEnum(STATUS)
})
const createMaterialSchema = z.object({
  title: z.string(),
  description: z.string(),
  fileUrl: z.string().url(),
  author: z.string(),
  publishedAt: z.date(),
  status: z.nativeEnum(STATUS),
  fileType: z.nativeEnum(FILE_TYPE)
})
type MaterialSchema = z.infer<typeof materialSchema>
type CreateMaterialSchema = z.infer<typeof createMaterialSchema>

const documentSchema = z.object({
  title: z.string(),
  description: z.string(),
  fileType: z.nativeEnum(FILE_TYPE),
  fileUrl: z.string().url(),
  author: z.string(),
  publishedAt: z.date()
})
const createDocumentSchema = z.object({
  title: z.string(),
  description: z.string(),
  fileUrl: z.string().url(),
  author: z.string(),
  publishedAt: z.date()
})
type DocumentSchema = z.infer<typeof documentSchema>
type CreateDocumentSchema = z.infer<typeof createDocumentSchema>

const sortBy = ["publishedAt", "createdAt"] as const
const sortByWithLabel = [
  {
    value: "publishedAt",
    label: "Published Date"
  },
  {
    value: "createdAt",
    label: "Created Date"
  }
] as const

const order = ["asc", "desc"] as const

export {
  FILE_TYPE,
  order,
  settingsSchema,
  sortBy,
  sortByWithLabel,
  STATUS,
  type CreateDocumentSchema,
  type CreateMaterialSchema,
  type DocumentSchema,
  type MaterialSchema,
  type SettingsSchema
}
