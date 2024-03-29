import * as CryptoJS from 'crypto-js'
import { encryptText } from '../../utils/functions'
import { firestore } from '../../utils/database/connect-firebase'
import { generateAccessTokenRegister } from '../../utils/jwt'
import { HTTP_STATUS_CODES } from '../../utils/constants/constants'
import { interfaceUsers } from '../../interfaces/users/interface-users'
import { sendMail } from '../../utils/send-mail'
import { v4 as uuidv4 } from 'uuid'
import { validationMongoErrors } from '../../utils/utils'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'

export const controllerUserList = async () => {
  try {
    const collectionRef = collection(firestore, 'users')
    const collectionQuery = query(collectionRef)
    const querySnapshotUser = await getDocs(collectionQuery)
    const data: { [id: string]: any } = {}

    querySnapshotUser.docs.forEach(doc => {
      const userData = doc.data()
      delete userData.password
      delete userData.tokenConfirm
      data[doc.id] = userData
    })

    return { code: HTTP_STATUS_CODES.OK.code, data }
  } catch (error) {
    return validationMongoErrors(error)
  }
}

export const controllerUserRegister = async (data: interfaceUsers) => {
  try {
    const { email, userName, password, personalInformation } = data
    const collectionRef = collection(firestore, 'users')
    const emailQuerySnapshot = await getDocs(
      query(collectionRef, where('email', '==', email))
    )

    if (!emailQuerySnapshot.empty) {
      throw new Error('El email ya está registrado.')
    }
    const userNameQuerySnapshot = await getDocs(
      query(collectionRef, where('userName', '==', userName))
    )
    if (!userNameQuerySnapshot.empty) {
      throw new Error('El userName ya está registrado.')
    }

    const jwt = await generateAccessTokenRegister({ email, userName })
    const idCustom = `${uuidv4()}-${CryptoJS.HmacSHA1(
      email,
      process.env.CRYPT_JS_SECRET || ''
    )}`

    const docRef = doc(collectionRef, idCustom)
    if (password) {
      data.password = await encryptText(password)
    }

    data = { ...data, confirmAccount: false, id: idCustom, tokenConfirm: jwt }

    await setDoc(docRef, data)

    delete data.password
    delete data.tokenConfirm
    delete data.confirmAccount

    // Envio de correo
    const { firstName, lastName, name: personalName } = personalInformation
    sendMail(email, `${personalName} ${lastName} ${firstName}`, idCustom)

    return { code: HTTP_STATUS_CODES.OK.code, data }
  } catch (error) {
    return validationMongoErrors(error)
  }
}

export const controllerUserDelete = async (id: string) => {
  try {
    const docRefUser = await doc(firestore, 'users', id)
    const docSnapshotUser = await getDoc(docRefUser)

    if (!docSnapshotUser.exists()) {
      throw new Error(`El usuario con ID ${id} no existe.`)
    }

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
    const docRefUser = doc(firestore, 'users', id)
    const docSnapshotUser = await getDoc(docRefUser)

    if (!docSnapshotUser.exists()) {
      throw new Error(`El usuario con ID ${id} no existe.`)
    }

    if (data.password) {
      data.password = await encryptText(data.password)
    }

    await updateDoc(docRefUser, { ...data })

    const newDocSanapShotUser = await getDoc(docRefUser)
    const newData = newDocSanapShotUser.data()

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
