import { createContext } from "react"
import { StorageLogin } from "./Storage"

export type UserData = {
  user: StorageLogin | null | undefined
  setUser: (user: StorageLogin | null | undefined) => void
}

const UserContext = createContext<UserData>(undefined as unknown as UserData)

export default UserContext