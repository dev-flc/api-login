import bcrypt from 'bcrypt'

export const encryptText = async (text: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(text, salt)
}

export const comparePassword = async (
  candidatePassword: string,
  password: string
) => {
  return await bcrypt.compare(candidatePassword, password)
}
