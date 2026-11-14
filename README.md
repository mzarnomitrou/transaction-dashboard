# Transaction Dashboard

A small transaction dashboard for a fictional financial application, built with **Vue 3, TypeScript, Pinia and Tailwind CSS**. It shows an account summary and a list of recent transactions that can be filtered, sorted, paginated and opened for details.

## Running the project locally

**Requirements:** Node.js **22.22+** (or 24.15+) and npm 11.

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

Other scripts:

| Command | What it does |
|---|---|
| `npm run test:unit -- --run` | Run the unit tests once |
| `npm run format` | Prettier |

### Seeing the loading and error states

The data comes from local JSON through a small mock API (`src/api/`) that waits before responding, so the loading states are visible. To see the error states, set `SHOULD_FAIL = true` in `src/api/account.ts` or `src/api/transactions.ts`.

## Features

- Account summary: account name, holder, masked account number, current and available balance, currency
- Transaction list with merchant, date, amount,amount displayed in account currency, currency, type and   status
- Filter by merchant (search), status and type, combinable, with a result count and "Clear filters"
- Sort by date or amount from the list header, with a one-click direction toggle (↑/↓)
- Pagination (10 per page)
- Transaction details in a modal when clicking on row
- Responsive layout for mobile and desktop

## Technical decisions
 **Amounts are stored as integers in minor units** (e.g. cents: `1299` = €12.99) together with a currency code. This avoids floating-point errors (`0.1 + 0.2 !== 0.3`), and all comparisons use integers.
 - **Decimal places come from the currency** via `Intl.NumberFormat` (ISO 4217): EUR has 2, JPY 0, BHD 3. There is no hand-maintained list. The mock data includes all three cases.
 - **One component (`MoneyAmount`) displays money everywhere for consistency**
 - **Credit/debit:** amounts are always positive, and `type` (`credit` | `debit`) is the single source of truth for direction. The sign is derived for display and sorting, so the amount and the type can never contradict each other.
 - **Mixed currencies:** each transaction has its original `amount` + `currency`, and an `accountAmount` in the account's currency (what the bank actually charged, provided by the backend). The frontend never converts with live exchange rates. In the list, foreign amounts show the account-currency equivalent underneath (this is also the value used when sorting by amount).
 - **IDs and references:** numeric `id`s model a backend with auto-increment keys and are used internally (e.g. list keys). Users see a short human-readable `reference` (e.g. `TXN-8F3K2A9Q`) instead. The account number is shown masked (last 4 characters).

### Stack and libraries

- **Vue 3 + TypeScript:** TypeScript for the data model and props.
- **Pinia:** the official Vue store, for state shared between components.
- **Tailwind CSS v4:**
- No money, date or UI libraries: `Intl` covers formatting, and the components are hand-built.


## With more time

- **Server-side pagination, filtering and sorting** for large datasets: the API returns one page at a time instead of the browser loading everything and slicing it.
- **Sync filters, sort and page to the URL**, so a filtered view can be shared, bookmarked and survives a refresh.
- **Replace the mock API with real requests** Only the functions in `src/api/` would change.
- **Support multiple accounts:** load transactions per account and key the store's data by account ID, with an account switcher in the UI.
