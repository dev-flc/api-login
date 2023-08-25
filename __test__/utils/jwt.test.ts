import { generateAccessTokenAuth, verifyAccessToken } from '../../src/utils/jwt'

describe('TEST JWT', () => {
  test('generateAccessTokenAuth', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZlci5sYy5kZXZlbG9wZXJAZ21haWwuY29tIiwiaWQiOiIwZDUwNjhlNS0yMjM5LTRhMWMtYTA3NS04Zjg3ODA4ZWZjNzItM2Q3MWQwMTEzZDM2YzhkMmFkMjE4NTc5MjVmYjNiMmU2Y2Y3Y2Y5MCIsInBlcnNvbmFsSW5mb3JtYXRpb24iOnsiZmlyc3ROYW1lIjoiTHVjZW5hIiwibGFzdE5hbWUiOiJDYWxpeHRvIiwibmFtZSI6IkZlcm5hbmRvIn0sInVzZXJOYW1lIjoiZmVybGMiLCJpYXQiOjE2OTI3NjU2NDJ9.1sMrLPe3fmaN3lixAMmq_EpgAdge2MnmGNtT8r5-yrk'

    expect(typeof (await verifyAccessToken(token)) === 'object').toBe(true)
  })

  test('generateAccessTokenAuth', async () => {
    const data = {
      email: 'example@gmail.com',
      id: 'example',
      personalInformation: {
        firstName: 'example',
        lastName: 'example',
        name: 'example'
      },
      userName: 'example'
    }
    const tokens = generateAccessTokenAuth(data)
    expect(tokens).toHaveProperty('refreshToken')
    expect(tokens).toHaveProperty('token')
  })
})
