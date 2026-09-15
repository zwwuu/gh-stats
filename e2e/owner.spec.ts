import { expect, test } from "@playwright/test";

const OWNER = "facebook";

test.describe("Owner page", () => {
  test("displays owner repositories list and metadata", async ({ page }) => {
    await page.goto(`/${OWNER}`);

    // Verify owner heading
    await expect(page.locator("h1")).toContainText(OWNER, { timeout: 15000 });

    // Verify repository cards are rendered
    const repoCards = page.locator("article");
    await expect(repoCards.first()).toBeVisible({ timeout: 15000 });
    const count = await repoCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("navigates from owner page to a repository page", async ({ page }) => {
    await page.goto(`/${OWNER}`);

    const repoCards = page.locator("article");
    await expect(repoCards.first()).toBeVisible({ timeout: 15000 });

    // Click on the repository link in the first card
    const firstRepoLink = repoCards.first().locator("a").first();
    await firstRepoLink.click();

    await expect(page).toHaveURL(new RegExp(`/${OWNER}/[^/]+$`));
    await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
  });
});
