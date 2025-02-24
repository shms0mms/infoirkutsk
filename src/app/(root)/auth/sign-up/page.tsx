import { Suspense } from "react"
import { SignUp } from "./sign-up"

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUp />
    </Suspense>
  )
}
