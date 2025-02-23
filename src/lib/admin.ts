import { authClient } from "./auth"

export async function giveRole() {
  // await authClient.admin.createUser({
  //   name: "Модератор",
  //   email: "director@academy-wincode.com",
  //   password: "cm7g98rgv00000ck408m94cph",
  //   role: "moderator"
  // })
  await authClient.admin.setRole({
    userId: "Ssk9SWWzBHND1LLddZdpPkC9kiliUK6y",
    role: "moderator"
  })
}
