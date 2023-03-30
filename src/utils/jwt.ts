import jwt from 'jsonwebtoken'

export const verifyAccessToken = async (token: string) => {
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
