# Users table

Live demo: https://bogdanpotapenko.github.io/test-nuxt-3-uptowin/

Filtering by role and search, sorting by age and creation date, pagination with an
auto page size that fits the viewport, sticky table header, light/dark theme.
All table state lives in the URL query string, so reloading or sharing a link
restores it.

Requires Node 20.19+ (Nuxt 4). Deployed from `main` by `.github/workflows/deploy.yml`.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
