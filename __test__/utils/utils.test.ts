import { validationMongoErrors } from '../../src/utils/utils'

describe('TEST UTILS FUNCTIONS', () => {
  test('validation Error', () => {
    expect(validationMongoErrors({ name: 'Error' }).code).toBe(422)
  })

  test('validation CastError', () => {
    expect(validationMongoErrors({ name: 'CastError' }).code).toBe(422)
  })

  test('validation TokenExpiredError', () => {
    expect(validationMongoErrors({ name: 'TokenExpiredError' }).code).toBe(401)
  })

  test('validation Custom', () => {
    expect(validationMongoErrors({ code: 400, name: 'Custom' }).code).toBe(400)
  })

  test('validation Default', () => {
    expect(validationMongoErrors({ code: 400, name: 'default' }).code).toBe(409)
  })
})
