import { expect, test } from "@playwright/test";

const REAL_OWNER = "facebook";
const REAL_REPO = "hermes";

test.describe("Repository page interactions", () => {
  test("can toggle theme preferences", async ({ page }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);

    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER} / ${REAL_REPO}`,
      {
        timeout: 15000,
      },
    );
    await expect(
      page.getByRole("button", { name: /toggle theme/i }),
    ).toBeVisible();
    await page.getByRole("button", { name: /toggle theme/i }).click();

    const savedSettings = await page.evaluate(() =>
      window.localStorage.getItem("gh-stats-settings"),
    );
    expect(savedSettings).toContain("colorMode");
  });

  test("can use release filters", async ({ page }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);

    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER} / ${REAL_REPO}`,
      {
        timeout: 15000,
      },
    );

    await page.getByRole("button", { name: /Filters/i }).click();
    const filterMenu = page.getByRole("menu");
    await expect(filterMenu).toBeVisible();
    await expect(filterMenu).toContainText("Show Empty");

    await filterMenu.getByText("Show Empty").click();

    const savedSettings = await page.evaluate(() => {
      const item = window.localStorage.getItem("gh-stats-settings");
      return item ? JSON.parse(item) : null;
    });
    expect(savedSettings?.filter?.showEmpty).toBe(false);
  });
});
