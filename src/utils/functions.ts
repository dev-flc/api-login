import bcrypt from 'bcrypt'

export const encryptText = async (text: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(text, salt)
}
