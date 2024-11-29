import { BasePage } from "./base/BasePage";

export class HomePage extends BasePage {
  public async clickOnCookiePopUp(): Promise<void> {
    await this.waitAndClickSelector(".ammodals-overlay");
  }

  public async clickOnSortByButton(): Promise<void> {
    await this.waitAndClickSelector("css=.sorter-dropdown .init");
  }

  public async selectCriteria(criteria: string): Promise<void> {
    await this.waitAndClickByLocator("li", criteria);
    await this.page.waitForResponse(
      (response) =>
        response.url().includes("customer/section/load/") &&
        response.status() === 200
    );
  }

  public async getAllProductsName(): Promise<string[]>{
    const productNames = await this.page.locator('css=.product-item-link').allInnerTexts();
    return productNames;
  }
}
