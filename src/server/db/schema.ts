import { init } from "@paralleldrive/cuid2"
import { relations, sql } from "drizzle-orm"
import {
  boolean,
  pgTableCreator,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core"
import { STATUS } from "@/lib/constants"

// Инициализация CUID
export const createCuid = init({
  fingerprint: "infoirkutsk",
  length: 20
})

// Создание таблицы с уникальным именем
export const createTable = pgTableCreator(name => `infoirkutsk_${name}`)

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createCuid()),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: boolean("email_verified").default(false),
  image: varchar("image", { length: 255 }),
  customerId: varchar("customer_id", { length: 255 }).unique(),
  subscriptionId: varchar("subscription_id", { length: 255 }).unique(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true
  }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true
  }).$onUpdateFn(() => new Date())
})

// Таблица учетных записей
export const accounts = createTable("account", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createCuid()),
  accountId: varchar("account_id", { length: 255 }).notNull(),
  providerId: varchar("provider_id", { length: 255 }).notNull(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: varchar("scope", { length: 255 }),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdateFn(() => new Date())
    .notNull()
})

// Таблица сессий
export const sessions = createTable("session", {
  id: varchar("id", { length: 255 }).primaryKey(),
  token: text("token").notNull().unique(),
  ipAddress: varchar("ip_address", { length: 255 }),
  userAgent: varchar("user_agent", { length: 255 }),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdateFn(() => new Date())
    .notNull()
})

// Таблица верификации
export const verification = createTable("verification", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", {
    mode: "date",
    withTimezone: true
  }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date())
})

// Таблица баз данных
export const databases = createTable("database", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createCuid())
})
export const materials = createTable("material", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createCuid()),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 255, enum: STATUS }).notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true
  }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true
  }).$onUpdateFn(() => new Date()),
  userId: varchar("user_id", { length: 255 }).notNull()
})
export const documents = createTable("document", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createCuid()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  link: text("link").notNull(),
  publishedAt: timestamp("published_at").notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true
  }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true
  }).$onUpdateFn(() => new Date()),
  userId: varchar("user_id", { length: 255 }).notNull()
})
export const notifications = createTable("notification", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createCuid()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  databaseId: varchar("database_id", { length: 255 })
    .notNull()
    .references(() => databases.id),
  link: text("link").notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true
  }).default(sql`CURRENT_TIMESTAMP`)
})

// Определение отношений
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  documents: many(documents), // Привязка к документам
  materials: many(materials) // Привязка к материалам
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] })
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] })
}))

export const materialsRelations = relations(materials, ({ one }) => ({
  user: one(users, { fields: [materials.userId], references: [users.id] })
}))

export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(users, { fields: [documents.userId], references: [users.id] })
}))
