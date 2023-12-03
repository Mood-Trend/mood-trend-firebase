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
  toFirestore(workSheet: MoodWorksheet): FirebaseFirestore.DocumentData {
    return {
      minus5: workSheet.minus5,
      minus4: workSheet.minus4,
      minus3: workSheet.minus3,
      minus2: workSheet.minus2,
      minus1: workSheet.minus1,
      plus1: workSheet.plus1,
      plus2: workSheet.plus2,
      plus3: workSheet.plus3,
      plus4: workSheet.plus4,
      plus5: workSheet.plus5,
      created_at: workSheet.createdAt
        ? FieldValue.serverTimestamp()
        : undefined,
      updated_at: FieldValue.serverTimestamp(),
    };
  },
};
