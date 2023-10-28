import { User } from "./entity/user";
import { FieldValue, FirestoreDataConverter } from "firebase-admin/firestore";

export const userConverter: FirestoreDataConverter<User> = {
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): User {
    const data = snapshot.data();
    return {
      uid: snapshot.id,
      displayName: data.display_name,
      imageUrl: data.image_url,
      createdAt: data.created_at?.toDate(),
      updatedAt: data.updated_at?.toDate(),
    };
  },
  toFirestore(user: User): FirebaseFirestore.DocumentData {
    return {
      display_name: user.displayName,
      image_url: user.imageUrl,
      created_at: user.createdAt ? FieldValue.serverTimestamp() : undefined,
      updated_at: FieldValue.serverTimestamp(),
    };
  },
};
