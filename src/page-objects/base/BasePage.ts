import { Page, Locator } from "@playwright/test";
import { pageFixture } from "../../step-definitions/hooks/browserContextFixture";

export class BasePage {
  get page(): Page {
    return pageFixture.page;
  }

  public async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  public async waitAndClickByRole(role: string, name: string): Promise<void> {
    const element = await this.page.getByRole(role as any, { name: name });
    await element.click();
  }

  public async waitAndClickByLocator(role: string, text: string): Promise<void> {
    const element = await this.page.locator(role).filter({ hasText: text });
    await element.click();
  }

  public async waitAndClick(locator: Locator): Promise<void> {
    await locator.isVisible();
    await locator.click();
  }

  public async waitAndClickSelector(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }
}
