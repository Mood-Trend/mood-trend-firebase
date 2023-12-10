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
}
