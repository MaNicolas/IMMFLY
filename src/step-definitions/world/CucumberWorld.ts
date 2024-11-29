import { World, setWorldConstructor, IWorldOptions } from "@cucumber/cucumber";
import { PageManager } from "../../page-objects/base/PageManager";
import { BasePage } from "../../page-objects/base/BasePage";
import { HomePage } from "../../page-objects/HomePage";

export class CucumberWorld extends World {
  public pageManager: PageManager;
  public basePage: BasePage;
  public homePage: HomePage;

  private url?: string;

  constructor({ attach, log, parameters, link }: IWorldOptions) {
    super({ attach, log, parameters, link });
    this.pageManager = new PageManager();
    this.basePage = this.pageManager.createBasePage();
    this.homePage = this.pageManager.createHomePage();
  }

  setUrl(url: string) {
    this.url = url;
  }

  getUrl() {
    return this.url;
  }
}

setWorldConstructor(CucumberWorld);
