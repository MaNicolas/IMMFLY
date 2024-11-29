import { World, setWorldConstructor, IWorldOptions } from "@cucumber/cucumber";

export class CucumberWorld extends World {

  private url?: string;

  setUrl(url: string) {
    this.url = url;
  }

  getUrl() {
    return this.url;
  }
}

setWorldConstructor(CucumberWorld);
