# Tasker

Task management app to demo Nx onboarding.

There is an existing `verify.yml` GitHub Action workflow that will run the following:

```
# Prettier check
pnpm format:check

# ESLint
pnpm lint

# Next.js
pnpm --filter "@tasker/web" build

# Vitest
pnpm --filter "@tasker/*" test

# Playwright
pnpm --filter "@tasker/e2e-web" e2e
```

## Add Nx CLI

Run this command to start:

```
npx nx@latest init
```

## Enable CI features

To enable CI features such as remote caching and distribution you can generate a new CI config file:

```
pnpm nx ci-workflow --ci github
```

You can use that newly generated file and remoe the old `verify.yml` or keep the old one and just insert the following pieces:

### Enable Nx Agent distribution

Make sure you have this line. Use the generated CI config to see where it is located

```
- run: npx nx-cloud start-ci-run --distribute-on="5 linux-medium-js" --stop-agents-after="e2e-ci"
```

### Use Nx commands

Replace the existing commands with the following:

```
pnpm exec nx affected -t lint test build e2e-ci
```
