import { test, expect } from '../../fixtures/bankFixtures';

test.describe('Banking transactions @transaction', () => {
  test('new customer can open a savings account', async ({ bankUser, accountPage }) => {
    const newAccountId = await accountPage.openNewSavingsAccount();
    expect(newAccountId).toMatch(/^\d+$/);
  });

  test('new customer can transfer funds between own accounts', async ({ bankUser, accountPage }) => {
    const newAccountId = await accountPage.openNewSavingsAccount();
    await accountPage.transfer('50', newAccountId);
    await accountPage.expectTransferComplete('50');
  });

  test('accounts overview lists the customer accounts', async ({ page, bankUser, accountPage }) => {
    await accountPage.openNewSavingsAccount();
    await page.getByRole('link', { name: 'Accounts Overview' }).click();
    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
    await expect(page.locator('#accountTable tbody tr').first()).toBeVisible();
  });
});
