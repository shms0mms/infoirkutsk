import { init } from "@paralleldrive/cuid2"
import { relations, sql } from "drizzle-orm"
import {
  boolean,
  pgTableCreator,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core"
import { MATERIAL_STATUS } from "@/lib/constants"

export const createCuid = init({
  fingerprint: "infoirkutsk",
  length: 20
})

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
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

  // Payments
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

// Auth

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
  status: varchar("status", { length: 255, enum: MATERIAL_STATUS }).notNull(),
  databaseId: varchar("database_id", { length: 255 })
    .notNull()
    .references(() => databases.id),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true
  }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true
  }).$onUpdateFn(() => new Date())
})

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts)
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] })
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] })
}))

export const materialsRelations = relations(materials, ({ one }) => ({
  database: one(databases, {
    fields: [materials.databaseId],
    references: [databases.id]
  })
}))

export type User = typeof users.$inferSelect
