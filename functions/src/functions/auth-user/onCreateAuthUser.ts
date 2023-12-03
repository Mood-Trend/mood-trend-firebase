import "reflect-metadata";
import * as functions from "firebase-functions";
import { constants } from "../../config/constants";
import { User } from "../../firestore-collection/user/entity/user";
import { container, providers } from "../../config/dicon";
import { UserRepository } from "../../firestore-collection/user/userRepository";
import { MoodWorksheetRepository } from "~/src/firestore-collection/moodWorksheet/moodWorksheetRepository";
import { ConfRepository } from "~/src/firestore-collection/conf/confRepository";
import { MoodWorksheet } from "~/src/firestore-collection/moodWorksheet/entity/moodWorksheet";
import { Conf } from "~/src/firestore-collection/conf/entity/conf";

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
    const inputMoodWorksheet = new MoodWorksheet({});
    const inputUserConf = new Conf({});

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
