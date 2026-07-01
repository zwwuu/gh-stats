import { expect, test } from "@playwright/test";

const REAL_OWNER = "facebook";
const REAL_REPO = "hermes";

test.describe("Bookmarks", () => {
  test("allows bookmarking a repository and removing it from the list", async ({
    page,
  }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);

    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER} / ${REAL_REPO}`,
      {
        timeout: 15000,
      },
    );

    await page.getByRole("button", { name: /add bookmark/i }).click();
    await expect(
      page.getByRole("heading", { name: "Bookmarks" }),
    ).toBeVisible();
    await expect(page.getByText(`${REAL_OWNER}/${REAL_REPO}`)).toBeVisible();

    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Bookmarks" })).toBeVisible({
      timeout: 10000,
    });

    // Click the remove bookmark button
    await page
      .getByRole("button", { name: "Remove bookmark" })
      .first()
      .click({ timeout: 10000 });

    // Wait for the bookmark to be removed
    await expect(page.getByText("You have no bookmarks yet")).toBeVisible({
      timeout: 10000,
    });
  });
});
