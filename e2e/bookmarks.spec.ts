import { expect, test } from "@playwright/test";

const REAL_OWNER = "facebook";
const REAL_REPO = "hermes";

test.describe("Bookmarks", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test to ensure test isolation
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test("allows bookmarking a repository from repo page and removing it from the list", async ({
    page,
  }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);

    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      {
        timeout: 15000,
      },
    );

    await page.getByRole("button", { name: "Add bookmark" }).first().click();
    await expect(
      page.getByRole("heading", { name: "Bookmarks" }),
    ).toBeVisible();

    const bookmarkLink = page
      .getByRole("list")
      .getByRole("link", { name: `${REAL_OWNER}/${REAL_REPO}` });
    await expect(bookmarkLink).toBeVisible();

    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Bookmarks" })).toBeVisible({
      timeout: 10000,
    });

    // Click the remove bookmark button in the sidebar list
    await page
      .getByRole("button", { name: "Remove bookmark" })
      .first()
      .click({ timeout: 10000 });

    // Wait for the bookmark to be removed
    await expect(page.getByText("You have no bookmarks yet")).toBeVisible({
      timeout: 10000,
    });
  });

  test("allows toggling bookmark button directly on the repository page", async ({
    page,
  }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);

    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      {
        timeout: 15000,
      },
    );

    // Initial state: Add bookmark
    const bookmarkButton = page
      .getByRole("button", { name: "Add bookmark" })
      .first();
    await expect(bookmarkButton).toBeVisible();

    // Toggle on
    await bookmarkButton.click();
    await expect(
      page.getByRole("heading", { name: "Bookmarks" }),
    ).toBeVisible();

    // Bookmark button is now "Remove bookmark"
    const removeBookmarkButton = page
      .getByRole("button", { name: "Remove bookmark" })
      .first();
    await expect(removeBookmarkButton).toBeVisible();

    // Toggle off
    await removeBookmarkButton.click();
    await expect(page.getByText("You have no bookmarks yet")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Add bookmark" }).first(),
    ).toBeVisible();
  });

  test("persists bookmarks across page reload", async ({ page }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);
    await page.getByRole("button", { name: "Add bookmark" }).first().click();

    await expect(
      page.getByRole("heading", { name: "Bookmarks" }),
    ).toBeVisible();

    await page.reload();

    await expect(
      page.getByRole("heading", { name: "Bookmarks" }),
    ).toBeVisible();
    const bookmarkLink = page
      .getByRole("list")
      .getByRole("link", { name: `${REAL_OWNER}/${REAL_REPO}` });
    await expect(bookmarkLink).toBeVisible();
  });
});
