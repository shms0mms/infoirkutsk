import { commentRouter } from "./comment"
import { documentRouter } from "./document"
import { materialRouter } from "./material"
import { notificationsRouter } from "./notification"
import { userRouter } from "./user"

export const router = {
  material: materialRouter,
  document: documentRouter,
  notifications: notificationsRouter,
  comment: commentRouter,
  user: userRouter
}
