import { User } from './entity/user'
import { FieldValue, FirestoreDataConverter } from 'firebase-admin/firestore'

export const userConverter: FirestoreDataConverter<User> = {
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): User {
    const data = snapshot.data()
    return {
      uid: snapshot.id,
      displayName: data.displayName,
      imageUrl: data.imageUrl,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    }
  },
  toFirestore(user: User): FirebaseFirestore.DocumentData {
    return {
      displayName: user.displayName,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt ? FieldValue.serverTimestamp() : undefined,
      updatedAt: FieldValue.serverTimestamp(),
    }
  },
}
