# vue のサンプルコード

フォームに入力した内容をチェックし、
https://httpbin.org/
にデータを POST します。

## 実装内容

- tailwindcss の利用
- ローディング処理
- 画像の複数選択処理
- 選択画像の削除処理
- Validation エラー表示
- 確認画面、送信完了画面の表示
- 日付選択で過去の日付を選択不可
- Validation の実装
- - 必須の項目の入力チェック
- - 日付型のチェック
- - 文字数チェックは入れていません。
- - 改行の変換はしていません。

※開発環境、本番環境での送信先の切り替え実装はしていません。

## 開発環境

プロジェクトを pull 後、「vue_sample.code-workspace」を visualStudioCode で開いてください。

## Vue のインストール

```
npm install -g @vue/cli
```

## パッケージのインストール

```
yarn install
```

## デバッグ実行

```
cd form
yarn dev
```

ブラウザで「http://localhost:5173/」を開いてください。

## その他メモ

Tailwind.css は初見で理解に時間がかかりました。
実装は約 9 時間くらいかと思います。

仕様書のレイアウトを優先して作成しました。
