import { Page, expect } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('register.htm');
  }

  async register(username: string, password: string) {
    await this.open();
    await this.page.locator('[id="customer.firstName"]').fill('Sonali');
    await this.page.locator('[id="customer.lastName"]').fill('Geete');
    await this.page.locator('[id="customer.address.street"]').fill('1 Test Street');
    await this.page.locator('[id="customer.address.city"]').fill('London');
    await this.page.locator('[id="customer.address.state"]').fill('London');
    await this.page.locator('[id="customer.address.zipCode"]').fill('E1 1AA');
    await this.page.locator('[id="customer.phoneNumber"]').fill('0123456789');
    await this.page.locator('[id="customer.ssn"]').fill('123-45-678');
    await this.page.locator('[id="customer.username"]').fill(username);
    await this.page.locator('[id="customer.password"]').fill(password);
    await this.page.locator('#repeatedPassword').fill(password);
    await this.page.getByRole('button', { name: 'Register' }).click();
    await expect(
      this.page.getByText('Your account was created successfully')
    ).toBeVisible();
  }
}
