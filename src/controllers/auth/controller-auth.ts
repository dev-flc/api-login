import { DataAuth } from '../../interfaces/auth/interface-ahut'
import { validationMongoErrors } from '../../utils/utils'
import { generateAccessTokenAuth, verifyAccessToken } from '../../utils/jwt'
import { comparePassword } from '../../utils/functions'
import { HTTP_STATUS_CODES } from '../../utils/constants/constants'

import { firestore } from '../../utils/database/connect-firebase'
import {
  collection,
  getDocs,
  where,
  query,
  updateDoc,
  doc,
  getDoc
} from 'firebase/firestore'

export const controllerAuthSignIn = async (body: DataAuth) => {
  try {
    const { email, password: candidatePassword } = body

    const collectionRef = collection(firestore, 'users')
    const emailQuerySnapshot = await getDocs(
      query(collectionRef, where('email', '==', email))
    )

    if (emailQuerySnapshot.empty) {
      throw new Error('El email no se encuentra registrado')
    }

    const firstDoc = emailQuerySnapshot.docs[0] // Obtén el primer documento
    const { password, personalInformation, userName, id, confirmAccount } =
      firstDoc.data()

    if (!confirmAccount) {
      throw new Error('La cuenta se encuentra verificada')
    }

    const isPasswordMatch = await comparePassword(candidatePassword, password)

    if (!isPasswordMatch) {
      throw new Error('Contraseña incorrecta')
    }

    const token = await generateAccessTokenAuth({
      email,
      userName,
      id,
      personalInformation
    })

    return { code: HTTP_STATUS_CODES.OK.code, data: { token } }
  } catch (error) {
    return validationMongoErrors(error)
  }
}

export const controllerConfirmAccount = async (id: string) => {
  try {
    const docRefUser = await doc(firestore, 'users', id)
    const docSnapshotUser = await getDoc(docRefUser)

    if (!docSnapshotUser.exists()) {
      throw {
        message: 'Datos de confirmación no validoss',
        name: 'Custom',
        nameError: 'DataUnprocessable',
        code: HTTP_STATUS_CODES.CONFLICT.code
      }
    }
    const data = docSnapshotUser.data()

    if (data.confirmAccount) {
      throw {
        message: 'Cuenta ya confirmada',
        name: 'Custom',
        nameError: 'AccountVerify',
        code: HTTP_STATUS_CODES.OK.code
      }
    }

    await verifyAccessToken(data.tokenConfirm)

    data.confirmAccount = true
    data.tokenConfirm = null

    await updateDoc(docRefUser, { ...data })

    const { code } = HTTP_STATUS_CODES.OK
    return { code }
  } catch (error) {
    return validationMongoErrors(error)
  }
}
