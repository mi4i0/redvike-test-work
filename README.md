# Redvike test project

Test project for [Redvike](https://redvike.com/) company

Last E2E run result: [![mi4i0](https://circleci.com/gh/mi4i0/redvike-test-work/tree/master.svg?style=shield)](https://app.circleci.com/pipelines/github/mi4i0/redvike-test-work?branch=master)

Project is using:
* [Playwright](https://playwright.dev/) as test framework;
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) as programming language;
* [TypeScript](https://www.typescriptlang.org/) as programming language;
* [CircleCI](https://circleci.com/) as CI/CD tool for running E2E tests;
* [FakerJS](https://fakerjs.dev/) as package for generating fake data;
* [ESLint](https://eslint.org/) as linter for code style;

## Requirements:

- node version `^18.16`
- npm version `^8`

## Setup and running E2E tests locally
1. Run ```nmp i``` for installing dependencies
2. For running tests we have 2 options:
   1. Run all tests in CLI with headless mode (without opening browser): ```npm run e2e:run```
      * After execution, you could open report by next command: ```npx playwright show-report```
   2. Run specific tests in headful mode (opening browser): ```npm run e2e:run:ui```

## Tests structure
* Tests located in ```e2e/tests``` folder with extension .spec.ts
* Tests files located in ```e2e/fixtures``` folder with extension .spec.ts