import "reflect-metadata";
import * as functions from "firebase-functions";
import { constants } from "../../config/constants";
import { container, providers } from "../../config/dicon";
import { UserRepository } from "../../firestore-collection/user/userRepository";
import { MoodWorksheetRepository } from "../../firestore-collection/mood-worksheet/moodWorksheetRepository";
import { ConfRepository } from "../../firestore-collection/conf/confRepository";

/**
 * 認証ユーザーが削除されたらユーザードキュメント、症状ワークシートドキュメント、ユーザー設定ドキュメントを削除する
 */
export const onDeleteAuthUser = functions
  .region(constants.region)
  .auth.user()
  .onDelete(async (user) => {
    const uid = user.uid;
    const userRepository = container.get<UserRepository>(
      providers.userRepository
    );
    const moodWorksheetRepository = container.get<MoodWorksheetRepository>(
      providers.moodWorksheetRepository
    );
    const confRepository = container.get<ConfRepository>(
      providers.confRepository
    );
    await userRepository.delete({ uid: uid });
    functions.logger.info(`ユーザーを削除しました: uid = ${uid}`);
    await moodWorksheetRepository.delete({ uid: uid });
    functions.logger.info(
      `ユーザーの症状ワークシートを削除しました: uid = ${uid}`
    );
    await confRepository.delete({ uid: uid });
    functions.logger.info(`ユーザー設定を削除しました: uid = ${uid}`);
  });
