import jwt from 'jsonwebtoken'

export const verifyAccessToken = (token: string) => {
  console.log('process.env.JWT_SECRET==>', process.env.JWT_SECRET)
  jwt.verify(token, process.env.JWT_SECRET || '')
}

export const generateAccessToken = async (
  data: {
    email: string
    userName: string
  },
  timeExpireJwt = '1h'
) => {
  return jwt.sign({ data }, process.env.JWT_SECRET || '', {
    expiresIn: timeExpireJwt
  })
}
