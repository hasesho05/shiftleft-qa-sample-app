# Testing Context

## このディレクトリの目的

`docs/testing-context/` は、手動探索テスト設計に必要なプロジェクト共通の前提知識を集約する場所である。

PR ごとの差分（changed files, diff, test candidates）は CLI が都度取得するが、プロジェクト共通の文脈（誰が使うか、どんな業務ルールがあるか、何が壊れると痛いか）は PR diff からは読めない。このディレクトリは、その差分を埋める。

## design-and-publish がどう使うか

`design-and-publish` skill は、手動テスト項目を設計する際に以下の順で情報を集める:

1. **CLI から PR facts を取得する**（read-pr, read-changed-files, find-test-candidates）
2. **`docs/testing-context/` を読む**（PR 固有ではない前提知識）
3. **AskUserQuestion で PR 固有の補正を受ける**（リスク補正、補足懸念）

このディレクトリの文書は 2 の段階で参照される一次資料である。毎回 JIRA / Wiki / Slack を横断探索する必要をなくすことが目的。

## 各ファイルの役割

| ファイル | 対応する Lens | 内容 |
|---------|-------------|------|
| [user-persona.md](user-persona.md) | user-persona | 主要ユーザー種別、権限ロール、誤操作しやすいユーザー像 |
| [domain.md](domain.md) | domain | 業務ルール、禁止遷移、必須制約、壊れると困る invariant |
| [business-priority.md](business-priority.md) | business-priority | 何が壊れると痛いか、影響度の判断基準 |
| [infrastructure-and-config.md](infrastructure-and-config.md) | infrastructure-and-config | 環境差異、設定前提、外部依存 |
| [architecture.md](architecture.md) | architecture | 高レベル構成、責務境界、データフロー、壊れやすい結合点 |
| [known-pitfalls.md](known-pitfalls.md) | known-pitfalls | 過去の障害、見落としやすい条件、再発パターン |

## 記述方針

- schema 化しない。人間が保守する Markdown とする
- CLI の入力契約には組み込まない
- 外部資料のリンク集ではなく、テスト設計に必要な要点を repo 内で読める形にする
- 完全網羅より「手動探索テスト設計で再利用できる要点」を優先する
- 情報が足りない箇所は「現時点で未整理」と明記する

## 更新タイミング

- 新しいドメインルールが追加されたとき
- 障害が発生し、known-pitfalls に記録すべきとき
- ユーザー種別や権限体系が変わったとき
- インフラ構成や外部依存が変わったとき

PR 作成者や保守者が気づいたタイミングで追記する。完璧さより鮮度を優先する。
