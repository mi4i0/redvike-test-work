import { test } from '@playwright/test';
import { Application } from "../app";

export const baseFixture = test.extend<{ app: Application }>({
  app: async ({ page }, use) => {
    const app: Application = new Application(page);
    await use(app);
  },
});