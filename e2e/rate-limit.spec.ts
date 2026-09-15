import { expect, test } from "@playwright/test";

test.describe("Rate limit and PAT settings", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("displays rate limit status button in navbar", async ({ page }) => {
    await page.goto("/");

    const rateLimitBtn = page.getByRole("button", {
      name: /API: \d+\/\d+/i,
    });
    await expect(rateLimitBtn).toBeVisible({ timeout: 10000 });
  });

  test("opens rate limit settings dialog and saves GitHub PAT", async ({
    page,
  }) => {
    await page.goto("/");

    const rateLimitBtn = page.getByRole("button", {
      name: /API: \d+\/\d+/i,
    });
    await rateLimitBtn.click();

    // Dialog should open
    await expect(
      page.getByRole("dialog", { name: "GitHub API Rate Limit Settings" }),
    ).toBeVisible();
    await expect(
      page.getByText("GitHub limits unauthenticated API calls"),
    ).toBeVisible();

    // Enter personal access token
    const tokenInput = page.getByPlaceholder("github_pat_...");
    await tokenInput.fill("ghp_mock_token_123456");

    // Click Save
    await page.getByRole("button", { name: "Save" }).click();

    // Dialog should close
    await expect(
      page.getByRole("dialog", { name: "GitHub API Rate Limit Settings" }),
    ).not.toBeVisible();

    // Verify localStorage has the token saved
    const settings = await page.evaluate(() => {
      const data = localStorage.getItem("gh-stats-settings");
      return data ? JSON.parse(data) : null;
    });
    expect(settings?.githubToken).toBe("ghp_mock_token_123456");
  });

  test("can cancel rate limit settings dialog without saving changes", async ({
    page,
  }) => {
    await page.goto("/");

    const rateLimitBtn = page.getByRole("button", {
      name: /API: \d+\/\d+/i,
    });
    await rateLimitBtn.click();

    await expect(
      page.getByRole("dialog", { name: "GitHub API Rate Limit Settings" }),
    ).toBeVisible();

    // Fill some token but click Cancel
    const tokenInput = page.getByPlaceholder("github_pat_...");
    await tokenInput.fill("ghp_unsaved_token");

    await page.getByRole("button", { name: "Cancel" }).click();

    await expect(
      page.getByRole("dialog", { name: "GitHub API Rate Limit Settings" }),
    ).not.toBeVisible();

    const settings = await page.evaluate(() => {
      const data = localStorage.getItem("gh-stats-settings");
      return data ? JSON.parse(data) : null;
    });
    expect(settings?.githubToken).toBeFalsy();
  });
});
