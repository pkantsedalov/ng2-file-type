import {
  browser, element, by,
  ElementFinder
} from 'protractor';
import { promise as WebDriverPromise } from 'selenium-webdriver';

export class Ng2PresentationPage {

  public navigateTo(path: string = ''): WebDriverPromise.Promise<any> {
    return browser.get(`/${path}`);
  }

  public getElementBySelector(selector: string = ''): ElementFinder {
    return element(by.css(selector));
  }

  public getFileInput(): ElementFinder {
    return element(by.css('input[type="file"]'));
  }

}
