import app from './../../../src/app'
import request from 'supertest'

describe('TEST SERVICES USERS', () => {
  test('method get -> /api/user/list', async () => {
    const { status, body } = await request(app).get('/api/user/list')
    expect(status).toBe(200)
    expect(typeof body).toBe('object')
    expect(Object.keys(body).length).toBeGreaterThan(0)
  })

  test('method get -> /api/user/list', async () => {
    const id = 1
    const { status, body } = await request(app).get(`/api/user/delete/${id}`)
    expect(status).toBe(200)
    expect(typeof body).toBe('object')
  })

  it('method get -> /api/user/list', async () => {
    const id = 1
    const { status, body } = await request(app).get(`/api/user/delete/${id}`)
    expect(status).toBe(200)
    expect(typeof body).toBe('object')
  })
})
