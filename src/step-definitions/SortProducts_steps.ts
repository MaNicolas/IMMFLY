import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";

const url = "https://highlifeshop.com/speedbird-cafe";

Given("I navigate to highlifeshop homepage", async () => {
  await pageFixture.page.goto(url);
});

Given("I close the cookie popup", async () => {  
  const cookiePopup = pageFixture.page.locator(".ammodals-overlay");
  if (await cookiePopup.isVisible()) {
    await cookiePopup.click();
  }
});

When("I click on the SortBy button", async () => {
  await pageFixture.page
    .locator("ul")
    .filter({ hasText: "Default Default New Arrivals" })
    .getByRole("listitem")
    .click();
});

When("I select {string} criteria", async (criteria: string) => {
  await pageFixture.page.locator("li").filter({ hasText: criteria }).click();

  await pageFixture.page.waitForResponse((response) =>
      response.url().includes('customer/section/load/') && response.status() === 200);
});

Then("The products should be sorted alphabetically", async () => {  
  const productNames = await pageFixture.page.locator('css=.product-item-link').allInnerTexts();
  const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));

  for (let i = 0; i < productNames.length; i++) {
    expect(productNames[i]).toBe(sortedNames[i]);    
  }
});

Then("Url should contain {string}", async (url: string) => {
  expect(pageFixture.page).toHaveURL(`https://highlifeshop.com/cafe${url}`);
});
