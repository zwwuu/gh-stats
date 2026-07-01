import { expect, test } from "@playwright/test";

const REAL_OWNER = "facebook";
const REAL_REPO = "hermes";

test.describe("Search functionality", () => {
  test("shows validation feedback for malformed repository input", async ({
    page,
  }) => {
    await page.goto("/");
    const searchInput = page.getByPlaceholder("Enter a GitHub Repository URL");
    await expect(searchInput).toBeVisible();

    await searchInput.fill("not-a-repository");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByText("Invalid GitHub repository URL")).toBeVisible();
    await expect(page).toHaveURL("/");
  });

  test("should navigate from home page to repo page using a GitHub repository URL", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByPlaceholder("Enter a GitHub Repository URL"),
    ).toBeVisible();

    await page
      .getByPlaceholder("Enter a GitHub Repository URL")
      .fill(`https://github.com/${REAL_OWNER}/${REAL_REPO}`);
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page).toHaveURL(new RegExp(`/${REAL_OWNER}/${REAL_REPO}$`));
    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER} / ${REAL_REPO}`,
      {
        timeout: 15000,
      },
    );
  });
});
