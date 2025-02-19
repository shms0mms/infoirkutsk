import { init } from "@paralleldrive/cuid2"
import { relations, sql } from "drizzle-orm"
import {
  boolean,
  pgTableCreator,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core"
import { FILE_TYPE, ROLE, STATUS } from "@/lib/schemas"

export const createCuid = init({
  fingerprint: "infoirkutsk",
  length: 20
})

export const createTable = pgTableCreator(name => `infoirkutsk_${name}`)

export const user = createTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  role: varchar("role", { length: 255, enum: ROLE }).notNull(),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  phoneNumber: text("phone_number"),
  phoneNumberVerified: boolean("phone_number_verified").notNull().default(false)
})

export const session = createTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by")
})

export const account = createTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull()
})

export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at")
})

export const material = createTable("material", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createCuid()),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 255, enum: STATUS }).notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true
  }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true
  }).$onUpdateFn(() => new Date()),
  userId: varchar("user_id", { length: 255 }).notNull(),
  publishedAt: timestamp("published_at", {
    mode: "date",
    withTimezone: true
  }),
  fileUrl: varchar("file_url", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  fileType: varchar("file_type", { length: 255, enum: FILE_TYPE }).notNull()
})

export const comment = createTable("comment", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createCuid()),

  materialId: varchar("material_id", { length: 255 })
    .notNull()
    .references(() => material.id, { onDelete: "cascade" }),

  fromUserId: varchar("from_user_id", { length: 255 }).notNull(),
  toUserId: varchar("to_user_id", { length: 255 }).notNull(),
  content: text("content").notNull(),

  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true
  }).default(sql`CURRENT_TIMESTAMP`)
})

export const document = createTable("document", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createCuid()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  link: text("link").notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true
  })
    .$onUpdateFn(() => new Date())
    .notNull(),
  userId: varchar("user_id", { length: 255 }).notNull()
})
export const notifications = createTable("notification", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createCuid()),
  title: text("title").notNull(),
  description: text("description").notNull(),

  link: text("link").notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  userId: varchar("user_id", { length: 255 }).notNull()
})

export const userRelations = relations(user, ({ many }) => ({
  account: many(account),
  document: many(document),
  material: many(material)
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] })
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] })
}))

export const materialRelations = relations(material, ({ one }) => ({
  user: one(user, { fields: [material.userId], references: [user.id] })
}))

export const documentRelations = relations(document, ({ one }) => ({
  user: one(user, { fields: [document.userId], references: [user.id] })
}))

export const notificationRelations = relations(notifications, ({ one }) => ({
  user: one(user, { fields: [notifications.userId], references: [user.id] })
}))
