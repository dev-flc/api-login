import {
  generateAccessTokenAuth,
  generateAccessTokenRegister,
  verifyAccessToken
} from '../../src/utils/jwt'

describe('TEST JWT', () => {
  test('verifyAccessToken', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwiaWQiOiJleGFtcGxlIiwicGVyc29uYWxJbmZvcm1hdGlvbiI6eyJmaXJzdE5hbWUiOiJleGFtcGxlIiwibGFzdE5hbWUiOiJleGFtcGxlIiwibmFtZSI6ImV4YW1wbGUifSwidXNlck5hbWUiOiJleGFtcGxlIiwiaWF0IjoxNjkyOTQ4ODgxfQ.VHRuDdfx4Qoid4VaXXEWWGeEf3RHFOEn6F5YyPnwngM'
    const data = await verifyAccessToken(token)
    expect(typeof data).toBe('object')
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

  test('generateAccessTokenRegister', async () => {
    const data = {
      email: 'example@gmail.com',
      userName: 'example'
    }
    const tokens = generateAccessTokenRegister(data)
    expect(tokens).toHaveProperty('refreshToken')
    expect(tokens).toHaveProperty('token')
  })
})
