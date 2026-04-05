import { describe, expect, it } from "vitest";
import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders known status label", () => {
    const badge = StatusBadge({ status: "open" });
    expect(badge.props.children).toContain("Open");
  });

  it("falls back to raw status for unknown values", () => {
    const badge = StatusBadge({ status: "custom" });
    expect(badge.props.children).toContain("custom");
  });

  it("applies default medium size", () => {
    const badge = StatusBadge({ status: "draft" });
    expect(badge.props["data-size"]).toBe("md");
  });

  it("applies small size when specified", () => {
    const badge = StatusBadge({ status: "draft", size: "sm" });
    expect(badge.props["data-size"]).toBe("sm");
  });

  it("shows icon when showIcon is true", () => {
    const badge = StatusBadge({ status: "done", showIcon: true });
    const children = badge.props.children;
    expect(children).toBeTruthy();
  });

  it("sets data-status attribute", () => {
    const badge = StatusBadge({ status: "rejected" });
    expect(badge.props["data-status"]).toBe("rejected");
  });

  it("uses fallback color for unknown status", () => {
    const badge = StatusBadge({ status: "unknown" });
    expect(badge.props.style.backgroundColor).toBe("#6b7280");
  });
});
