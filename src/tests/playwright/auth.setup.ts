import { test as setup } from "@playwright/test";

const authFile = "src/tests/playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("http://172.29.43.236:3000/signin");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("raccoon@gmail.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("123");

  await page.getByRole("button", { name: "Sign In" }).click();

  await page.waitForURL("http://172.29.43.236:3000");

  await page.context().storageState({ path: authFile });
});
