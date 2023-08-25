import { interfaceUsers } from './../../../src/interfaces/users/interface-users'
import {
  controllerUserDelete,
  controllerUserList,
  controllerUserRegister,
  controllerUserUpdate
} from './../../../src/controllers/users/controller-users'

const user = {
  email: 'example@gmail.com',
  id: 'example',
  password: '123',
  personalInformation: {
    firstName: 'example',
    lastName: 'example',
    name: 'example'
  },
  userName: 'example'
}

const user2 = {
  email: 'example2@gmail.com',
  id: 'example2',
  password: '123',
  personalInformation: {
    firstName: 'example2',
    lastName: 'example2',
    name: 'example2'
  },
  userName: 'example'
}

describe('TEST CONTROLLER USER', () => {
  let idCustom: string

  test('controllerUserList', async () => {
    const { code } = await controllerUserList()
    expect(code).toBe(200)
  })

  test('controllerUserRegister', async () => {
    const { code, data } = (await controllerUserRegister(user)) as {
      code: number
      data: interfaceUsers
    }
    idCustom = data.id
    expect(code).toBe(200)
  })

  test('controllerUserRegister Email Exist', async () => {
    const { code } = await controllerUserRegister(user)
    expect(code).toBe(422)
  })

  test('controllerUserRegister UserName Exist', async () => {
    const { code } = await controllerUserRegister(user2)
    expect(code).toBe(422)
  })

  test('controllerUserUpdate', async () => {
    const { code } = await controllerUserUpdate(idCustom, user)
    expect(code).toBe(200)
  })

  test('controllerUserDelete', async () => {
    const { code } = await controllerUserDelete(idCustom)
    expect(code).toBe(200)
  })

  test('controllerUserDelete id not exist', async () => {
    const { code } = await controllerUserDelete('idCustom')
    expect(code).toBe(422)
  })

  test('controllerUserUpdate error', async () => {
    const { code } = await controllerUserUpdate(idCustom, user)
    expect(code).toBe(422)
  })
})
