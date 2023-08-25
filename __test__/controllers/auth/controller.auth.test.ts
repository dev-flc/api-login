import { DataAuth } from './../../../src/interfaces/auth/interface-auth'
import { interfaceUsers } from './../../../src/interfaces/users/interface-users'
import {
  controllerAuthSignIn,
  controllerConfirmAccount
} from './../../../src/controllers/auth/controller-auth'
import {
  controllerUserDelete,
  controllerUserRegister
} from './../../../src/controllers/users/controller-users'

const userRegister = {
  email: 'example-auth@gmail.com',
  id: '123',
  password: '123',
  personalInformation: {
    firstName: 'example-auth',
    lastName: 'example-auth',
    name: 'example-auth'
  },
  userName: 'example-auth'
}

const user: DataAuth = {
  email: 'example-auth@gmail.com',
  password: '123'
}

describe('TEST CONTROLLER AUTH', () => {
  let id: string

  test('controllerAuthSignIn no confirm account', async () => {
    const { data } = (await controllerUserRegister(userRegister)) as {
      code: number
      data: interfaceUsers
    }
    id = data.id
    const { code } = await controllerAuthSignIn(user)
    expect(code).toBe(422)
  })

  test('controllerConfirmAccount', async () => {
    const { code: codeConfirm } = (await controllerConfirmAccount(id)) as {
      code: number
      data: interfaceUsers
    }
    expect(codeConfirm).toBe(200)
  })

  test('controllerConfirmAccount account confirm', async () => {
    const { code: codeConfirm } = (await controllerConfirmAccount(id)) as {
      code: number
      data: interfaceUsers
    }
    expect(codeConfirm).toBe(200)
  })

  test('controllerAuthSignIn', async () => {
    const { code } = await controllerAuthSignIn(user)
    expect(code).toBe(200)
  })

  test('controllerAuthSignIn password invalid', async () => {
    user.password = '321'
    const { code } = await controllerAuthSignIn(user)
    expect(code).toBe(422)
  })

  test('controllerAuthSignIn Error', async () => {
    await controllerUserDelete(id)
    const { code } = await controllerAuthSignIn(user)
    expect(code).toBe(422)
  })

  test('controllerConfirmAccount not exist id', async () => {
    const { code: codeConfirm } = (await controllerConfirmAccount(id)) as {
      code: number
      data: interfaceUsers
    }
    expect(codeConfirm).toBe(409)
  })
})
