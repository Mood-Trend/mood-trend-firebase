import "reflect-metadata";
import { inject, injectable, LazyServiceIdentifer } from "inversify";
import { CollectionReference } from "firebase-admin/firestore";
import { MoodWorksheet } from "./entity/moodWorksheet";
import { providers } from "../../config/dicon";
import * as dayjs from "dayjs";

/**
 * 症状ワークシートリポジトリ
 */
@injectable()
export class MoodWorksheetRepository {
  constructor(
    /**
     * コレクション参照
     */
    @inject(new LazyServiceIdentifer(() => providers.moodWorksheetRef))
    private collectionRef: CollectionReference<MoodWorksheet>
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
    input.createdAt = dayjs().toDate();
    await this.collectionRef.doc(uid).collection("mood_worksheet").add(input);
  }
}
