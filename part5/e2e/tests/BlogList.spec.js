// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");

    const response = await request.post("/api/users/", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });
    expect(response.ok()).toBeTruthy();
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const usernameInput = await page.getByLabel("Username");
    const passwordInput = await page.getByLabel("Password");
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test.describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel("Username").fill("mluukkai");
      await page.getByLabel("Password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("mluukkai logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("Username").fill("wrong");
      await page.getByLabel("Password").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("wrong credentials")).toBeVisible();
    });
  });

  test.describe("When logged in", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByLabel("Username").fill("mluukkai");
      await page.getByLabel("Password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("mluukkai logged in")).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Show blog form" }).click();
      await page.getByLabel("Title:").fill("Test from playwright");
      await page.getByLabel("Author:").fill("playwright");
      await page.getByLabel("Url:").fill("https://playwright.dev");
      await page.getByRole("button", { name: "create" }).click();
      await expect(
        page.getByText("Test from playwright", { exact: true }),
      ).toBeVisible();
    });
  });
});
