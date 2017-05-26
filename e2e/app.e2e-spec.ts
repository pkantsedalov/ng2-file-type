/* global __dirname */

import {browser, ElementFinder} from 'protractor';
import * as path         from 'path';

import { Ng2PresentationPage } from './app.po';

const hasClass = async (element: ElementFinder, className: string): Promise<boolean> => {
  let classes: string        = await element.getAttribute('class');
  let classesArray: string[] = classes.split(' ');
  return classesArray.includes(className);
};

describe('ng2-presentation App', () => {
  let page: Ng2PresentationPage;

  beforeEach(() => {
    page = new Ng2PresentationPage();
  });

  describe('restrictions', () => {

    it('should check the default state of <input type="file" [ng2FileSize] />', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getFileInput();

      expect(await hasClass(fileInputHtmlElement, 'ng-untouched')).toBe(true, 'no ng-untouched CSS class');
      expect(await hasClass(fileInputHtmlElement, 'ng-pristine')).toBe(true, 'no ng-pristine CSS class');
      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-invalid CSS class');
    });

    it('should check the state of <input type="file" [ng2FileSize] /> after setting a value of valid size', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getFileInput();

      await fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'normal.png'));

      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');
    });

    it('should check the state of <input type="file" [ng2FileSize] /> after resetting a value', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getFileInput();

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'normal.png'));
      await fileInputHtmlElement.clear();

      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-invalid CSS class');
    });

    it('should check the state of <input type="file" [ng2FileSize] /> after decreasing a "min" value', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getFileInput();
      const sizeRestrictionsMinInputHtmlElement: ElementFinder = page.getElementBySelector('#sizeRestrictionsMinInput');

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'small.png'));
      expect(await hasClass(fileInputHtmlElement, 'ng-invalid')).toBe(true, 'no ng-invalid CSS class');

      await sizeRestrictionsMinInputHtmlElement.clear();
      sizeRestrictionsMinInputHtmlElement.sendKeys('1');
      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');
    });

    it('should check the state of <input type="file" [ng2FileSize] /> after increasing a "max" value', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getFileInput();
      const sizeRestrictionsMinInputHtmlElement: ElementFinder = page.getElementBySelector('#sizeRestrictionsMaxInput');

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'large.png'));
      expect(await hasClass(fileInputHtmlElement, 'ng-invalid')).toBe(true, 'no ng-invalid CSS class');

      await sizeRestrictionsMinInputHtmlElement.clear();
      sizeRestrictionsMinInputHtmlElement.sendKeys(`${1024 * 1024 * 100}`);
      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');
    });

  });

  describe('error message', () => {

    it('should check the default error message for too small file', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder    = page.getFileInput();
      const errorMessageHtmlElement: ElementFinder = page.getElementBySelector('.file-size-container .size-error-msg-text');

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'small.png'));

      expect(await errorMessageHtmlElement.getText() === 'File size is invalid').toBe(true, 'no default error message');
    });

    it('should check the default error message for too big file', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder    = page.getFileInput();
      const errorMessageHtmlElement: ElementFinder = page.getElementBySelector('.file-size-container .size-error-msg-text');

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'large.png'));

      expect(await errorMessageHtmlElement.getText() === 'File size is invalid').toBe(true, 'no default error message');
    });

    it('should check the custom error message', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder     = page.getFileInput();
      const errorMessageHtmlElement: ElementFinder  = page.getElementBySelector('.file-size-container .size-error-msg-text');
      const errorMsgInputHtmlElement: ElementFinder = page.getElementBySelector('#sizeRestrictionsErrorMsgInput');

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'large.png'));

      await errorMsgInputHtmlElement.clear();
      errorMsgInputHtmlElement.sendKeys('Test');

      expect(await errorMessageHtmlElement.getText() === 'Test').toBe(true, 'no custom error message');
    });

  });

});
