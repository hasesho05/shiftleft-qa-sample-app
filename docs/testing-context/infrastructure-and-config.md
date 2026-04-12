# Infrastructure and Config

## 環境構成

| レイヤー | 技術 | 備考 |
|---------|------|------|
| Backend | Go (net/http) | 標準ライブラリのみ。フレームワークなし |
| Frontend | React + Vite + TypeScript | SPA。Vite dev server でローカル開発 |
| DB | SQLite（想定） | マイグレーションは `backend/migrations/` に SQL ファイルとして配置 |
| テスト (Backend) | Go test | `*_test.go` |
| テスト (Frontend) | Vitest | `*.test.tsx` |
| ビジュアルテスト | Storybook | `*.stories.tsx` |

## 環境差異

現時点で環境ごとの差異は明示されていない。以下は推定:

- ローカル開発: SQLite ファイル直接アクセス
- CI: 現時点で未整理（Go test / Vitest が通ることが前提）
- 本番相当環境: 現時点で未整理

## 認証・認可

- 認証基盤は存在しない。`X-User-Role` / `X-User-ID` HTTP ヘッダーで擬似的にロールを伝搬
- 本番環境での認証統合方針は現時点で未整理
- ヘッダーの偽装による権限昇格は、この構成では防げない（テスト用途として割り切り）

## Feature Flag

現時点で feature flag は使用していない。

## 外部依存

- 外部サービス連携なし（メール通知、Slack 通知、外部 API 呼び出しなし）
- DB マイグレーションは手動実行前提（自動マイグレーションの仕組みは現時点で未整理）

## 設定ファイル

- Backend: `go.mod` のみ。環境変数や設定ファイルによる動的設定は現時点でなし
- Frontend: `vite.config.ts`, `vitest.config.ts`。API ベース URL は `frontend/src/api/tasks.ts` にハードコード (`/api`)
