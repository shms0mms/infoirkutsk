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
const materialSchema = z.object({
  title: z.string(),
  comments: z.string(),
  fileType: z.nativeEnum(FILE_TYPE),
  fileUrl: z.string().url(),
  author: z.string(),
  publishedAt: z.date()
})
const createMaterialSchema = z.object({
  title: z.string(),
  comments: z.string(),
  fileUrl: z.string().url(),
  author: z.string(),
  publishedAt: z.date()
})
type MaterialSchema = z.infer<typeof materialSchema>
type CreateMaterialSchema = z.infer<typeof createMaterialSchema>

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
  type CreateMaterialSchema,
  type MaterialSchema,
  type SettingsSchema
}
