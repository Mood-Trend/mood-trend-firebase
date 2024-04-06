# mood-trend-firebase

`気分グラフ Mood Trend` のバックエンド（Firebase）リポジトリです。

## Management Target

- Firebase Functions
  - 匿名ユーザー生成時: `onCreateAuthUser`
  - 匿名ユーザー削除時: `onDeleteAuthUser`
- Firebase Hosting
  - [LP](https://mood-trend-prod.web.app)
  - [利用規約](https://mood-trend-prod.web.app/term-of-service.html)
  - [プライバシーポリシー](https://mood-trend-prod.web.app/privacy-policy.html)  

※ 上記以外の Firebase リソース（Firestore, 各種 Rules, IAM など）は [mood-trend-terraform](https://github.com/Mood-Trend/mood-trend-terraform) にて管理されています。

## Environments

Configuration Name|Platform|Connect to Firebase
--|--|--
app-dev|iOS / Android|[mood-trend-dev](https://console.firebase.google.com/u/0/project/mood-trend-dev/overview)
app-prod|iOS / Android|[mood-trend-prod](https://console.firebase.google.com/u/0/project/mood-trend-prod/overview)

## Other Repositories

- [mood-trend-flutter](https://github.com/Mood-Trend/mood-trend-flutter)
- [mood-trend-terraform](https://github.com/Mood-Trend/mood-trend-terraform)
- [mood-trend-snyk-scan](https://github.com/Mood-Trend/mood-trend-snyk-scan)
