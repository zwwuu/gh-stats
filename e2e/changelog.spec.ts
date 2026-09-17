import { expect, test } from "@playwright/test";

const REAL_OWNER = "facebook";
const REAL_REPO = "hermes";

test.describe("Release Changelog Modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);
    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      {
        timeout: 20000,
      },
    );
  });

  test("can open release changelog modal and view release notes and details", async ({
    page,
  }) => {
    // Click the Changelog button on the first release (v0.13.0 for RN0.75.x)
    const firstChangelogBtn = page
      .getByRole("button", { name: "Changelog" })
      .first();
    await expect(firstChangelogBtn).toBeVisible({ timeout: 15000 });
    await firstChangelogBtn.click();

    // Verify modal dialog is open
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Verify dialog title contains release name
    await expect(dialog).toContainText("v0.13.0 for RN0.75.x");

    // Verify release tag badge
    await expect(dialog.getByText("v0.13.0").first()).toBeVisible();

    // Verify author information link
    const authorLink = dialog.getByRole("link", { name: "fbmal7" });
    await expect(authorLink).toBeVisible();
    await expect(authorLink).toHaveAttribute("href", "/fbmal7");

    // Verify GitHub detail link
    const detailLink = dialog.getByRole("link", { name: "Detail" });
    await expect(detailLink).toBeVisible();
    await expect(detailLink).toHaveAttribute("target", "_blank");

    // Verify markdown rendered changelog notes
    await expect(dialog.getByText("This release corresponds to")).toBeVisible();
  });

  test("can close release changelog modal using close button", async ({
    page,
  }) => {
    const firstChangelogBtn = page
      .getByRole("button", { name: "Changelog" })
      .first();
    await expect(firstChangelogBtn).toBeVisible({ timeout: 15000 });
    await firstChangelogBtn.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Click close button
    const closeBtn = dialog.getByRole("button", { name: "Close" });
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();

    // Dialog should be dismissed
    await expect(dialog).not.toBeVisible();
  });

  test("can close release changelog modal using Escape key", async ({
    page,
  }) => {
    const firstChangelogBtn = page
      .getByRole("button", { name: "Changelog" })
      .first();
    await expect(firstChangelogBtn).toBeVisible({ timeout: 15000 });
    await firstChangelogBtn.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Press Escape
    await page.keyboard.press("Escape");

    // Dialog should be dismissed
    await expect(dialog).not.toBeVisible();
  });

  test("displays empty state blankslate when release has no changelog body", async ({
    page,
  }) => {
    // Search for release v0.1.0 which has null body in mock data
    const tagSearchInput = page.getByPlaceholder("Search tags...");
    await expect(tagSearchInput).toBeVisible();
    await tagSearchInput.fill("v0.1.0");

    // Wait for filtered release to be visible
    await expect(page.getByText("v0.1.0").first()).toBeVisible();

    // Click Changelog button for v0.1.0
    const changelogBtn = page
      .getByRole("button", { name: "Changelog" })
      .first();
    await expect(changelogBtn).toBeVisible();
    await changelogBtn.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Verify empty state description is shown
    await expect(
      dialog.getByText("No changelog provided for this release."),
    ).toBeVisible();
  });
});
