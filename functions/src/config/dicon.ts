import "reflect-metadata";
import { Container } from "inversify/lib/container/container";
import { Firestore } from "firebase-admin/firestore";
import * as admin from "firebase-admin";
import { User } from "../firestore-collection/user/entity/user";
import { userConverter } from "../firestore-collection/user/userConverter";
import { UserRepository } from "../firestore-collection/user/userRepository";
import { MoodWorksheet } from "../firestore-collection/moodWorksheet/entity/moodWorksheet";
import { moodWorksheetConverter } from "../firestore-collection/moodWorksheet/moodWorksheetConverter";
import { MoodWorksheetRepository } from "../firestore-collection/moodWorksheet/moodWorksheetRepository";
import { confConverter } from "../firestore-collection/conf/confConverter";
import { ConfRepository } from "../firestore-collection/conf/confRepository";
import { Conf } from "../firestore-collection/conf/entity/conf";

/**
 * DI コンテナー
 */
export const container = new Container();

/** ************************************************************************
 * プロバイダー名の定義
 **************************************************************************/

export const providers = {
  /**
   * Firestore
   */
  firestoreDb: Symbol.for("firestoreDb"),

  /**
   * User
   */
  userRef: Symbol.for("userRef"),
  userRepository: Symbol.for("userRepository"),

  /**
   * MoodWorksheet
   */
  moodWorksheetRef: Symbol.for("moodWorksheetRef"),
  moodWorksheetRepository: Symbol.for("moodWorksheetRepository"),

  /**
   * Conf
   */
  confRef: Symbol.for("confRef"),
  confRepository: Symbol.for("confRepository"),
};

/** ************************************************************************
 * DI の登録
 **************************************************************************/

/**
 * Firestore
 */
container
  .bind<Firestore>(providers.firestoreDb)
  .toDynamicValue(() => {
    const db = admin.firestore();
    /** undefined なプロパティを無視するよう設定する */
    db.settings({ ignoreUndefinedProperties: true });
    return db;
  })
  .inSingletonScope();

/**
 * User
 */
container
  .bind<FirebaseFirestore.CollectionReference<User>>(providers.userRef)
  .toDynamicValue((context) => {
    const db = context.container.get<Firestore>(providers.firestoreDb);
    return db.collection("users").withConverter<User>(userConverter);
  })
  .inSingletonScope();
container.bind<UserRepository>(providers.userRepository).to(UserRepository);

/**
 * moodWorksheet
 */
container
  .bind<FirebaseFirestore.CollectionReference<MoodWorksheet>>(
    providers.moodWorksheetRef
  )
  .toDynamicValue((context) => {
    const db = context.container.get<Firestore>(providers.firestoreDb);
    return db
      .collection("users")
      .withConverter<MoodWorksheet>(moodWorksheetConverter);
  })
  .inSingletonScope();
container
  .bind<MoodWorksheetRepository>(providers.moodWorksheetRepository)
  .to(MoodWorksheetRepository);

/**
 * conf
 */
container
  .bind<FirebaseFirestore.CollectionReference<Conf>>(providers.confRef)
  .toDynamicValue((context) => {
    const db = context.container.get<Firestore>(providers.firestoreDb);
    return db.collection("users").withConverter<Conf>(confConverter);
  })
  .inSingletonScope();
container.bind<ConfRepository>(providers.confRepository).to(ConfRepository);
