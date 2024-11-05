import { setWorldConstructor } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import config from "../../playwright.config.ts"; // Adjust the path as necessary

class CustomWorld {
  browser: Browser | null = null;
  context: BrowserContext | null = null;
  page: Page | null = null;

  async openBrowser() {
    // Use the settings from the Playwright configuration file
    const browserOptions = { headless: config.use?.headless ?? true };
    this.browser = await chromium.launch(browserOptions);

    // Apply context options from the config (e.g., baseURL, viewport)
    this.context = await this.browser.newContext({
      baseURL: config.use?.baseURL,
      viewport: config.use?.viewport,
    });

    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
