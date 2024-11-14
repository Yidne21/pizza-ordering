import {
  Given,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
  Before,
} from "@cucumber/cucumber";
import { chromium, Browser, Page } from "@playwright/test";

let browser: Browser;
let page: Page;

setDefaultTimeout(50000);

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false, timeout: 20000 });
  const context = await browser.newContext();
  page = await context.newPage();
});

Before(async function () {
  this.page = page;
  this.browser = browser;
});

AfterAll(async function () {
  await browser.close();
});

Given(
  "the user is logged in with email {string} and password {string}",
  async function (email: string, password: string) {
    await this.page.goto("https://pizza-ordering-omega.vercel.app/login");
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');

    await this.page.waitForURL("https://pizza-ordering-omega.vercel.app");
  }
);
