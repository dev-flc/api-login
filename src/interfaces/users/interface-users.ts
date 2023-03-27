export interface Usuario {
  confirmAccount: boolean
  email: string
  password: string
  personalInformation: PersonalInformation
  tokenConfirm: string
  userName: string
  _id: string
}

interface PersonalInformation {
  firstName: string
  lastName: string
  name: string
}
