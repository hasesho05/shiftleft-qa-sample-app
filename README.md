# shiftleft-qa-sample-app

A minimal task management application used as a **live E2E test fixture** for [shiftleft-qa](https://github.com/hasesho05/shiftleft-qa).

## Stack

- **Backend**: Go (net/http)
- **Frontend**: React + Vite + TypeScript
- **UI Tests**: Storybook
- **Unit/Component Tests**: Vitest (frontend), Go test (backend)

## Purpose

This repository exists solely to provide a realistic, stable target for the shiftleft-qa plugin's live E2E tests. The canonical PR (`feature/task-approval-workflow`) is kept open and never merged.

Do **not** modify the canonical PR or its linked issue without updating the corresponding live E2E assertions in shiftleft-qa.

## Testing Context

`docs/testing-context/` に、手動探索テスト設計に必要なプロジェクト共通の前提知識を集約している。shiftleft-qa の `design-and-publish` skill が PR facts と合わせて参照する一次資料。

詳細は [docs/testing-context/README.md](docs/testing-context/README.md) を参照。
