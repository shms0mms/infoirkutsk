import { commentRouter } from "./comment"
import { documentRouter } from "./document"
import { materialRouter } from "./material"
import { notificationsRouter } from "./notification"

export const router = {
  material: materialRouter,
  document: documentRouter,
  notifications: notificationsRouter,
  comment: commentRouter
}
