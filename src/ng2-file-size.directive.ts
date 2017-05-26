import {
  OnInit,
  OnChanges,
  DoCheck,
  SimpleChanges,
  Directive,
  ElementRef,
  Input,
  HostListener
} from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import {
  FileSizeRestrictions,
  isMinFileSizeRestrictions,
  isMaxFileSizeRestrictions,
  MinFileSizeRestriction,
  MaxFileSizeRestriction
} from './file-size-restrictions.interface';

type HTMLFileInputMultipleAttribute = any | boolean;
interface FileInputEventTarget extends EventTarget {
  files: FileList;
}

@Directive({
  selector:  '[ng2FileSize][formControlName],[ng2FileSize][formControl],[ng2FileSize][ngModel]',
  exportAs:  'ng2FileSizeDirective',
  providers: [
    {
      provide:     NG_VALIDATORS,
      useExisting: Ng2FileSizeDirective,
      multi:       true
    }
  ]
})
export class Ng2FileSizeDirective implements Validator, OnInit, OnChanges, DoCheck {

  /**
   * @type {boolean}
   * @public
   */
  @Input()
  public ng2FileSize: FileSizeRestrictions;

  /**
   * @type {string}
   * @public
   */
  @Input()
  public ng2FileSizeErrorMsg: string = 'File size is invalid';

  /**
   * @type {boolean}
   * @private
   */
  @Input()
  public set multiple(value: any) {
    this._multiple = value === '' || !!value;
  };

  /**
   * @return {boolean}
   */
  public get multiple(): HTMLFileInputMultipleAttribute {
    return this._multiple;
  }

  /**
   * @type {boolean}
   * @private
   */
  private _multiple: boolean = false;

  /**
   * @type {ElementRef}
   * @private
   */
  private _element: ElementRef;

  /**
   * @type {AbstractControl}
   * @private
   */
  private _control: AbstractControl;

  /**
   *
   * @type {{}}
   * @private
   */
  private _oldValues: FileSizeRestrictions = {
    min: 0,
    max: 0
  };

  /**
   *
   * @param {ElementRef} element
   * @return {void}
   * @public
   */
  public constructor(element: ElementRef) {
    this._element = element;
  }

  /**
   *
   * @return {void}
   * @public
   */
  public ngOnInit(): void {
    this._validateElement();
  }

  /**
   *
   * @return {void}
   * @param {SimpleChanges} changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    // error message has been changed
    if (changes.ng2FileSizeErrorMsg && !changes.ng2FileSizeErrorMsg.firstChange) {
      this._setValidity(this._getInputValue(this._element.nativeElement as FileInputEventTarget));
    }
  }

  /**
   *
   * @public
   * @returns {void}
   */
  public ngDoCheck(): void {

    if (this._control && this.ng2FileSize) {
      let changeDetected = false;

      if (
          isMinFileSizeRestrictions(this.ng2FileSize) && isMinFileSizeRestrictions(this._oldValues)
          &&
          this.ng2FileSize.min !== this._oldValues.min
      ) {
        changeDetected = true;
        (<MinFileSizeRestriction>this._oldValues).min = this.ng2FileSize.min;
      }

      if (
          isMaxFileSizeRestrictions(this.ng2FileSize) && isMaxFileSizeRestrictions(this._oldValues)
          &&
          this.ng2FileSize.max !== this._oldValues.max
      ) {
        changeDetected = true;
        (<MaxFileSizeRestriction>this._oldValues).max = this.ng2FileSize.max;
      }

      if (changeDetected) {
        this._setValidity(this._getInputValue(this._element.nativeElement as FileInputEventTarget));
      }
    }
  }

  /**
   *
   * @param {FormControl} control
   * @return {ValidationErrors}
   * @private
   */
  public validate(control: AbstractControl): ValidationErrors {
    if (!this._control) {
      this._control = control;
    }

    if (this._hasError(this._control.value)) {
      return {
        size: this.ng2FileSizeErrorMsg
      } as ValidationErrors;
    }
  }

  /**
   *
   * @param {EventTarget} eventTarget
   * @return {void}
   */
  @HostListener('change', ['$event.target'])
  public onChange(eventTarget: EventTarget): void {
    const value: File|FileList|undefined = this._getInputValue(eventTarget as FileInputEventTarget);
    this._setValidity(value);
  }

  /**
   *
   * @param value
   * @private
   */
  private _setValidity(value: File|FileList|undefined): void {
    const errors: ValidationErrors = Object.assign({}, this._control.errors);

    if (this._hasError(value)) {
      errors.size = this.ng2FileSizeErrorMsg;
    } else {
      if (this._control.hasError('size')) {
        delete errors.size;
      }
    }

    this._control.setErrors(Object.keys(errors).length ? errors : null);
  }

  /**
   *
   * @param {File|FileList|undefined} value
   * @return {boolean}
   * @private
   */
  private _hasError(value: File|FileList|undefined): boolean {
    return this.ng2FileSize && !this._hasValidSize(value);
  }

  /**
   *
   * @param {File|FileList} value
   * @return {boolean}
   * @private
   */
  private _hasValidSize(value: File|FileList|undefined): boolean {
    let valid: boolean = true;

    if (value) {

      if (this.multiple && !!(<FileList>value).length) {
        value = <FileList>value;

        for (let i = 0, length = value.length; i < length; i++) {
          const file: File = value.item(i);

          if (!this._validateSize(file)) {
            valid = false;
            break;
          }
        }

      } else {
        valid = this._validateSize(<File|undefined>value);
      }
    }

    return valid;
  };

  /**
   *
   * @param value
   * @returns {boolean}
   * @private
   */
  private _validateSize(value: File|undefined): boolean {
    let valid: boolean = true;

    if (value) {

      let isMin = isMinFileSizeRestrictions(this.ng2FileSize) && this.ng2FileSize.min ?
          value.size >= this.ng2FileSize.min : true;
      let isMax = isMaxFileSizeRestrictions(this.ng2FileSize) && this.ng2FileSize.max ?
          value.size <= this.ng2FileSize.max : true;

      valid = isMin && isMax;
    }

    return valid;
  }

  /**
   *
   * @param {FileInputEventTarget} eventTarget
   * @return {File|FileList|undefined}
   * @private
   */
  private _getInputValue(eventTarget: FileInputEventTarget): File|FileList|undefined {
    return this.multiple ? eventTarget.files : eventTarget.files.item(0);
  }

  /**
   *
   * @throws {Error}
   * @private
   */
  private _validateElement(): void {
    let elemType: string  = this._element.nativeElement.tagName;
    let inputType: string = this._element.nativeElement.getAttribute('type');

    if (elemType !== 'INPUT') {
      throw new Error(`Ng2FileSizeDirective: DOM element must be input, not ${elemType}`);
    }

    if (inputType !== 'file') {
      throw new Error(`Ng2FileSizeDirective: input must be type of "file", not "${inputType}"`);
    }

  };

}
