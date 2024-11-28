import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";

const url = "https://highlifeshop.com/speedbird-cafe";

Given("I navigate to highlifeshop homepage", async () => {
  await pageFixture.page.goto(url);
});

Given("I close the cookie popup", async () => {
  await pageFixture.page.locator('.ammodals-overlay').click();
});

When("I click on the SortBy button", async () => {
  await pageFixture.page.locator('ul').filter({ hasText: 'Default Default New Arrivals' }).getByRole('listitem').click();
});

When("I select Price criteria", async () => {
    await pageFixture.page.locator('li').filter({ hasText: 'Product A-Z' }).click();
});

Then("The products should be sorted by price in ascending order", async () => {
  
});
