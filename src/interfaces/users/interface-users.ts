export interface interfaceUsers {
  email: string
  personalInformation: PersonalInformation
  userName: string
  id: string
  tokenConfirm?: string | null
  confirmAccount?: boolean
  password?: string
}

interface PersonalInformation {
  firstName: string
  lastName: string
  name: string
}

export interface UsuarioJWT {
  email: string
  personalInformation: PersonalInformation
  userName: string
  id: string
}
