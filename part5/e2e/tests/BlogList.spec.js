// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const usernameInput = await page.getByLabel("Username");
    const passwordInput = await page.getByLabel("Password");
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });
});
