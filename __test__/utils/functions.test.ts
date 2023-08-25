import { comparePassword, encryptText } from '../../src/utils/functions'

describe('TEST FUNCTION', () => {
  test('comparePassword', async () => {
    const examplePass =
      '$2b$10$Hs20u.64zAI.b2J7sOYGZO67dmfgdZH7hmOeZkJEAlUn2vO68qq5W'

    expect(await comparePassword('forever', examplePass)).toBe(true)
  })

  test('encryptText', async () => {
    expect(typeof (await encryptText('forever')) === 'string').toBe(true)
  })
})
