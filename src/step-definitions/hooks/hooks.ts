import { BeforeAll, Before, AfterAll, After, Status } from "@cucumber/cucumber";
import {
  Browser,
  BrowserType,
  chromium,
  firefox,
  webkit,
} from "@playwright/test";
import { pageFixture } from "./browserContextFixture";
import { setGlobalSettings } from "../../utils/playwright-timeout";
import { PageManager } from "../../page-objects/base/PageManager";

//Loads env variables from .env file
import { config as loadEnv } from "dotenv";
const env = loadEnv({ path: "./env/.env" });

//Create a configuration object for easy access to env variables
const config = {
  headless: env.parsed?.HEADLESS === "true",
  browser: env.parsed?.UI_AUTOMATION_BROWSER || "chromium",
  width: parseInt(env.parsed?.BROWSER_WIDTH || "1920"),
  height: parseInt(env.parsed?.BROWSER_HEIGHT || "1080"),
};

//Create dictionnary mapping browser names to their launch functions
const browsers: { [key: string]: BrowserType } = {
  chromium: chromium,
  firefox: firefox,
  webkit: webkit,
};

let browserInstance: Browser | null = null;

async function initializeBrowserContext(
  selectedBrowser: string
): Promise<Browser> {
  const launchBrowser = browsers[selectedBrowser];
  if (!launchBrowser) {
    throw new Error(`Invalid browser selected: ${selectedBrowser}`);
  }

  return await launchBrowser.launch({ headless: config.headless });
}

async function initializePage(): Promise<void> {
  if (!browserInstance) {
    throw new Error("Browser instance is null");
  }

  pageFixture.context = await browserInstance.newContext({
    ignoreHTTPSErrors: true,
  });

  pageFixture.page = await pageFixture.context.newPage();
  setGlobalSettings(pageFixture.page);
  await pageFixture.page.setViewportSize({
    width: config.width,
    height: config.height,
  });
}

Before(async function () {
  try {
    browserInstance = await initializeBrowserContext(config.browser);
    await initializePage();

    this.pageManager = new PageManager();
    this.basePage = this.pageManager.createBasePage();
    this.homePage = this.PageManafer.createHomePage();
  } catch (error) {
    console.error("Browser context initialization failed:", error);
  }
});

After(async function ({ pickle, result }) {
  if (result?.status === Status.FAILED) {
    if (pageFixture.page) {
      const screenshotPath = `./reports/screenshots/${
        pickle.name
      }-${Date.now()}.png`;
      const image = await pageFixture.page.screenshot({
        path: screenshotPath,
        type: "png",
      });

      await this.attach(image, "image/png");
    } else {
      console.error("pageFixture.page is undefined");
    }
  }

  if (browserInstance) {
    await pageFixture.page?.close();
    await browserInstance.close();
  }
});
