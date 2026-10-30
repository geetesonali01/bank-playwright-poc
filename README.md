# Banking Playwright Automation POC

End-to-end test automation framework built with **Playwright + TypeScript** on the public
[ParaBank](https://parabank.parasoft.com) demo banking application.

> Only a public demo app is used. No client code, data or credentials are included.

## Highlights

- **Page Object Model** (`pages/`) for maintainable locators and actions
- **Custom fixtures** (`fixtures/`): each test gets a freshly registered bank customer, so tests are independent and parallel-safe
- **3 test categories:** Content/UI, Transaction (E2E), API
- **Hybrid UI + API test:** customer created via UI, verified via REST API
- **Cross-device:** Desktop Chrome + iPhone 13 emulation for UI tests
- **Role-based locators** (`getByRole`) and web-first assertions (auto-waiting, no hard sleeps)
- **Failure diagnostics:** screenshot, video and trace on failure
- **CI:** GitHub Actions runs the suite on every push and uploads the HTML report

## Test Coverage Matrix

| Area | Scenario | Type | File |
|---|---|---|---|
| Home page | Title, login button, register link visible | UI | `tests/content/home.spec.ts` |
| Registration | Form visible, empty-form validation errors | UI / Negative | `tests/content/home.spec.ts` |
| Login | Invalid and empty credentials rejected | Negative | `tests/content/login.spec.ts` |
| Accounts | Open new savings account | E2E | `tests/transaction/transfer.spec.ts` |
| Transactions | Transfer funds between own accounts | E2E | `tests/transaction/transfer.spec.ts` |
| Accounts overview | Accounts listed after opening account | E2E | `tests/transaction/transfer.spec.ts` |
| Auth API | Login returns customer, wrong password rejected | API | `tests/api/accounts.spec.ts` |
| Accounts API | Customer accounts returned with balance | API | `tests/api/accounts.spec.ts` |

## Project Structure

```
.github/workflows/   CI pipeline
fixtures/            custom Playwright fixtures (registered user, page objects)
pages/               Page Object Model classes
tests/
  content/           UI / content / negative tests (desktop + mobile)
  transaction/       banking E2E flows
  api/               REST API tests
playwright.config.ts projects, reporters, base URL
```

## How to run

```bash
npm install
npx playwright install

npm test                 # everything (Chrome + iPhone)
npm run test:chromium    # desktop Chrome only
npm run test:headed      # watch the browser
npm run test:ui          # Playwright UI mode
npm run test:content     # one category (also :transaction, :api)
npm run report           # open HTML report
```

## Design decisions

- **Unique user per test** (timestamp + random) avoids data clashes in parallel runs.
- **No `waitForTimeout`**; Playwright auto-waiting and `expect` retries handle async UI.
- **1 retry** configured because the public demo site can be slow; traces are captured on retry.

## Possible next steps

- Code coverage report (monocart-reporter) for instrumented builds
- Visual regression and accessibility checks (axe-core)
- Allure reporting, test sharding in CI
