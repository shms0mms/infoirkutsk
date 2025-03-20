// path to a file with schema you want to reset
import { seed } from "drizzle-seed"
import organizations from "@/assets/organizations.json"
import { FILE_TYPE, STATUS } from "./schemas"
import { db } from "@/server/db"
import * as schema from "@/server/db/schema"

async function materials() {
  await seed(db, { material: schema.material }).refine(f => ({
    material: {
      columns: {
        id: f.uuid(),
        title: f.string(),
        description: f.string(),
        status: f.valuesFromArray({
          values: STATUS as unknown as string[]
        }),
        createdAt: f.date(),
        updatedAt: f.date(),
        userId: f.uuid(),

        publishedAt: f.date(),
        author: f.string(),
        fileType: f.valuesFromArray({
          values: FILE_TYPE as unknown as string[]
        }),
        fileUrl: f.default({
          defaultValue: "http://localhost:3000/path/to/file.pdf"
        })
      },
      count: 50
    }
  }))
}
// materials()

async function documents() {
  await seed(db, { document: schema.document }).refine(f => ({
    document: {
      columns: {
        id: f.uuid(),
        title: f.string(),
        description: f.string(),
        link: f.default({
          defaultValue: "http://localhost:3000"
        }),
        publishedAt: f.date(),
        createdAt: f.date(),
        updatedAt: f.date(),
        userId: f.uuid()
      },
      count: 50
    }
  }))
}
// documents()

async function organization() {
  for (const organization of organizations) {
    await db.insert(schema.organization).values({
      name: organization.name,
      director: organization.director,
      address: organization.address,
      email: organization.email,
      phoneNumber: organization.phoneNumber,
      id: schema.createCuid()
    })
  }
}

organization()

async function createModerator() {
  await signUp.email({
    name: "Модератор",
    email: "wincode@gmail.com",
    password: "cm7g2oc0q00020ckyfkubh0jg",
    role: "moderator",
    emailVerified: true
  })
}
// createModerator()
