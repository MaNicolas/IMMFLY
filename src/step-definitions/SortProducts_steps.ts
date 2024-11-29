import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";
import logger from "../logger/logger";
import { CucumberWorld } from "./world/CucumberWorld";

const url = "https://highlifeshop.com/speedbird-cafe";

Given("I navigate to highlifeshop homepage", async function (this: CucumberWorld) {
  try {
    await this.homePage.navigate(url);
    this.setUrl(url);
    logger.info(`Accessing url: ${url}`);
  } catch (error) {
    logger.info(`An error has occured: ${error}`);
  }  
});

Given("I close the cookie popup", async function (this: CucumberWorld) {
  await this.homePage.clickOnCookiePopUp();
  logger.info('Closing Popup');
});

When("I click on the SortBy button", async function (this: CucumberWorld) {
  await this.homePage.clickOnSortByButton();
  logger.info('Clicking on SortBy button');
});

When("I select {string} criteria", async function (this: CucumberWorld, criteria: string) {
  await this.homePage.selectCriteria(criteria);
  logger.info(`Selecting ${criteria} criteria`);
});

Then("The products should be sorted alphabetically", async function (this: CucumberWorld) {  
  const productNames = await this.homePage.getAllProductsName();
  const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));

  for (let i = 0; i < productNames.length; i++) {
    expect(productNames[i]).toBe(sortedNames[i]);    
  }
});

Then("Url should contain {string}", async (url: string) => {
  expect(pageFixture.page).toHaveURL(`https://highlifeshop.com/cafe${url}`);
});
