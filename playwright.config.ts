import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", // Directory where feature files and tests are located
  timeout: 50 * 1000, // Set a 30s timeout for each test
  retries: 1,
  reporter: [["html", { outputFolder: "playwright-report" }]],
  use: {
    headless: true,
    baseURL: "https://pizza-ordering-omega.vercel.app", // Update if your server runs on a different port
    viewport: { width: 1280, height: 720 },
    video: "on-first-retry",
    screenshot: "only-on-failure",
  },
});
