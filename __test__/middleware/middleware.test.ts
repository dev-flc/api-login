import { AUTH } from './../../src/middleware/middleware-auth'
describe('AUTH middleware', () => {
  let req: any
  let res: any
  let next: jest.Mock<any, any>

  beforeEach(() => {
    req = {
      body: {
        token: '123'
      }
    }
    res = {
      send: jest.fn(),
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis()
    }
    next = jest.fn()
  })

  it('APPLY_AUTH OFF', () => {
    process.env.APPLY_AUTH = 'OFF'
    AUTH(req, res, next)
    expect(next).toHaveBeenCalled()
  })

  it('APPLY_AUTH ON', () => {
    process.env.APPLY_AUTH = 'ON'
    AUTH(req, res, next)
    expect(res.status).toHaveBeenCalledWith(403)
  })
})
