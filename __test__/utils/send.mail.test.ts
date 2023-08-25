import { sendMail } from '../../src/utils/send-mail'

describe('TEST SEND EMAIL', () => {
  test('sendMail', async () => {
    expect(
      typeof (await sendMail(
        'example@gmail.com',
        'userExample',
        'token123'
      )) === 'string'
    ).toBe(true)
  })
})
