// @ts-check
import { test, expect } from "@playwright/test";
import { loginWith, createBlog } from "./helper";

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
      await loginWith(page, "mluukkai", "salainen");
      await expect(page.getByText("mluukkai logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "wrong", "wrong");
      await expect(page.getByText("wrong credentials")).toBeVisible();
    });
  });

  test.describe("When logged in", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
      await expect(page.getByText("mluukkai logged in")).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      const title = "Test from playwright";
      await createBlog(page, title, "playwright", "https://playwright.dev");
      await expect(page.getByText(title, { exact: true })).toBeVisible();
    });

    test("a blog can be edited", async ({ page }) => {
      // crear blog
      await createBlog(
        page,
        "Test from playwright",
        "playwright",
        "https://playwright.dev",
      );
      // editar blog
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "edit" }).click();
      await page.locator("#edit-title").fill("Test from playwright edited");
      await page.locator("#edit-author").fill("playwright edited");
      await page.locator("#edit-url").fill("https://playwright.dev/edited");
      await page.getByRole("button", { name: "create" }).click();
      await expect(
        page.getByText("Test from playwright edited", { exact: true }),
      ).toBeVisible();
    });

    test("a blog can be deleted", async ({ page }) => {
      // crear blog
      await createBlog(
        page,
        "Test from playwright",
        "playwright",
        "https://playwright.dev",
      );
      // Eliminar blog
      page.on("dialog", async (dialog) => {
        await dialog.accept();
      });
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "remove" }).click();
      await expect(
        page.getByText("Test from playwright", { exact: true }),
      ).not.toBeVisible();
    });
  });
});
