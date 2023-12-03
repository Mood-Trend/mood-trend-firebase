import { MoodWorksheet } from "./entity/moodWorksheet";
import { FieldValue, FirestoreDataConverter } from "firebase-admin/firestore";

export const moodWorksheetConverter: FirestoreDataConverter<MoodWorksheet> = {
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot
  ): MoodWorksheet {
    const data = snapshot.data();
    return {
      workSheetId: snapshot.id,
      minus5: data.minus5,
      minus4: data.minus4,
      minus3: data.minus3,
      minus2: data.minus2,
      minus1: data.minus1,
      plus1: data.plus1,
      plus2: data.plus2,
      plus3: data.plus3,
      plus4: data.plus4,
      plus5: data.plus5,
      createdAt: data.created_at?.toDate(),
      updatedAt: data.updated_at?.toDate(),
    };
  },
  toFirestore(value: MoodWorksheet): FirebaseFirestore.DocumentData {
    return {
      minus_5: value.minus5,
      minus_4: value.minus4,
      minus_3: value.minus3,
      minus_2: value.minus2,
      minus_1: value.minus1,
      plus_1: value.plus1,
      plus_2: value.plus2,
      plus_3: value.plus3,
      plus_4: value.plus4,
      plus_5: value.plus5,
      created_at: value.createdAt ? FieldValue.serverTimestamp() : undefined,
      updated_at: FieldValue.serverTimestamp(),
    };
  },
};
