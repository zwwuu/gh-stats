import { expect, test } from "@playwright/test";

test.describe("Static pages", () => {
  test("navigates to the static informational pages from the footer", async ({
    page,
  }) => {
    await page.goto("/");

    const pages = [
      { label: "About", path: "/about" },
      { label: "Contact", path: "/contact-us" },
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms of Service", path: "/terms-of-service" },
    ];

    for (const pageInfo of pages) {
      await page.goto(pageInfo.path);
      await expect(page.locator("body")).toContainText(pageInfo.label);
    }
  });
});
