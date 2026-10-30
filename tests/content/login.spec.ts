import { test, expect } from '@playwright/test';

test.describe('Login negative scenarios @content', () => {
  test('invalid credentials are rejected', async ({ page }) => {
    await page.goto('index.htm');
    await page.locator('input[name="username"]').fill('not_a_user_123');
    await page.locator('input[name="password"]').fill('wrong_password');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page.getByText('could not be verified')).toBeVisible();
  });

  test('empty credentials show an error', async ({ page }) => {
    await page.goto('index.htm');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page.getByText('Please enter a username and password')).toBeVisible();
  });
});
