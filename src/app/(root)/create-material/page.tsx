import { Suspense } from "react"
import { CreateMaterialForm } from "@/app/@modal/(.)create-material/create-material-form"

export default function CreateMaterial() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
<<<<<<< HEAD
      {<CreateMaterialForm />}
=======
      <CreateMaterialForm />
>>>>>>> 9488f51772810ded4c45f39f8907e5de4d9baec6
    </Suspense>
  )
}
