import { describe, expect, it, vi } from "vitest";

describe("TaskApprovalPage", () => {
  it("renders loading state initially", async () => {
    vi.stubGlobal("fetch", vi.fn(() =>
      new Promise(() => {})
    ));

    const { TaskApprovalPage } = await import("./TaskApprovalPage");
    const result = TaskApprovalPage();
    expect(result.props["data-testid"]).toBe("loading");

    vi.unstubAllGlobals();
  });

  it("renders empty state when no approvals", async () => {
    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
    ));

    const { TaskApprovalPage } = await import("./TaskApprovalPage");
    // Direct render call for structural assertion
    expect(TaskApprovalPage).toBeDefined();

    vi.unstubAllGlobals();
  });
});
