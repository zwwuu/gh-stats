import { expect, test } from "@playwright/test";

const REAL_OWNER = "facebook";
const REAL_REPO = "hermes";

test.describe("Repository page interactions", () => {
  test("can toggle theme preferences", async ({ page }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);

    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      {
        timeout: 20000,
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
      `${REAL_OWNER}/${REAL_REPO}`,
      {
        timeout: 20000,
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

  test("can toggle prerelease and draft filters and reset filters", async ({
    page,
  }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);

    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      {
        timeout: 20000,
      },
    );

    await page.getByRole("button", { name: /Filters/i }).click();
    const filterMenu = page.getByRole("menu");
    await expect(filterMenu).toBeVisible();

    // Toggle Show Prerelease off
    await filterMenu.getByText("Prerelease").click();

    // Reopen menu and verify Reset filters button is visible
    await page.getByRole("button", { name: /Filters/i }).click();
    const resetOption = filterMenu.getByText("Reset filters");
    await expect(resetOption).toBeVisible();
    await resetOption.click();

    // Settings in localStorage should have default filter values restored
    const settings = await page.evaluate(() => {
      const item = window.localStorage.getItem("gh-stats-settings");
      return item ? JSON.parse(item) : null;
    });
    expect(settings?.filter?.showPrerelease).toBe(true);
    expect(settings?.filter?.showDraft).toBe(true);
    expect(settings?.filter?.showEmpty).toBe(true);
  });

  test("can search release tags without changing overall stats", async ({
    page,
  }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);

    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      {
        timeout: 20000,
      },
    );

    const totalDownloadsStat = page
      .getByRole("heading", { name: "Total Downloads" })
      .locator("..");
    await expect(totalDownloadsStat).toBeVisible();
    const initialStatsText = await totalDownloadsStat.innerText();

    const tagSearchInput = page.getByPlaceholder("Search tags...");
    await expect(tagSearchInput).toBeVisible();

    // Type a specific tag or query
    await tagSearchInput.fill("v0.12");

    // The release timeline should filter to matching tags
    await expect(page.getByText("v0.12").first()).toBeVisible();

    // Overall stats should remain unchanged
    const afterSearchStatsText = await totalDownloadsStat.innerText();
    expect(afterSearchStatsText).toBe(initialStatsText);
  });

  test("can search releases by name and clear search query", async ({
    page,
  }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);

    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      {
        timeout: 20000,
      },
    );

    const tagSearchInput = page.getByPlaceholder("Search tags...");
    await expect(tagSearchInput).toBeVisible();

    // Search by release name
    await tagSearchInput.fill("RN0.75");
    await expect(page.getByText("v0.13.0 for RN0.75.x")).toBeVisible();

    // Clear search using the clear action button
    const clearBtn = page.getByRole("button", { name: "Clear query" });
    await expect(clearBtn).toBeVisible();
    await clearBtn.click();

    await expect(tagSearchInput).toHaveValue("");
    await expect(page.getByText("v0.13.0").first()).toBeVisible();
  });

  test("can navigate to releases using max and min download stat tile links", async ({
    page,
  }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);

    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      {
        timeout: 20000,
      },
    );

    const maxDownloadTile = page
      .getByRole("heading", { name: "Most Downloaded Release" })
      .locator("..");
    const maxAnchor = maxDownloadTile.locator("a[href^='#tag-']");
    await expect(maxAnchor).toBeVisible();
    await maxAnchor.click();

    const minDownloadTile = page
      .getByRole("heading", { name: "Least Downloaded Release" })
      .locator("..");
    const minAnchor = minDownloadTile.locator("a[href^='#tag-']");
    await expect(minAnchor).toBeVisible();
    await minAnchor.click();
  });

  test("can trigger export releases as CSV and JSON", async ({ page }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);

    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      {
        timeout: 20000,
      },
    );

    await page.getByRole("button", { name: /Export/i }).click();
    const exportMenu = page.getByRole("menu");
    await expect(exportMenu).toBeVisible();

    // Setup download listeners
    const [csvDownload] = await Promise.all([
      page.waitForEvent("download"),
      exportMenu.getByText("Export as CSV").click(),
    ]);
    expect(csvDownload.suggestedFilename()).toContain("releases.csv");

    await page.getByRole("button", { name: /Export/i }).click();
    const [jsonDownload] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("menu").getByText("Export as JSON").click(),
    ]);
    expect(jsonDownload.suggestedFilename()).toContain("releases.json");
  });

  test("displays repository metrics, stats tiles, and release assets", async ({
    page,
  }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);

    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      {
        timeout: 20000,
      },
    );

    // Check stats tiles
    await expect(page.getByText("Total Downloads")).toBeVisible();
    await expect(page.getByText("Average Downloads Per Release")).toBeVisible();
    await expect(page.getByText("Most Downloaded Release")).toBeVisible();
    await expect(page.getByText("Least Downloaded Release")).toBeVisible();

    // Check metadata labels
    await expect(page.getByText(/stars/i).first()).toBeVisible();
    await expect(page.getByText(/forks/i).first()).toBeVisible();
    await expect(page.getByText(/watching/i).first()).toBeVisible();
    await expect(page.getByText(/releases/i).first()).toBeVisible();
  });

  test("displays and uses scroll to top floating button", async ({ page }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);

    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      {
        timeout: 20000,
      },
    );

    const scrollToTopBtn = page.getByRole("button", {
      name: "Scroll to top",
    });

    // Scroll down past the 400px threshold
    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect(scrollToTopBtn).toBeVisible();

    // Click scroll to top
    await scrollToTopBtn.click();
    await page.waitForFunction(() => window.scrollY === 0);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });

  test("navigates back to home page by clicking navbar logo", async ({
    page,
  }) => {
    await page.goto(`/${REAL_OWNER}/${REAL_REPO}`);

    await expect(page.locator("h1")).toContainText(
      `${REAL_OWNER}/${REAL_REPO}`,
      {
        timeout: 20000,
      },
    );

    const navbarLogoLink = page.getByRole("banner").getByRole("link", {
      name: /GH Stats/i,
    });
    await expect(navbarLogoLink).toBeVisible();
    await navbarLogoLink.click();

    await expect(page).toHaveURL("/");
    await expect(page.getByText("Trending")).toBeVisible();
  });
});
