# Architecture

## 高レベル構成

```
Frontend (React SPA)
  └── api/tasks.ts ──── HTTP ────┐
                                 ▼
                          Backend (Go net/http)
                          ├── handler/    ← HTTP request/response
                          ├── usecase/    ← ビジネスロジック
                          ├── domain/     ← ドメインモデル + 状態遷移
                          ├── middleware/ ← 認証・認可
                          └── migrations/ ← DB スキーマ
```

## 主要な責務境界

| レイヤー | 責務 | やってはいけないこと |
|---------|------|-------------------|
| `handler` | HTTP の受け取りと返却 | ビジネスロジックを直接書く |
| `usecase` | ビジネスロジックの調整 | HTTP に依存する、DB に直接触る |
| `domain` | ドメインルールと状態遷移 | 外部依存を持つ |
| `middleware` | 横断的関心事（認証・認可） | ビジネスロジックに踏み込む |

## データフロー

### タスク作成

```
POST /tasks → handler.CreateTask → service.Create → task.Validate() → repo.Save
```

### ステータス遷移

```
POST /tasks/:id/transition → handler.TransitionTask → service.TransitionStatus → task.Transition() → repo.Save
```

### 承認（PR #2 で追加）

```
POST /tasks/:id/approve → handler.ApproveTask → service.ApproveTask → task.Approve() → repo.Save
POST /tasks/:id/reject  → handler.RejectTask  → service.RejectTask  → task.Reject()  → repo.Save
```

## 壊れやすい結合点

- **handler ↔ usecase の引数不整合**: handler が受け取った JSON フィールド名と usecase の引数が食い違うと、値が渡らない
- **domain の状態遷移テーブル (`validTransitions`)**: 遷移を追加し忘れると、正当な操作が拒否される
- **Frontend API 呼び出しの認証ヘッダー欠落**: `X-User-Role` / `X-User-ID` を送り忘れると、Backend で権限チェックが機能しない（現在の `approveTask` / `rejectTask` は未送信の可能性あり）
- **Frontend のステータス文字列**: Backend の `Status` 定数と Frontend のハードコード文字列（`"in_progress"`, `"pending_approval"` 等）が一致しないと、UI の条件分岐が壊れる
