/* global __dirname */

import {browser, ElementFinder} from 'protractor';
import * as path         from 'path';

import { Ng2PresentationPage } from './app.po';

const hasClass = async (element: ElementFinder, className: string): Promise<boolean> => {
  let classes: string        = await element.getAttribute('class');
  let classesArray: string[] = classes.split(' ');
  return classesArray.includes(className);
};

describe('NG2 File Type Validation Directive', () => {
  let page: Ng2PresentationPage;

  beforeEach(() => {
    page = new Ng2PresentationPage();
  });

  describe('restrictions', () => {

    it('should check the default state of <input type="file" [ng2FileType] />', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getFileInput();

      expect(await hasClass(fileInputHtmlElement, 'ng-untouched')).toBe(true, 'no ng-untouched CSS class');
      expect(await hasClass(fileInputHtmlElement, 'ng-pristine')).toBe(true, 'no ng-pristine CSS class');
      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-invalid CSS class');
    });

    it('should check the state of <input type="file" [ng2FileType] /> after setting a value of valid type [string]', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getFileInput();

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'test.json'));

      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');
    });

    it('should check the state of <input type="file" [ng2FileType] /> after resetting a value', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getFileInput();

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'test.json'));
      await fileInputHtmlElement.clear();

      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-invalid CSS class');
    });

    it('should check the state of <input type="file" [ng2FileType] /> after setting a value of valid types [array]', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getFileInput();
      const typeRestrictionsMinInputHtmlElement: ElementFinder = page.getElementBySelector('#arrayRestriction');

      await typeRestrictionsMinInputHtmlElement.click();

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'test.json'));
      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');

      await fileInputHtmlElement.clear();
      fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'test.txt'));
      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');

      await fileInputHtmlElement.clear();
      fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'test.html'));
      expect(await hasClass(fileInputHtmlElement, 'ng-invalid')).toBe(true, 'no ng-invalid CSS class');
    });

    it('should check the state of <input type="file" [ng2FileType] /> after setting a value of valid type [regex]', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder = page.getFileInput();
      const typeRestrictionsMinInputHtmlElement: ElementFinder = page.getElementBySelector('#regexRestriction');

      await typeRestrictionsMinInputHtmlElement.click();

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'test.json'));
      expect(await hasClass(fileInputHtmlElement, 'ng-valid')).toBe(true, 'no ng-valid CSS class');

      await fileInputHtmlElement.clear();
      fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'test.txt'));
      expect(await hasClass(fileInputHtmlElement, 'ng-invalid')).toBe(true, 'no ng-invalid CSS class');
    });

  });

  describe('error message', () => {

    it('should check the default error message for invalid file', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder    = page.getFileInput();
      const errorMessageHtmlElement: ElementFinder = page.getElementBySelector('.type-error-msg-text');

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'test.html'));

      expect(await errorMessageHtmlElement.getText() === 'File type is invalid').toBe(true, 'no default error message');
    });

    it('should check the custom error message', async () => {
      page.navigateTo('');
      const fileInputHtmlElement: ElementFinder     = page.getFileInput();
      const errorMessageHtmlElement: ElementFinder  = page.getElementBySelector('.type-error-msg-text');
      const errorMsgInputHtmlElement: ElementFinder = page.getElementBySelector('#errorMessageInput');

      fileInputHtmlElement.sendKeys(path.resolve(__dirname, 'test.html'));

      await errorMsgInputHtmlElement.clear();
      errorMsgInputHtmlElement.sendKeys('Test');

      expect(await errorMessageHtmlElement.getText() === 'Test').toBe(true, 'no custom error message');
    });

  });

});
