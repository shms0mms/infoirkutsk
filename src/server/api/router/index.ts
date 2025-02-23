import { commentRouter } from "./comment"
import { documentRouter } from "./document"
import { materialRouter } from "./material"
import { notificationsRouter } from "./notification"
import { organizationRouter } from "./organization"
import { requestsRouter } from "./requests"
import { userRouter } from "./user"

export const router = {
  material: materialRouter,
  document: documentRouter,
  notifications: notificationsRouter,
  comment: commentRouter,
  user: userRouter,
  organization: organizationRouter,
  requests: requestsRouter
}
