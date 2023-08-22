import { firestore } from './database/connect-firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore'

export const consultFBCollectionAll = async (nameCollection: string) => {
  const collectionRef = collection(firestore, nameCollection)
  const collectionQuery = query(collectionRef)
  const querySnapshotUser = await getDocs(collectionQuery)

  return querySnapshotUser.docs.reduce((result, doc) => {
    result[doc.id] = doc.data()
    return result
  }, {} as { [id: string]: object })
}

export const consultFBCollectionQuery = async (
  nameCollection: string,
  key: string,
  vale: string
) => {
  const collectionRef = collection(firestore, nameCollection)
  const data = await getDocs(query(collectionRef, where(key, '==', vale)))
  return data
}

export const consultFBDocById = async (nameDoc: string, id: string) => {
  const docRefUser = await doc(firestore, 'users', id)
  return await getDoc(docRefUser)
}
