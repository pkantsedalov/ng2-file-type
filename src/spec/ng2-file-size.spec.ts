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
import { Ng2FileSizeDirective } from '../ng2-file-size.directive';
import SizeTestComponent        from './size-test.component';

let fixture: ComponentFixture<SizeTestComponent>;
let componentInstance: SizeTestComponent;
let inputElement: HTMLElement;

describe('NG2-FILE-SIZE directive', () => {

  describe('properties', () => {

    it('should create an instance', () => {
      const elementRef: ElementRef          = new ElementRef(document.createElement('input'));
      const directive: Ng2FileSizeDirective = new Ng2FileSizeDirective(elementRef);

      expect(directive).toBeTruthy();
    });

    it('should have "ng2FileSize" property with undefined value by default', () => {
      const elementRef: ElementRef          = new ElementRef(document.createElement('input'));
      const directive: Ng2FileSizeDirective = new Ng2FileSizeDirective(elementRef);

      expect(directive.ng2FileSize).toBeUndefined();
    });

    it('should have "fileSizeErrorMsg" property with string value "File is required" by default', () => {
      const elementRef: ElementRef          = new ElementRef(document.createElement('input'));
      const directive: Ng2FileSizeDirective = new Ng2FileSizeDirective(elementRef);

      expect(directive.fileSizeErrorMsg).toBe('File size is invalid');
    });

    it('should have "multiple" property with false boolean value by default', () => {
      const elementRef: ElementRef          = new ElementRef(document.createElement('input'));
      const directive: Ng2FileSizeDirective = new Ng2FileSizeDirective(elementRef);

      expect(directive.multiple).toBe(false);
    });

  });

  describe('methods', () => {

    it('should have void ngOnInit method', () => {
      const elementRef: ElementRef          = new ElementRef(document.createElement('input'));
      const directive: Ng2FileSizeDirective = new Ng2FileSizeDirective(elementRef);

      expect(directive.ngOnInit).toBeDefined();
      expect(typeof directive.ngOnInit).toBe('function');

      spyOn(directive, 'ngOnInit');
      const result = directive.ngOnInit();

      expect(result).toBeUndefined();
      expect(directive.ngOnInit).toHaveBeenCalled();
      expect(directive.ngOnInit).toHaveBeenCalledTimes(1);
      expect(directive.ngOnInit).toHaveBeenCalledWith();
    });

    it('should have validate method which is void by default', () => {
      const elementRef: ElementRef          = new ElementRef(document.createElement('input'));
      const directive: Ng2FileSizeDirective = new Ng2FileSizeDirective(elementRef);

      expect(directive.validate).toBeDefined();
      expect(typeof directive.validate).toBe('function');

      spyOn(directive, 'validate');
      const formControl: FormControl = new FormControl();
      const result: ValidationErrors = directive.validate(formControl);

      expect(result).toBeUndefined();
      expect(directive.validate).toHaveBeenCalledTimes(1);
    });

    it('should have validate method which can return an error', () => {
      const elementRef: ElementRef          = new ElementRef(document.createElement('input'));
      const directive: Ng2FileSizeDirective = new Ng2FileSizeDirective(elementRef);
      directive.ng2FileSize                 = { min: 1024 };

      const formControl: FormControl = new FormControl();
      formControl.setValue(new File([''], 'test.txt'));
      const result: ValidationErrors = directive.validate(formControl);
      const expectedResult: ValidationErrors = {size: 'File size is invalid'};

      expect(result).toEqual(expectedResult);
    });

  });

  describe('form', () => {

    beforeEach(async () => {

      return await TestBed.configureTestingModule({
        imports: [ FormsModule ],
        declarations: [
          SizeTestComponent,
          Ng2FileSizeDirective
        ]
      }).compileComponents();

    });

    it('should detect correct layout of input with directive [ng2FileSize]', async (done: Function) => {

      try {
        fixture = TestBed.overrideComponent(SizeTestComponent, {
          set: {
            template: `
              <form>
                  <input 
                    type="file" 
                    name="test" 
                    [ng2FileSize] 
                    [(ngModel)]="model" 
                  />
              </form>
            `
          }
        }).createComponent(SizeTestComponent);

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

    it('should detect correct layout of input with directive [ng2FileSize]="{min: <number>}"', async (done: Function) => {

      try {
        fixture = TestBed.overrideComponent(SizeTestComponent, {
          set: {
            template: `
              <form>
                  <input 
                    type="file" 
                    name="test" 
                    [ng2FileSize]="{ min: min }" 
                    [(ngModel)]="model" 
                  />
              </form>
            `
          }
        }).createComponent(SizeTestComponent);

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

    it('should detect correct layout of input with directive [ng2FileSize]="{max: <number>}"', async (done: Function) => {

      try {
        fixture = TestBed.overrideComponent(SizeTestComponent, {
          set: {
            template: `
              <form>
                  <input
                    type="file"
                    name="test"
                    [ng2FileSize]="{ max: max }"
                    [(ngModel)]="model"
                  />
              </form>
            `
          }
        }).createComponent(SizeTestComponent);

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

      it('should detect correct correct values of "multiple" property when input has a directive [ng2FileSize] and "multiple" attribute', async (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(SizeTestComponent, {
            set: {
              template: `
              <form>
                  <input
                    type="file"
                    name="test"
                    multiple
                    [ng2FileSize]
                    [(ngModel)]="model"
                    #ng2fsd=ng2FileSizeDirective
                  />
              </form>
            `
            }
          }).createComponent(SizeTestComponent);

          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          componentInstance = fixture.componentInstance;
          expect(componentInstance.ng2fsd.multiple).toBe(true);

          done();
        } catch (err) {
          console.error(err.message);
          done(err);
        }

      });
      
      it('should detect correct correct values of "multiple" property when input has a directive [ng2FileSize] and multiple="multiple" attribute', async (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(SizeTestComponent, {
            set: {
              template: `
              <form>
                  <input
                    type="file"
                    name="test"
                    multiple="multiple"
                    [ng2FileSize]
                    [(ngModel)]="model"
                    #ng2fsd=ng2FileSizeDirective
                  />
              </form>
            `
            }
          }).createComponent(SizeTestComponent);

          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          componentInstance = fixture.componentInstance;
          expect(componentInstance.ng2fsd.multiple).toBe(true);

          done();
        } catch (err) {
          console.error(err.message);
          done(err);
        }

      });

      it('should detect correct correct values of "multiple" property when input has a directive [ng2FileSize] and [multiple]="false" attribute', async (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(SizeTestComponent, {
            set: {
              template: `
                <form>
                    <input
                      type="file"
                      name="test"
                      [multiple]="false"
                      [ng2FileSize]
                      [(ngModel)]="model"
                      #ng2fsd=ng2FileSizeDirective
                    />
                </form>
              `
            }
          }).createComponent(SizeTestComponent);

          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          componentInstance = fixture.componentInstance;
          expect(componentInstance.ng2fsd.multiple).toBe(false);

          done();
        } catch (err) {
          console.error(err.message);
          done(err);
        }

      });

    });

    describe('restrictions', () => {

      it('should detect correct values of "ng2FileSize" property when input has a directive [ng2FileSize] and { min } value', async (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(SizeTestComponent, {
            set: {
              template: `
              <form>
                  <input
                    type="file"
                    name="test"
                    multiple
                    [ng2FileSize]="{ min: min }"
                    [(ngModel)]="model"
                    #ng2fsd=ng2FileSizeDirective
                  />
              </form>
            `
            }
          }).createComponent(SizeTestComponent);

          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          componentInstance = fixture.componentInstance;
          expect(componentInstance.ng2fsd.ng2FileSize).toEqual({
            min: componentInstance.min
          });

          done();
        } catch (err) {
          console.error(err.message);
          done(err);
        }

      });

      it('should detect correct values of "ng2FileSize" property when input has a directive [ng2FileSize] and { max } value', async (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(SizeTestComponent, {
            set: {
              template: `
              <form>
                  <input
                    type="file"
                    name="test"
                    multiple
                    [ng2FileSize]="{ max: max }"
                    [(ngModel)]="model"
                    #ng2fsd=ng2FileSizeDirective
                  />
              </form>
            `
            }
          }).createComponent(SizeTestComponent);

          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          componentInstance = fixture.componentInstance;
          expect(componentInstance.ng2fsd.ng2FileSize).toEqual({
            max: componentInstance.max
          });

          done();
        } catch (err) {
          console.error(err.message);
          done(err);
        }

      });

      it('should detect correct values of "ng2FileSize" property when input has a directive [ng2FileSize] and { max, max } value', async (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(SizeTestComponent, {
            set: {
              template: `
              <form>
                  <input
                    type="file"
                    name="test"
                    multiple
                    [ng2FileSize]="range"
                    [(ngModel)]="model"
                    #ng2fsd=ng2FileSizeDirective
                  />
              </form>
            `
            }
          }).createComponent(SizeTestComponent);

          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          componentInstance = fixture.componentInstance;
          expect(componentInstance.ng2fsd.ng2FileSize).toEqual(componentInstance.range);

          done();
        } catch (err) {
          console.error(err.message);
          done(err);
        }

      });

    });

    describe('exceptions', () => {

      it('should detect an exception when the directive is not on <input/> tag', (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(SizeTestComponent, {
            set: {
              template: `
              <form>
                  <span [ng2FileSize] [(ngModel)]="model"></span>
              </form>
            `
            }
          }).createComponent(SizeTestComponent);

          fixture.detectChanges();
        } catch (err) {
          expect(err.message).toEqual('Ng2FileSizeDirective: DOM element must be input, not SPAN');
          done();
        }

      });

      it('should detect an exception when the directive is not on <input type="file" /> tag', (done: Function) => {

        try {
          fixture = TestBed.overrideComponent(SizeTestComponent, {
            set: {
              template: `
              <form>
                  <input type="text" [ng2FileSize] [(ngModel)]="model" />
              </form>
            `
            }
          }).createComponent(SizeTestComponent);

          fixture.detectChanges();
        } catch (err) {
          expect(err.message).toEqual('Ng2FileSizeDirective: input must be type of "file", not "text"');
          done();
        }

      });

    });

  });

});
