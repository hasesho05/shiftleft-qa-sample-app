# Domain

## タスクのライフサイクル（状態遷移）

```
draft → open → in_progress → pending_approval → done
                                  ↓
                             in_progress（却下時）
```

### main ブランチの遷移ルール

| From | To | 条件 |
|------|----|------|
| `draft` | `open` | なし |
| `open` | `in_progress` | なし |
| `in_progress` | `done` | なし（main ブランチでは直接遷移可能） |

### PR #2 (approval workflow) で追加される遷移

| From | To | 条件 |
|------|----|------|
| `in_progress` | `pending_approval` | なし |
| `pending_approval` | `done` | lead / admin ロールのみ |
| `pending_approval` | `in_progress` | 却下理由が必須 |

## 禁止遷移（常に不正）

- `draft` → `pending_approval`（open, in_progress を飛ばせない）
- `draft` → `done`
- `done` → 任意のステータス（done は終端）
- `open` → `done`（in_progress を飛ばせない）

## 必須制約

- タスクの `title` は空文字不可、200 文字以内
- 却下時の `rejection_reason` は空文字不可
- `approver_id` は承認時に設定される（却下時は設定されない）

## 壊れると困る invariant

- **状態遷移の一方向性**: 不正な遷移を許すと、ワークフローの前提が崩れる
- **ロールベースの承認制約**: editor / viewer が承認できてしまうと、承認ステップの意味がなくなる
- **却下理由の必須性**: 理由なし却下はタスク担当者に差し戻し理由を伝えられない
