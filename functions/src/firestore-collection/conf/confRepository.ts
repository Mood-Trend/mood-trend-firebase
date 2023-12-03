import "reflect-metadata";
import { inject, injectable, LazyServiceIdentifer } from "inversify";
import { CollectionReference } from "firebase-admin/firestore";
import { Conf } from "./entity/conf";
import { providers } from "../../config/dicon";
import * as dayjs from "dayjs";

/**
 * ユーザー設定リポジトリ
 */
@injectable()
export class ConfRepository {
  constructor(
    /**
     * コレクション参照
     */
    @inject(new LazyServiceIdentifer(() => providers.confRef))
    private collectionRef: CollectionReference<Conf>
  ) {}

  /**
   * 症状ワークシートを生成する
   */
  async create({ uid, input }: { uid: string; input: Conf }): Promise<void> {
    input.createdAt = dayjs().toDate();
    await this.collectionRef.doc(uid).collection("conf").add(input);
  }
}
