import { Page } from "@playwright/test";

export function setGlobalSettings(page: Page) {

  //Set Global 'navigation' timeout
  page.setDefaultNavigationTimeout(10000);

  //Set global 'command' timeout
  page.setDefaultTimeout(5000);
}
