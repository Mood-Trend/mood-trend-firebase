import "reflect-metadata";
import * as functions from "firebase-functions";
import { constants } from "../../config/constants";
import { User } from "../../firestore-collection/user/entity/user";
import { container, providers } from "../../config/dicon";
import { UserRepository } from "../../firestore-collection/user/userRepository";
import { MoodWorksheetRepository } from "../../firestore-collection/mood-worksheet/moodWorksheetRepository";
import { ConfRepository } from "../../firestore-collection/conf/confRepository";
import { Conf } from "../../firestore-collection/conf/entity/conf";
import { MoodWorksheet } from "../../firestore-collection/mood-worksheet/entity/moodWorksheet";

/**
 * 認証ユーザーが作成されたらユーザードキュメント、症状ワークシートドキュメント、ユーザー設定ドキュメントを追加する
 */
export const onCreateAuthUser = functions
  .region(constants.region)
  .auth.user()
  .onCreate(async (user) => {
    const inputUser = new User({
      uid: user.uid,
    });
    const inputMoodWorksheet = new MoodWorksheet();
    const inputUserConf = new Conf();

    const userRepository = container.get<UserRepository>(
      providers.userRepository
    );
    const moodWorksheetRepository = container.get<MoodWorksheetRepository>(
      providers.moodWorksheetRepository
    );
    const confRepository = container.get<ConfRepository>(
      providers.confRepository
    );
    await userRepository.add({ input: inputUser });
    functions.logger.info(`ユーザーを追加しました: uid = ${inputUser.uid}`);
    await moodWorksheetRepository.create({
      uid: inputUser.uid,
      input: inputMoodWorksheet,
    });
    functions.logger.info(
      `ユーザーの症状ワークシートを追加しました: uid = ${inputUser.uid}`
    );
    await confRepository.create({ uid: inputUser.uid, input: inputUserConf });
    functions.logger.info(`ユーザー設定を追加しました: uid = ${inputUser.uid}`);
  });
