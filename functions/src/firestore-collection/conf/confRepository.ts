import "reflect-metadata";
import { inject, injectable, LazyServiceIdentifer } from "inversify";
import { CollectionReference } from "firebase-admin/firestore";
import { Conf } from "./entity/conf";
import { providers } from "../../config/dicon";
import * as dayjs from "dayjs";
import { User } from "../user/entity/user";
import { confConverter } from "./confConverter";

/**
 * ユーザー設定リポジトリ
 */
@injectable()
export class ConfRepository {
  constructor(
    /**
     * コレクション参照
     */
    @inject(new LazyServiceIdentifer(() => providers.userRef))
    private collectionRef: CollectionReference<User>
  ) {}

  /**
   * ユーザー設定を生成する
   */
  async create({ uid, input }: { uid: string; input: Conf }): Promise<void> {
    const confRef = this.collectionRef
      .doc(uid)
      .collection("conf")
      .withConverter(confConverter);
    input.createdAt = dayjs().toDate();
    await confRef.add(input);
  }

  /**
   * ユーザー設定を削除する
   */
  async delete({ uid }: { uid: string }): Promise<void> {
    const confRef = this.collectionRef
      .doc(uid)
      .collection("conf")
      .withConverter(confConverter);

    // サブコレクション内の最初のドキュメントを取得
    const snapshot = await confRef.limit(1).get();
    if (snapshot.empty) return;

    // ドキュメントが存在する場合、そのドキュメントを削除
    await confRef.doc(snapshot.docs[0].id).delete();
  }
}
