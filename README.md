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
