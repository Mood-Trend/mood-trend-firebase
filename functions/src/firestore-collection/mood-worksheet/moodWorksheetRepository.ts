import "reflect-metadata";
import { inject, injectable, LazyServiceIdentifer } from "inversify";
import { CollectionReference } from "firebase-admin/firestore";
import { MoodWorksheet } from "./entity/moodWorksheet";
import { providers } from "../../config/dicon";
import * as dayjs from "dayjs";
import { User } from "../user/entity/user";
import { moodWorksheetConverter } from "./moodWorksheetConverter";

/**
 * 症状ワークシートリポジトリ
 */
@injectable()
export class MoodWorksheetRepository {
  constructor(
    /**
     * コレクション参照
     */
    @inject(new LazyServiceIdentifer(() => providers.userRef))
    private collectionRef: CollectionReference<User>
  ) {}

  /**
   * 症状ワークシートを生成する
   */
  async create({
    uid,
    input,
  }: {
    uid: string;
    input: MoodWorksheet;
  }): Promise<void> {
    const moodWorksheetRef = this.collectionRef
      .doc(uid)
      .collection("mood_worksheet")
      .withConverter(moodWorksheetConverter);
    input.createdAt = dayjs().toDate();
    await moodWorksheetRef.add(input);
  }

  /**
   * 症状ワークシートを削除する
   */
  async delete({ uid }: { uid: string }): Promise<void> {
    const moodWorksheetRef = this.collectionRef
      .doc(uid)
      .collection("mood_worksheet")
      .withConverter(moodWorksheetConverter);

    // サブコレクション内の最初のドキュメントを取得
    const snapshot = await moodWorksheetRef.limit(1).get();
    if (snapshot.empty) return;

    // ドキュメントが存在する場合、そのドキュメントを削除
    await moodWorksheetRef.doc(snapshot.docs[0].id).delete();
  }
}
