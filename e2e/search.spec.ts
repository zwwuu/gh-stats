import { expect, test } from "@playwright/test";

const REAL_OWNER = "facebook";
const REAL_REPO = "hermes";

test.describe("Search functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const repoCards = page.locator("article");
    await expect(repoCards.first()).toBeVisible({ timeout: 15000 });
  });

  test("shows validation feedback for malformed repository input", async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder("Enter a GitHub Repository URL");
    await expect(searchInput).toBeVisible();

    await searchInput.fill("not-a-repository");
    await expect(searchInput).toHaveValue("not-a-repository");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByText("Invalid GitHub repository URL")).toBeVisible();
    await expect(page).toHaveURL("/");
  });

  test("should navigate from home page to repo page using a GitHub repository URL", async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder("Enter a GitHub Repository URL");
    await expect(searchInput).toBeVisible();

    await searchInput.fill(`https://github.com/${REAL_OWNER}/${REAL_REPO}`);
    await expect(searchInput).toHaveValue(
      `https://github.com/${REAL_OWNER}/${REAL_REPO}`,
    );
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page).toHaveURL(new RegExp(`/${REAL_OWNER}/${REAL_REPO}$`), {
      timeout: 20000,
    });
    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      { timeout: 20000 },
    );
  });

  test("should navigate from home page to repo page using shorthand owner/repo", async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder("Enter a GitHub Repository URL");
    await expect(searchInput).toBeVisible();

    await searchInput.fill(`${REAL_OWNER}/${REAL_REPO}`);
    await expect(searchInput).toHaveValue(`${REAL_OWNER}/${REAL_REPO}`);
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page).toHaveURL(new RegExp(`/${REAL_OWNER}/${REAL_REPO}$`), {
      timeout: 20000,
    });
    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      { timeout: 20000 },
    );
  });

  test("should handle URL with trailing slash", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Enter a GitHub Repository URL");
    await expect(searchInput).toBeVisible();

    await searchInput.fill(`https://github.com/${REAL_OWNER}/${REAL_REPO}/`);
    await expect(searchInput).toHaveValue(
      `https://github.com/${REAL_OWNER}/${REAL_REPO}/`,
    );
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page).toHaveURL(new RegExp(`/${REAL_OWNER}/${REAL_REPO}$`), {
      timeout: 20000,
    });
    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      { timeout: 20000 },
    );
  });

  test("submits search when pressing Enter key", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Enter a GitHub Repository URL");
    await expect(searchInput).toBeVisible();

    await searchInput.fill(`https://github.com/${REAL_OWNER}/${REAL_REPO}`);
    await expect(searchInput).toHaveValue(
      `https://github.com/${REAL_OWNER}/${REAL_REPO}`,
    );
    await searchInput.press("Enter");

    await expect(page).toHaveURL(new RegExp(`/${REAL_OWNER}/${REAL_REPO}$`), {
      timeout: 20000,
    });
    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      { timeout: 20000 },
    );
  });

  test("can search from sidebar search bar on repository page", async ({
    page,
  }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      { timeout: 20000 },
    );

    const sidebarInput = page.getByPlaceholder("Enter a GitHub Repository URL");
    await expect(sidebarInput).toBeVisible();

    await sidebarInput.fill(`${REAL_OWNER}/${REAL_REPO}`);
    await expect(sidebarInput).toHaveValue(`${REAL_OWNER}/${REAL_REPO}`);
    await sidebarInput.press("Enter");

    await expect(page).toHaveURL(new RegExp(`/${REAL_OWNER}/${REAL_REPO}$`), {
      timeout: 20000,
    });
    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      { timeout: 20000 },
    );
  });
});
