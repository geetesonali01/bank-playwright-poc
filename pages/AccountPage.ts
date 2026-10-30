import { Page, expect } from '@playwright/test';

export class AccountPage {
  constructor(private page: Page) {}

  /** Opens a new SAVINGS account funded from the first existing account. */
  async openNewSavingsAccount(): Promise<string> {
    await this.page.getByRole('link', { name: 'Open New Account' }).click();
    await this.page.locator('#type').selectOption('SAVINGS');
    // options load asynchronously, wait for at least one account in the list
    await expect(this.page.locator('#fromAccountId option')).not.toHaveCount(0);
    await this.page.getByRole('button', { name: 'Open New Account' }).click();
    await expect(this.page.getByRole('heading', { name: 'Account Opened!' })).toBeVisible();
    const newId = (await this.page.locator('#newAccountId').textContent())?.trim();
    expect(newId, 'new account id should be shown').toBeTruthy();
    return newId as string;
  }

  /** Transfers amount from the first account to the given account id. */
  async transfer(amount: string, toAccountId: string) {
    await this.page.getByRole('link', { name: 'Transfer Funds' }).click();
    await expect(this.page.getByRole('heading', { name: 'Transfer Funds' })).toBeVisible();
    await expect(this.page.locator('#toAccountId option')).not.toHaveCount(0);
    await this.page.locator('#amount').fill(amount);
    await this.page.locator('#toAccountId').selectOption(toAccountId);
    await this.page.getByRole('button', { name: 'Transfer' }).click();
  }

  async expectTransferComplete(amount: string) {
    await expect(this.page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
    await expect(this.page.locator('#amountResult')).toContainText(amount);
  }
}
