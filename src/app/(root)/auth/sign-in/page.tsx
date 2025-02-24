import { Suspense } from "react"
import { SignIn } from "./sign-in"

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
    </Suspense>
  )
}
