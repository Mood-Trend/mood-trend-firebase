/**
 * ユーザー
 */
export class User {
  /**
   * ユーザーID
   */
  uid = "";

  /**
   * 表示名
   */
  displayName = "";

  /**
   * 画像URL
   */

  imageUrl = "";

  /**
   * 作成日時
   */
  createdAt?: Date;

  /**
   * 更新日時
   */
  updatedAt?: Date;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}

/**
 * 認証プロバイダー
 */
export type AuthProvider = "anonymous";
