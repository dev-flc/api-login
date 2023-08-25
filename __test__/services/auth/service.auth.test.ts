import app from '../../../src/app'
import request from 'supertest'

describe('TEST SERVICES AUTH', () => {
  test('method get -> /api/auth/confirm-account', async () => {
    const { status } = await request(app).get('/api/auth/confirm-account/123')
    expect(status).toBe(409)
  })

  test('method post -> /api/auth/sign-in', async () => {
    const { status, body } = await request(app).post('/api/auth/sign-in')
    expect(status).toBe(409)
    expect(typeof body).toBe('object')
  })
})
