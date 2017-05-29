/* global expect */

// Import necessary wrappers for Jasmine
import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import {
  FormsModule,
  FormControl,
  ValidationErrors
} from '@angular/forms';
import { ElementRef } from '@angular/core';

// Load the implementations that should be tested
import { Ng2FileTypeDirective } from '../ng2-file-type.directive';
import TypeTestComponent        from './type-test.component';

let fixture: ComponentFixture<TypeTestComponent>;
let componentInstance: TypeTestComponent;
let inputElement: HTMLElement;

describe('NG2-file-type directive', () => {

  describe('properties', () => {

    it('should create an instance', () => {
      const elementRef: ElementRef          = new ElementRef(document.createElement('input'));
      const directive: Ng2FileTypeDirective = new Ng2FileTypeDirective(elementRef);

      expect(directive).toBeTruthy();
    });

    it('should have "ng2FileType" property with undefined value by default', () => {
      const elementRef: ElementRef          = new ElementRef(document.createElement('input'));
      const directive: Ng2FileTypeDirective = new Ng2FileTypeDirective(elementRef);

      expect(directive.ng2FileType).toBeUndefined();
    });

    it('should have "fileTypeErrorMsg" property with string value "File is required" by default', () => {
      const elementRef: ElementRef          = new ElementRef(document.createElement('input'));
      const directive: Ng2FileTypeDirective = new Ng2FileTypeDirective(elementRef);

      expect(directive.fileTypeErrorMsg).toBe('File type is invalid');
    });

    it('should have "multiple" property with false boolean value by default', () => {
      const elementRef: ElementRef          = new ElementRef(document.createElement('input'));
      const directive: Ng2FileTypeDirective = new Ng2FileTypeDirective(elementRef);

      expect(directive.multiple).toBe(false);
    });

  });

  describe('methods', () => {

    it('should have validate method which is void by default', () => {
      const elementRef: ElementRef          = new ElementRef(document.createElement('input'));
      const directive: Ng2FileTypeDirective = new Ng2FileTypeDirective(elementRef);

      expect(directive.validate).toBeDefined();
      expect(typeof directive.validate).toBe('function');

      spyOn(directive, 'validate');
      const formControl: FormControl = new FormControl();
      const result: ValidationErrors = directive.validate(formControl);

      expect(result).toBeUndefined();
      expect(directive.validate).toHaveBeenCalledTimes(1);
    });

    it('should have validate method which can return an error [string]', () => {
      const elementRef: ElementRef          = new ElementRef(document.createElement('input'));
      const directive: Ng2FileTypeDirective = new Ng2FileTypeDirective(elementRef);
      directive.ng2FileType                 = 'text/html';

      const formControl: FormControl = new FormControl();
      formControl.setValue(new File([''], 'test.txt'));
      const result: ValidationErrors = directive.validate(formControl);
      const expectedResult: ValidationErrors = {type: 'File type is invalid'};

      expect(result).toEqual(expectedResult);
    });

    it('should have validate method which can return an error [array of strings]', () => {
      const elementRef: ElementRef          = new ElementRef(document.createElement('input'));
      const directive: Ng2FileTypeDirective = new Ng2FileTypeDirective(elementRef);
      directive.ng2FileType                 = ['text/html', 'application/json'];

      const formControl: FormControl = new FormControl();
      formControl.setValue(new File([''], 'test.txt'));
      const result: ValidationErrors = directive.validate(formControl);
      const expectedResult: ValidationErrors = {type: 'File type is invalid'};

      expect(result).toEqual(expectedResult);
    });

    it('should have validate method which can return an error [regex]', () => {
      const elementRef: ElementRef          = new ElementRef(document.createElement('input'));
      const directive: Ng2FileTypeDirective = new Ng2FileTypeDirective(elementRef);
      directive.ng2FileType                 = /(.*)\/json/;

      const formControl: FormControl = new FormControl();
      formControl.setValue(new File([''], 'test.txt'));
      const result: ValidationErrors = directive.validate(formControl);
      const expectedResult: ValidationErrors = {type: 'File type is invalid'};

      expect(result).toEqual(expectedResult);
    });

  });

  describe('form', () => {

    beforeEach(async () => {

      return await TestBed.configureTestingModule({
        imports: [ FormsModule ],
        declarations: [
          TypeTestComponent,
          Ng2FileTypeDirective
        ]
      }).compileComponents();

    });

    it('should detect correct layout of input with directive [ng2FileType]', async (done: Function) => {

      try {
        fixture = TestBed.overrideComponent(TypeTestComponent, {
          set: {
            template: `
              <form>
                  <input 
                    type="file" 
                    name="test" 
                    [ng2FileType] 
                    [(ngModel)]="model" 
                  />
              </form>
            `
          }
        }).createComponent(TypeTestComponent);

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        inputElement = fixture.nativeElement.querySelector('input');

        expect(inputElement.classList.contains('ng-untouched')).toBe(true);
        expect(inputElement.classList.contains('ng-pristine')).toBe(true);
        expect(inputElement.classList.contains('ng-valid')).toBe(true);

        done();
      } catch (err) {
        console.error(err.message);
        done(err);
      }

    });

    it('should detect correct layout of input with directive [ng2FileType]="string"', async (done: Function) => {

      try {
        fixture = TestBed.overrideComponent(TypeTestComponent, {
          set: {
            template: `
              <form>
                  <input 
                    type="file" 
                    name="test" 
                    [ng2FileType]="'text/plain'" 
                    [(ngModel)]="model" 
                  />
              </form>
            `
          }
        }).createComponent(TypeTestComponent);

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        inputElement = fixture.nativeElement.querySelector('input');

        expect(inputElement.classList.contains('ng-untouched')).toBe(true);
        expect(inputElement.classList.contains('ng-pristine')).toBe(true);
        expect(inputElement.classList.contains('ng-valid')).toBe(true);

        done();
      } catch (err) {
        console.error(err.message);
        done(err);
      }

    });

    it('should detect correct layout of input with directive [ng2FileType]="[string, string]"', async (done: Function) => {

      try {
        fixture = TestBed.overrideComponent(TypeTestComponent, {
          set: {
            template: `
              <form>
                  <input
                    type="file"
                    name="test"
                    [ng2FileType]="['text/plain', 'text/html']"
                    [(ngModel)]="model"
                  />
              </form>
            `
          }
        }).createComponent(TypeTestComponent);

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        inputElement = fixture.nativeElement.querySelector('input');

        expect(inputElement.classList.contains('ng-untouched')).toBe(true);
        expect(inputElement.classList.contains('ng-pristine')).toBe(true);
        expect(inputElement.classList.contains('ng-valid')).toBe(true);

        done();
      } catch (err) {
        console.error(err.message);
        done(err);
      }

    });

    it('should detect correct layout of input with directive [ng2FileType]="regex"', async (done: Function) => {

      try {
        fixture = TestBed.overrideComponent(TypeTestComponent, {
          set: {
            template: `
              <form>
                  <input
                    type="file"
                    name="test"
                    [ng2FileType]="regexPattern"
                    [(ngModel)]="model"
                  />
              </form>
            `
          }
        }).createComponent(TypeTestComponent);

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        inputElement = fixture.nativeElement.querySelector('input');

        expect(inputElement.classList.contains('ng-untouched')).toBe(true);
        expect(inputElement.classList.contains('ng-pristine')).toBe(true);
        expect(inputElement.classList.contains('ng-valid')).toBe(true);

        done();
      } catch (err) {
        console.error(err.message);
        done(err);
      }

    });

    describe('"multiple" attribute', () => {

      it('should detect correct correct values of "multiple" property when input has a directive [ng2FileType] and "multiple" attribute', async (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(TypeTestComponent, {
            set: {
              template: `
              <form>
                  <input
                    type="file"
                    name="test"
                    multiple
                    [ng2FileType]
                    [(ngModel)]="model"
                    #ng2ftd=ng2FileTypeDirective
                  />
              </form>
            `
            }
          }).createComponent(TypeTestComponent);

          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          componentInstance = fixture.componentInstance;
          expect(componentInstance.ng2ftd.multiple).toBe(true);

          done();
        } catch (err) {
          console.error(err.message);
          done(err);
        }

      });
      
      it('should detect correct correct values of "multiple" property when input has a directive [ng2FileType] and multiple="multiple" attribute', async (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(TypeTestComponent, {
            set: {
              template: `
              <form>
                  <input
                    type="file"
                    name="test"
                    multiple="multiple"
                    [ng2FileType]
                    [(ngModel)]="model"
                    #ng2ftd=ng2FileTypeDirective
                  />
              </form>
            `
            }
          }).createComponent(TypeTestComponent);

          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          componentInstance = fixture.componentInstance;
          expect(componentInstance.ng2ftd.multiple).toBe(true);

          done();
        } catch (err) {
          console.error(err.message);
          done(err);
        }

      });

      it('should detect correct correct values of "multiple" property when input has a directive [ng2FileType] and [multiple]="false" attribute', async (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(TypeTestComponent, {
            set: {
              template: `
                <form>
                    <input
                      type="file"
                      name="test"
                      [multiple]="false"
                      [ng2FileType]
                      [(ngModel)]="model"
                      #ng2ftd=ng2FileTypeDirective
                    />
                </form>
              `
            }
          }).createComponent(TypeTestComponent);

          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          componentInstance = fixture.componentInstance;
          expect(componentInstance.ng2ftd.multiple).toBe(false);

          done();
        } catch (err) {
          console.error(err.message);
          done(err);
        }

      });

    });

    describe('restrictions', () => {

      it('should detect correct values of "ng2FileType" property when input has a directive [ng2FileType] and string value', async (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(TypeTestComponent, {
            set: {
              template: `
              <form>
                  <input
                    type="file"
                    name="test"
                    multiple
                    [ng2FileType]="'text/json'"
                    [(ngModel)]="model"
                    #ng2ftd=ng2FileTypeDirective
                  />
              </form>
            `
            }
          }).createComponent(TypeTestComponent);

          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          componentInstance = fixture.componentInstance;
          expect(componentInstance.ng2ftd.ng2FileType).toEqual('text/json');

          done();
        } catch (err) {
          console.error(err.message);
          done(err);
        }

      });

      it('should detect correct values of "ng2FileType" property when input has a directive [ng2FileType] and array of string value', async (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(TypeTestComponent, {
            set: {
              template: `
              <form>
                  <input
                    type="file"
                    name="test"
                    multiple
                    [ng2FileType]="['text/json', 'text/html']"
                    [(ngModel)]="model"
                    #ng2ftd=ng2FileTypeDirective
                  />
              </form>
            `
            }
          }).createComponent(TypeTestComponent);

          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          componentInstance = fixture.componentInstance;
          expect(componentInstance.ng2ftd.ng2FileType).toEqual(['text/json', 'text/html']);

          done();
        } catch (err) {
          console.error(err.message);
          done(err);
        }

      });

      it('should detect correct values of "ng2FileType" property when input has a directive [ng2FileType] and regex value', async (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(TypeTestComponent, {
            set: {
              template: `
              <form>
                  <input
                    type="file"
                    name="test"
                    multiple
                    [ng2FileType]="regexPattern"
                    [(ngModel)]="model"
                    #ng2ftd=ng2FileTypeDirective
                  />
              </form>
            `
            }
          }).createComponent(TypeTestComponent);

          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          componentInstance = fixture.componentInstance;
          expect(componentInstance.ng2ftd.ng2FileType).toEqual(componentInstance.regexPattern);

          done();
        } catch (err) {
          console.error(err.message);
          done(err);
        }

      });

    });

  });

});
