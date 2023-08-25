import * as CryptoJS from 'crypto-js'
import { connectDB } from '../../utils/database/connect-firebase'
import { encryptText } from '../../utils/functions'
import { generateAccessTokenRegister } from '../../utils/jwt'
import { HTTP_STATUS_CODES } from '../../utils/constants/constants'
import { interfaceUsers } from '../../interfaces/users/interface-users'
import { sendMail } from '../../utils/send-mail'
import { v4 } from 'uuid'
import { validationMongoErrors } from '../../utils/utils'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore'

import {
  consultFBCollectionAll,
  consultFBCollectionQuery,
  consultFBDocById
} from './../../utils/functions-firestore'

export const controllerUserList = async () => {
  try {
    const data = await consultFBCollectionAll('users')

    return { code: HTTP_STATUS_CODES.OK.code, data }
  } catch (error) {
    return validationMongoErrors(error)
  }
}

export const controllerUserRegister = async (data: interfaceUsers) => {
  try {
    const { email, userName, password, personalInformation } = data
    const emailQuerySnapshot = await consultFBCollectionQuery(
      'users',
      'email',
      email
    )
    if (!emailQuerySnapshot.empty) {
      throw new Error('El email ya está registrado.')
    }

    const userNameQuerySnapshot = await consultFBCollectionQuery(
      'users',
      'userName',
      userName
    )

    if (!userNameQuerySnapshot.empty) {
      throw new Error('El usuario ya está registrado.')
    }

    const { refreshToken } = await generateAccessTokenRegister({
      email,
      userName
    })
    const idCustom = `${v4()}-${CryptoJS.HmacSHA1(
      email,
      process.env.CRYPT_JS_SECRET || ''
    )}`
    const collectionRef = collection(connectDB, 'users')
    const docRef = doc(collectionRef, idCustom)

    if (password) {
      data.password = await encryptText(password)
    }

    data = {
      ...data,
      confirmAccount: false,
      id: idCustom,
      tokenConfirm: refreshToken
    }

    await setDoc(docRef, data)

    delete data.password
    delete data.tokenConfirm
    delete data.confirmAccount

    // Envío de correo
    const { firstName, lastName, name: personalName } = personalInformation
    sendMail(email, `${personalName} ${lastName} ${firstName}`, idCustom)

    return { code: HTTP_STATUS_CODES.OK.code, data }
  } catch (error) {
    return validationMongoErrors(error)
  }
}

export const controllerUserDelete = async (id: string) => {
  try {
    const docSnapshotUser = await consultFBDocById('users', id)

    if (!docSnapshotUser.exists()) {
      throw new Error(`El usuario con ID ${id} no existe.`)
    }

    const docRefUser = await doc(connectDB, 'users', id)
    await deleteDoc(docRefUser)

    return { code: HTTP_STATUS_CODES.OK.code }
  } catch (error) {
    return validationMongoErrors(error)
  }
}

export const controllerUserUpdate = async (
  id: string,
  data: interfaceUsers
) => {
  try {
    const docRefUser = doc(connectDB, 'users', id)
    const docSnapshotUser = await consultFBDocById('users', id)

    if (!docSnapshotUser.exists()) {
      throw new Error(`El usuario con ID ${id} no existe.`)
    }

    if (data.password) {
      data.password = await encryptText(data.password)
    }

    await updateDoc(docRefUser, { ...data })

    const newDocSnapShotUser = await getDoc(docRefUser)
    const newData = newDocSnapShotUser.data()

    if (newData) {
      delete newData.password
      delete newData.tokenConfirm
      delete newData.confirmAccount
    }

    return { code: HTTP_STATUS_CODES.OK.code, newData }
  } catch (error) {
    return validationMongoErrors(error)
  }
}
