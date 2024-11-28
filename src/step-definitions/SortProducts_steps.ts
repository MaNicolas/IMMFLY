import { Given, When, Then } from "@cucumber/cucumber";
import { Browser, Page, chromium } from "@playwright/test";

let browser: Browser;
let context: any;
let page: Page;

Given("I navigate to highlifeshop homepage", async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }});
  page = await context.newPage();

  await page.goto("https://highlifeshop.com/speedbird-cafe", { timeout: 80000, waitUntil: "domcontentloaded" });
});

When("I select {string} from the Sort By dropdown", async (criteria: string) => {
    console.log("Step 2");
  });

Then(
  "The products should be sorted by price in ascending order", async () => {
    console.log("Step 3");
  });
