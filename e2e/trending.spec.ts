import { expect, test } from "@playwright/test";

test.describe("Trending repositories", () => {
  test("renders trending section with repository cards on home page", async ({
    page,
  }) => {
    await page.goto("/");

    // Verify Trending header
    await expect(page.getByText("Trending")).toBeVisible();
    await expect(
      page.getByText("Here is what is popular on GitHub today..."),
    ).toBeVisible();

    // Verify at least one repository card is rendered
    const repoCards = page.locator("article");
    await expect(repoCards.first()).toBeVisible({ timeout: 15000 });
    const count = await repoCards.count();
    expect(count).toBeGreaterThan(0);

    // Verify repo card elements
    const firstCard = repoCards.first();
    await expect(
      firstCard.getByRole("link", { name: /Open in GitHub/i }),
    ).toBeVisible();
  });

  test("navigates to repository page when clicking a trending repo link", async ({
    page,
  }) => {
    await page.goto("/");

    const repoCards = page.locator("article");
    await expect(repoCards.first()).toBeVisible({ timeout: 15000 });

    // Click the main title link of the first repository card
    const firstRepoLink = repoCards.first().locator("a").first();
    const repoName = await firstRepoLink.textContent();
    expect(repoName).toBeTruthy();

    await firstRepoLink.click();

    // Verify navigation to the repo page
    await expect(page).toHaveURL(/\/[^/]+\/[^/]+$/);
    await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
  });
});
