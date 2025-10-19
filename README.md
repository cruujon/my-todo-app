# TODO App

Next.js 15 + Supabase を使用したモダンなTODOアプリケーションです。

## 🚀 技術スタック

- **Frontend**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 📁 プロジェクト構造

```
my-todo-app/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # メインページ
│   └── globals.css        # グローバルスタイル
├── components/            # Reactコンポーネント
│   ├── TodoForm.tsx       # TODO追加フォーム
│   ├── TodoList.tsx       # TODO一覧表示
│   └── TodoItem.tsx       # 個別TODOアイテム
├── lib/                   # ユーティリティ関数
│   ├── supabaseClient.ts  # Supabaseクライアント
│   ├── fetchTodos.ts      # TODO取得
│   ├── insertTodo.ts      # TODO追加
│   ├── updateTodo.ts      # TODO更新
│   └── deleteTodo.ts      # TODO削除
├── types/                 # TypeScript型定義
│   └── index.ts           # 共通型定義
└── public/                # 静的ファイル
```

## 🛠️ セットアップ

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **環境変数の設定**
   `.env.local` ファイルを作成し、Supabaseの認証情報を設定：
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

4. **ブラウザで確認**
   http://localhost:3000 にアクセス

## ✨ 機能

- ✅ TODOアイテムの追加
- ✅ TODOアイテムの一覧表示
- ✅ TODOアイテムの編集
- ✅ TODOアイテムの削除
- ✅ リアルタイム更新
- ✅ レスポンシブデザイン

## 🎯 主な特徴

- **TypeScript**: 型安全性の確保
- **モダンな構造**: Next.js 15 App Router
- **コンポーネント分離**: 再利用可能な設計
- **エラーハンドリング**: 適切なエラー処理
- **ユーザビリティ**: 直感的なUI/UX

## 📦 デプロイ

Vercelでのデプロイに対応：

```bash
vercel --prod
```

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

MIT License