# Trengo - Frontend Interview Assignment

This template should help get you started developing with Vue 3 with Vite. It contains nothing more than the basic skeleton with which you can start developing the solution to the given assignment. You may modify it if you see the need to, but note that it's not necessary and the setup we've provided here should be fine for the purposes of this assignment.

Tailwind has already been pre-configured for you and is ready to use in your templates & components. If you're not familiar with Tailwind, you can consult the [documentation here](https://tailwindcss.com/docs/installation).

Should you wish to add any NPM packages to this project that you feel might help you in developing, feel free to do so, we leave that decision up to you.

Should you have any issues running this project, please reach out to us ASAP and we'll help you through it.

## Project Setup

This repository is a template, meaning that you can use it as a base for your own repository. To do so, you can click on the `Use this template` button in the top part of the screen. Make sure to select `Create a new repository`, and also make sure to set the repo as private.

Once you've done so, you'll have created your own repo with fresh history under your own account. You can now pull the repository that's under your account, and can get started with the assignment.

To do so, run `npm install`, which will install all the project's dependencies for you. With that done, you may now run `npm run dev` to get a dev server with HMR going.

Once you're done with the assignment, please make sure to give your contact person (they should be in the document you received regarding this assignment) access rights to your private repository, so that we may view it.

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
