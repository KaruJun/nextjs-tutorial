# Next.js 完全入門チュートリアル

React経験者のための Next.js App Router 完全ガイド。Progateのようにステップバイステップで学べるインタラクティブなチュートリアルアプリです。

## デモ

**https://karujun.github.io/nextjs-tutorial/**

## このチュートリアルについて

Next.js初心者（そもそも何かわからないレベル）の方を対象に、App Router、Server Components、ハイドレーションなどの概念を段階的に学べるチュートリアルです。

### 対象者

- React、TypeScriptの経験がある方
- Laravel等のバックエンド経験がある方
- Next.jsを初めて学ぶ方
- App RouterやRSCを理解したい方

### 学習内容（全9ステップ）

| Step | タイトル | 内容 |
|------|---------|------|
| 0 | Next.jsとは何か？ | Reactとの違い、App Routerの歴史 |
| 1 | プロジェクト構造 | app/ディレクトリとファイルベースルーティング |
| 2 | Server Components | RSCの仕組みと使い方 |
| 3 | Client Components | "use client"とユースケース |
| 4 | ハイドレーション | エラーの原因と解決法（詳細解説） |
| 5 | SSR / SSG / ISR | レンダリング戦略とキャッシュ |
| 6 | ルーティング | 動的ルート、ルートグループ、並列ルート |
| 7 | データフェッチング | Server Actions、API Routes |
| 8 | 実践課題 | Todoアプリを作成 |

### 特徴

- 各ステップに理解度チェッククイズ付き
- Laravelとの比較説明を随所に配置
- ハイドレーションエラーのインタラクティブなデモ
- 進捗保存機能（localStorage）

## ローカルで実行

```bash
# リポジトリをクローン
git clone https://github.com/KaruJun/nextjs-tutorial.git
cd nextjs-tutorial

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

## 技術スタック

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) (状態管理)
- [Lucide React](https://lucide.dev/) (アイコン)

## ライセンス

MIT
