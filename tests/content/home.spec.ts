import { test, expect } from '@playwright/test';

test.describe('Content / UI @content', () => {
  test('home page loads with key content', async ({ page }) => {
    await page.goto('index.htm');
    await expect(page).toHaveTitle(/ParaBank/);
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
  });

  test('register page shows the sign-up form', async ({ page }) => {
    await page.goto('register.htm');
    await expect(page.getByRole('heading', { name: 'Signing up is easy!' })).toBeVisible();
    await expect(page.locator('[id="customer.username"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  });

  test('registration shows validation errors for empty form', async ({ page }) => {
    await page.goto('register.htm');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByText('First name is required.')).toBeVisible();
    await expect(page.getByText('Username is required.')).toBeVisible();
  });
});
