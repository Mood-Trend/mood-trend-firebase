import { Conf } from "./entity/conf";
import { FieldValue, FirestoreDataConverter } from "firebase-admin/firestore";

export const confConverter: FirestoreDataConverter<Conf> = {
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): Conf {
    const data = snapshot.data();
    return {
      confId: snapshot.id,
      maxPlannedVolume: data.maxPlannedVolume,
      isOnboardingCompleted: data.isOnboardingCompleted,
      createdAt: data.created_at?.toDate(),
      updatedAt: data.updated_at?.toDate(),
    };
  },
  toFirestore(conf: Conf): FirebaseFirestore.DocumentData {
    return {
      max_planned_volume: conf.maxPlannedVolume,
      is_onboarding_completed: conf.isOnboardingCompleted,
      created_at: conf.createdAt ? FieldValue.serverTimestamp() : undefined,
      updated_at: FieldValue.serverTimestamp(),
    };
  },
};
