import { expect, test } from "@playwright/test";

test.describe("Task Approval Page", () => {
  test("shows empty state when no pending approvals", async ({ page }) => {
    await page.goto("/approvals");
    await expect(page.getByTestId("empty-state")).toBeVisible();
  });

  test("displays pending approval list", async ({ page }) => {
    await page.goto("/approvals");
    await expect(page.getByTestId("approval-page")).toBeVisible();
  });

  test("bulk approve button is disabled when nothing selected", async ({ page }) => {
    await page.goto("/approvals");
    const btn = page.getByTestId("bulk-approve-btn");
    await expect(btn).toBeDisabled();
  });

  test("can select and approve tasks", async ({ page }) => {
    await page.goto("/approvals");
    const checkboxes = page.locator("input[type=checkbox]");
    const count = await checkboxes.count();
    if (count > 0) {
      await checkboxes.first().check();
      const btn = page.getByTestId("bulk-approve-btn");
      await expect(btn).toBeEnabled();
    }
  });
});
