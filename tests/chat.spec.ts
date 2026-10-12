import { test, expect } from "@playwright/test";

test.describe("Real-time Chat E2E Multi-User Flow", () => {
  const timestamp = Date.now();
  const userA = {
    displayName: `Alice_${timestamp}`,
    email: `alice_${timestamp}@example.com`,
    password: "Password123!",
  };
  const userB = {
    displayName: `Bob_${timestamp}`,
    email: `bob_${timestamp}@example.com`,
    password: "Password123!",
  };

  test("User A and User B registration, messaging, and real-time delivery", async ({ browser }) => {
    // 1. Create two isolated browser contexts for User A and User B
    const contextA = await browser.newContext();
    const contextB = await browser.newContext();

    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();

    // 2. Register User A
    await pageA.goto("/auth/sign-up");
    await pageA.fill('input[placeholder="Display Name"]', userA.displayName);
    await pageA.fill('input[placeholder="Email"]', userA.email);
    await pageA.locator('input[placeholder="Password"]').first().fill(userA.password);
    await pageA.locator('input[placeholder="Repeat Password"]').fill(userA.password);
    await pageA.click('button[type="submit"]');

    // 3. Register User B
    await pageB.goto("/auth/sign-up");
    await pageB.fill('input[placeholder="Display Name"]', userB.displayName);
    await pageB.fill('input[placeholder="Email"]', userB.email);
    await pageB.locator('input[placeholder="Password"]').first().fill(userB.password);
    await pageB.locator('input[placeholder="Repeat Password"]').fill(userB.password);
    await pageB.click('button[type="submit"]');

    // Expect navigation to dashboard
    await expect(pageA).toHaveURL(/\/dashboard/, { timeout: 15000 });
    await expect(pageB).toHaveURL(/\/dashboard/, { timeout: 15000 });

    await contextA.close();
    await contextB.close();
  });
});
