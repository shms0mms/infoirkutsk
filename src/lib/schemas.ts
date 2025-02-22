import { z } from "zod"

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

const phoneRegex = /^\+7\d{3}\d{3}\d{2}\d{2}$/

const FILE_TYPE = [
  // Изображения
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/avif",
  "image/bmp",
  "image/tiff",
  "image/x-icon",

  // Видео
  "video/mp4",
  "video/mpeg",
  "video/ogg",
  "video/webm",
  "video/3gpp",
  "video/3gpp2",

  // Аудио
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/aac",
  "audio/webm",
  "audio/flac",

  // Документы
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "application/rtf",

  // Архивы
  "application/zip",
  "application/x-tar",
  "application/gzip",
  "application/x-7z-compressed",
  "application/x-rar-compressed"
] as const
const ROLE = ["user", "moderator"] as const
const MATERIALS_TAB_TYPE = [
  ["all", "published", "unpublished", "requests", "drafts"]
] as const

const STATUS = ["accepted", "in-progress", "rejected", "draft"] as const

const settingsSchema = z.object({
  sidebar: z.object({
    isOpen: z.boolean().default(false)
  })
})

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
  title: z.string({
    required_error: "Введите заголовок"
  }),
  description: z.string({
    required_error: "Введите описание"
  }),
  fileUrl: z.string({
    required_error: "Выберите файл"
  }),
  author: z.string({
    required_error: "Введите ваше ФИО"
  }),
  publishedAt: z.date().optional(),
  status: z.enum(STATUS).nullable(),
  fileType: z.enum(FILE_TYPE).nullable()
})
const notificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  link: z.string().url(),
  createdAt: z.date(),
  userId: z.string()
})
const commentSchema = z.object({
  content: z.string(),
  materialId: z.string(),
  fromUserId: z.string(),
  toUserId: z.string(),
  createdAt: z.date().nullable(),
  id: z.string()
})

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
const createCommentSchema = z.object({
  content: z.string({ required_error: "Это поле обязательно" }),
  materialId: z.string(),
  fromUserId: z.string(),
  toUserId: z.string()
})

const filtersSchema = z.object({
  titleTerm: z.string().optional(),
  descriptionTerm: z.string().optional(),
  publishedAtFrom: z.string().optional(),
  publishedAtTo: z.string().optional()
})
const signInSchema = z.object({
  email: z
    .string({
      required_error: "Это поле обязательное"
    })
    .min(1, "Введите email") // Обязательное поле
    .email("Введите корректный email адрес"),
  password: z
    .string({
      required_error: "Это поле обязательное"
    })
    .min(6, "Пароль должен содержать не менее 6 символов")
})
const createUserSchema = z.object({
  name: z
    .string({
      required_error: "Это поле обязательное"
    })
    .min(2, "ФИО должно содержать не менее 2 символов"),
  email: z
    .string({
      required_error: "Это поле обязательное"
    })
    .min(1, "Введите email") // Обязательное поле
    .email("Введите корректный email адрес"),
  password: z
    .string({
      required_error: "Это поле обязательное"
    })
    .min(6, "Пароль должен содержать не менее 6 символов")
})

type DocumentSchema = z.infer<typeof documentSchema>
type CreateDocumentSchema = z.infer<typeof createDocumentSchema>
type FiltersSchema = z.infer<typeof filtersSchema>
type CreateCommentSchema = z.infer<typeof createCommentSchema>
type MaterialSchema = z.infer<typeof materialSchema>
type CreateMaterialSchema = z.infer<typeof createMaterialSchema>
type NotificationSchema = z.infer<typeof notificationSchema>
type CommentSchema = z.infer<typeof commentSchema>
type SettingsSchema = z.infer<typeof settingsSchema>
type MaterialsTabType = (typeof MATERIALS_TAB_TYPE)[number]
type FileType = (typeof FILE_TYPE)[number]
type CreateUserSchema = z.infer<typeof createUserSchema>
type SignInSchema = z.infer<typeof signInSchema>
export {
  commentSchema,
  createCommentSchema,
  createMaterialSchema,
  createUserSchema,
  FILE_TYPE,
  MATERIALS_TAB_TYPE,
  materialSchema,
  order,
  phoneRegex,
  ROLE,
  settingsSchema,
  signInSchema,
  sortBy,
  sortByWithLabel,
  STATUS,
  type CommentSchema,
  type CreateCommentSchema,
  type CreateDocumentSchema,
  type CreateMaterialSchema,
  type CreateUserSchema,
  type DocumentSchema,
  type FileType,
  type FiltersSchema,
  type MaterialSchema,
  type MaterialsTabType,
  type NotificationSchema,
  type SettingsSchema,
  type SignInSchema
}
