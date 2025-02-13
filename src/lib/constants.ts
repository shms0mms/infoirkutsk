const STATUS = ["accepted", "in-progress", "rejected"] as const
const MAX_FILE_SIZE = {
  string: "1MB",
  number: 2 ** 20
} as const
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
]

export { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, STATUS }
