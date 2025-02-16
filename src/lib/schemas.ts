import { z } from "zod"

const settingsSchema = z.object({
  sidebar: z.object({
    isOpen: z.boolean().default(false)
  })
})
type SettingsSchema = z.infer<typeof settingsSchema>

const FILE_TYPE = ["excel", "word", "pdf"] as const
const STATUS = ["accepted", "in-progress", "rejected"] as const
const ROLE = ["user", "moderator"] as const

const materialSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  fileType: z.enum(FILE_TYPE),
  fileUrl: z.string().url(),
  author: z.string(),
  status: z.enum(STATUS),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  userId: z.string(),
  publishedAt: z.date().nullable()
})

const createMaterialSchema = z.object({
  title: z.string(),
  description: z.string(),
  fileUrl: z.string().url(),
  author: z.string(),
  publishedAt: z.date(),
  status: z.enum(STATUS),
  fileType: z.enum(FILE_TYPE)
})
const notificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  link: z.string().url(),
  createdAt: z.date(),
  userId: z.string()
})
type MaterialSchema = z.infer<typeof materialSchema>
type CreateMaterialSchema = z.infer<typeof createMaterialSchema>
type NotificationSchema = z.infer<typeof notificationSchema>
const documentSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  id: z.string()
})
const createDocumentSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string().url(),
  publishedAt: z.date(),
  userId: z.string()
})

const filtersSchema = z.object({
  titleTerm: z.string().optional(),
  descriptionTerm: z.string().optional(),
  publishedAtFrom: z.string().optional(),
  publishedAtTo: z.string().optional()
})
type DocumentSchema = z.infer<typeof documentSchema>
type CreateDocumentSchema = z.infer<typeof createDocumentSchema>
type FiltersSchema = z.infer<typeof filtersSchema>
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
  createMaterialSchema,
  FILE_TYPE,
  order,
  ROLE,
  settingsSchema,
  sortBy,
  sortByWithLabel,
  STATUS,
  type CreateDocumentSchema,
  type CreateMaterialSchema,
  type DocumentSchema,
  type FiltersSchema,
  type MaterialSchema,
  type NotificationSchema,
  type SettingsSchema
}
