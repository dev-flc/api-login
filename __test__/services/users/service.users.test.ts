import app from './../../../src/app'
import request from 'supertest'

describe('TEST SERVICES USERS', () => {
  test('method get -> /api/user/list', async () => {
    const { status, body } = await request(app).get('/api/user/list')
    expect(status).toBe(200)
    expect(typeof body).toBe('object')
    expect(Object.keys(body).length).toBeGreaterThan(0)
  })

  test('method post -> /api/user/register', async () => {
    const { status, body } = await request(app).post('/api/user/register')
    expect(status).toBe(409)
    expect(typeof body).toBe('object')
  })

  test('method post -> /api/user/delete', async () => {
    const { status, body } = await request(app).delete(`/api/user/delete/1`)
    expect(status).toBe(422)
    expect(typeof body).toBe('object')
  })

  test('method get -> /api/user/update', async () => {
    const { status, body } = await request(app).put(`/api/user/update/1`)
    expect(status).toBe(422)
    expect(typeof body).toBe('object')
  })

  test('method get -> /api/user/example 404', async () => {
    const { status } = await request(app).get('/api/user/example')
    expect(status).toBe(200)
  })
})
