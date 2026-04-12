# Known Pitfalls

## 過去の障害・レビュー指摘

### 1. reject エンドポイントにロールチェックがない

- **発生箇所**: `backend/handler/task_handler.go` (RejectTask), `backend/usecase/task_service.go` (RejectTask)
- **内容**: approve は `service.ApproveTask` でロールチェックがあるが、reject にはない。viewer / editor でも却下できてしまう可能性がある
- **発見経緯**: gemini-code-assist のコードレビュー (PR #2)
- **テスト設計への示唆**: 新しいエンドポイントを追加するとき、approve 側だけでなく reject / cancel / revoke 側の権限チェックも確認する

### 2. Frontend API 呼び出しに認証ヘッダーが欠落

- **発生箇所**: `frontend/src/api/tasks.ts` (approveTask, rejectTask)
- **内容**: `X-User-Role` / `X-User-ID` ヘッダーを送っていない。Backend の middleware が `X-User-Role` を参照して権限チェックするため、ヘッダーがないと常に forbidden になる
- **発見経緯**: gemini-code-assist のコードレビュー (PR #2)
- **テスト設計への示唆**: API 呼び出しを追加するとき、認証ヘッダーの送信を確認する

## 見落としやすい条件

- **状態遷移の逆方向テスト**: 正常パスだけでなく、`done → in_progress` や `draft → done` のような不正遷移が拒否されることを確認する
- **空文字列の境界**: 却下理由、タスクタイトルなど、空文字列がバリデーションで弾かれることを確認する
- **並行操作**: 同一タスクに対する承認と却下が同時に実行された場合、楽観ロックがないため後勝ちになる。データ不整合ではないが、意図しない結果になり得る

## 再発しやすい変更パターン

| パターン | リスク |
|---------|--------|
| 新しいステータスを追加する | `validTransitions` への追加忘れ。Frontend のステータス文字列との不一致 |
| 新しいエンドポイントを追加する | ロールチェックの漏れ。認証ヘッダーの送信漏れ |
| Frontend コンポーネントにボタンを追加する | ロールによる表示/非表示制御の漏れ |
| usecase に新しい操作を追加する | domain 層の invariant チェックを usecase 側で重複実装する |

## テスト設計時に必ず疑うべき観点

1. **その操作は全ロールで試したか？** — 特に viewer / editor の negative test
2. **状態遷移は正常パスだけでなく不正パスも試したか？** — `validTransitions` に定義されていない遷移
3. **Frontend と Backend のステータス文字列は一致しているか？** — ハードコード文字列の typo
4. **API 呼び出しに認証ヘッダーは含まれているか？** — `X-User-Role` / `X-User-ID`
