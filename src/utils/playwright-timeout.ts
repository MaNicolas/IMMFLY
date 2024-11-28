import { Page } from "@playwright/test";

export function setGlobalSettings(page: Page) {

  //Set Global 'navigation' timeout
  page.setDefaultNavigationTimeout(50000);

  //Set global 'command' timeout
  page.setDefaultTimeout(40000);
}
