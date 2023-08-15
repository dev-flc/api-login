import { comparePassword } from '../../utils/functions'
import { DataAuth } from '../../interfaces/auth/interface-ahut'
import { firestore } from '../../utils/database/connect-firebase'
import { HTTP_STATUS_CODES } from '../../utils/constants/constants'
import { validationMongoErrors } from '../../utils/utils'
import { generateAccessTokenAuth, verifyAccessToken } from '../../utils/jwt'

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
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
      throw new Error('La cuenta no se encuentra verificada')
    }

    const isPasswordMatch = await comparePassword(candidatePassword, password)

    if (!isPasswordMatch) {
      throw new Error('Contraseña incorrecta')
    }

    const token = await generateAccessTokenAuth({
      email,
      id,
      personalInformation,
      userName
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
      const errorMessage = {
        code: HTTP_STATUS_CODES.CONFLICT.code,
        message: 'Datos de confirmación no validoss',
        name: 'Custom',
        nameError: 'DataUnprocessable'
      }
      throw errorMessage
    }
    const data = docSnapshotUser.data()

    if (data.confirmAccount) {
      const errorMessage = {
        code: HTTP_STATUS_CODES.OK.code,
        message: 'Cuenta ya confirmada',
        name: 'Custom',
        nameError: 'AccountVerify'
      }

      throw errorMessage
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
