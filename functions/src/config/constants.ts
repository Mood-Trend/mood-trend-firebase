/**
 * 定数を保持するクラス。
 */
class Constants {
  /**
   * リージョンを取得します。
   *
   * @return {string} リージョン。
   */
  get region() {
    return "asia-northeast1";
  }

  /**
   * タイムゾーンを取得します。
   *
   * @return {string} タイムゾーン。
   */
  get timezone() {
    return "Asia/Tokyo";
  }

  /**
   * 秘匿情報のリストを取得します。
   * runWith() への引数として利用する。
   * 秘匿情報を追加したらここに追加すること。
   *
   * @return {Array} 秘匿情報のリスト。
   */
  get secrets() {
    return [];
  }
}

/**
 * 定数のインスタンス。
 * @type {Constants}
 */
export const constants = new Constants();
