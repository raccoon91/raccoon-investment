import { test, expect } from "@playwright/test";

test.describe("page test", () => {
  test("home page", async ({ page }) => {
    await page.goto("http://172.29.43.236:3000/");

    await expect(page.getByTestId("None-group")).toBeVisible();
  });

  test("symbol page", async ({ page }) => {
    await page.goto("http://172.29.43.236:3000/");

    await page.getByTestId("Symbol-sidebar-link").click();
    await page.waitForURL("http://172.29.43.236:3000/symbols");

    await page.getByTestId("search-select-box").click();
    await page.getByRole("menuitem", { name: "Ticker" }).click();
    await page.getByTestId("search-input-field").fill("msft");
    await page.getByRole("textbox").press("Enter");

    await expect(page.getByText("Microsoft Corp")).toBeVisible();

    await page.getByTestId("search-select-box").click();
    await page.getByRole("menuitem", { name: "Name" }).click();
    await page.getByTestId("search-input-field").fill("microsoft");
    await page.getByRole("textbox").press("Enter");

    await expect(page.getByText("Microsoft Corp")).toBeVisible();
  });

  test("calculate page", async ({ page }) => {
    await page.goto("http://172.29.43.236:3000/");

    await page.getByTestId("Calculate-sidebar-link").click();
    await page.waitForURL("http://172.29.43.236:3000/calculates");

    await expect(page.getByRole("tab", { name: "Profit & Loss" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Trade" })).toBeVisible();
  });
});
