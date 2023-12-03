/**
 * ユーザー設定
 */
export class Conf {
  /**
   * ユーザー設定ID
   */
  confId = "";

  /**
   * 最大予定数
   */
  maxPlannedVolume = 15;

  /**
   * オンボーディング完了フラグ
   */
  isOnboardingCompleted = false;

  /**
   * 作成日時
   */
  createdAt?: Date;

  /**
   * 更新日時
   */
  updatedAt?: Date;

  constructor(partial?: Partial<Conf>) {
    Object.assign(this, partial);
  }
}
