import { Given } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";

Given('I wait for {int} seconds', async (seconds: number) => {
  await pageFixture.page.waitForTimeout(seconds * 1000);
})