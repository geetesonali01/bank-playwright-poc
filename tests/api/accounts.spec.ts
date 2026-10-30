import { test, expect } from '../../fixtures/bankFixtures';

/**
 * Hybrid test: the customer is created through the UI (fixture),
 * then the ParaBank REST API is used to verify the data.
 * API docs: https://parabank.parasoft.com/parabank/api-docs/index.html
 */
test.describe('Accounts API @api', () => {
  test('login API returns the customer, accounts API returns accounts', async ({ request, bankUser }) => {
    const headers = { Accept: 'application/json' };

    const loginRes = await request.get(
      `services/bank/login/${bankUser.username}/${bankUser.password}`,
      { headers }
    );
    expect(loginRes.status()).toBe(200);
    const customer = await loginRes.json();
    expect(customer.firstName).toBe('Sonali');
    expect(customer.id).toBeGreaterThan(0);

    const accountsRes = await request.get(`services/bank/customers/${customer.id}/accounts`, { headers });
    expect(accountsRes.status()).toBe(200);
    const accounts = await accountsRes.json();
    expect(Array.isArray(accounts)).toBeTruthy();
    expect(accounts.length).toBeGreaterThanOrEqual(1);
    expect(accounts[0]).toHaveProperty('balance');
  });

  test('login API rejects wrong password', async ({ request, bankUser }) => {
    const res = await request.get(`services/bank/login/${bankUser.username}/wrong_pass`, {
      headers: { Accept: 'application/json' },
    });
    expect(res.status()).toBeGreaterThanOrEqual(400);
  });
});
