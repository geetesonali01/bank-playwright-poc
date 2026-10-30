import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1, // demo site can be slow, one retry avoids false failures
  workers: process.env.CI ? 2 : undefined,
  timeout: 60_000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // NOTE: trailing slash is important, tests use relative paths like 'index.htm'
    baseURL: 'https://parabank.parasoft.com/parabank/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    {
      // Mobile view: only content/UI tests run here
      name: 'iphone',
      testMatch: /content\/.*\.spec\.ts/,
      use: { ...devices['iPhone 13'] },
    },
  ],
});
