import { describe, expect, it } from "vitest";
import { DelegateButton } from "./DelegateButton";

describe("DelegateButton", () => {
  it("renders trigger button initially", () => {
    const result = DelegateButton({ taskId: "task-1" });
    expect(result.props["data-testid"]).toBe("delegate-trigger");
    expect(result.props.children).toBe("Delegate");
  });

  it("accepts taskId prop", () => {
    const result = DelegateButton({ taskId: "task-42" });
    expect(result).toBeTruthy();
  });
});
