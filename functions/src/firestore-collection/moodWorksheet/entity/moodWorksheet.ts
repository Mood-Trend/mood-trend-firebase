/**
 * 症状ワークシート
 */
export class MoodWorksheet {
  /**
   * 症状ワークシートID
   */
  workSheetId = "";

  /**
   * -5
   */
  minus5 = "";

  /**
   * -4
   */
  minus4 = "";

  /**
   * -3
   */
  minus3 = "";

  /**
   * -2
   */
  minus2 = "";

  /**
   * -1
   */
  minus1 = "";

  /**
   * +1
   */
  plus1 = "";

  /**
   * +2
   */
  plus2 = "";

  /**
   * +3
   */
  plus3 = "";

  /**
   * +4
   */
  plus4 = "";

  /**
   * +5
   */
  plus5 = "";

  /**
   * 作成日時
   */
  createdAt?: Date;

  /**
   * 更新日時
   */
  updatedAt?: Date;

  constructor(partial?: Partial<MoodWorksheet>) {
    Object.assign(this, partial);
  }
}
