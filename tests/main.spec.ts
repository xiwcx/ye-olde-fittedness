import { test, expect } from "@playwright/test";

const url = "http://localhost:3000/";

test("logged out by default", async ({ page }) => {
  await page.goto(url);

  await expect(page.getByRole("button")).toHaveText("Sign in with GitHub");
});
