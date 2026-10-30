import { test as base, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { AccountPage } from '../pages/AccountPage';

type BankUser = { username: string; password: string };

type Fixtures = {
  /** A freshly registered (and logged-in) bank customer */
  bankUser: BankUser;
  accountPage: AccountPage;
};

export const test = base.extend<Fixtures>({
  bankUser: async ({ page }, use) => {
    const user: BankUser = {
      username: `qa_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      password: 'Test@1234',
    };
    await new RegisterPage(page).register(user.username, user.password);
    await use(user);
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
});

export { expect };
