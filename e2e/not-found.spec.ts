import { expect, test } from "@playwright/test";

test.describe("404 Not Found Page", () => {
  test("renders custom 404 page for non-existent routes", async ({ page }) => {
    await page.goto("/non-existent/nested/path-to-nothing");

    await expect(
      page.getByRole("heading", { name: "Page Not Found" }),
    ).toBeVisible({ timeout: 15000 });

    await expect(
      page.getByText("You just hit a route that does not exist"),
    ).toBeVisible();
  });
});
