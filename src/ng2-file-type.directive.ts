import {
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

import { FileTypeRestriction } from './file-type-restrictions.interface';

type HTMLFileInputMultipleAttribute = any | boolean;
interface FileInputEventTarget extends EventTarget {
  files: FileList;
}

@Directive({
  selector:  'input[type="file"][ng2FileType][formControlName],input[type="file"][ng2FileType][formControl],input[type="file"][ng2FileType][ngModel]',
  exportAs:  'ng2FileTypeDirective',
  providers: [
    {
      provide:     NG_VALIDATORS,
      useExisting: Ng2FileTypeDirective,
      multi:       true
    }
  ]
})
export class Ng2FileTypeDirective implements Validator, OnChanges, DoCheck {

  /**
   * @type {FileTypeRestriction}
   * @public
   */
  @Input()
  public ng2FileType: FileTypeRestriction;

  /**
   * @type {string}
   * @public
   */
  @Input()
  public fileTypeErrorMsg: string = 'File type is invalid';

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
   * @type {FileTypeRestriction}
   * @private
   */
  private _oldValue: FileTypeRestriction;

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
   * @param {SimpleChanges} changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    // error message has been changed
    if (changes.fileTypeErrorMsg && !changes.fileTypeErrorMsg.firstChange) {
      this._setValidity(this._getInputValue(this._element.nativeElement as FileInputEventTarget));
    }
  }

  /**
   *
   * @public
   * @returns {void}
   */
  public ngDoCheck(): void {

    if (this._control) {
      let changeDetected = false;

      if (this.ng2FileType !== this._oldValue) {
        changeDetected = true;
        this._oldValue = this.ng2FileType;
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
        type: this.fileTypeErrorMsg
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
      errors.type = this.fileTypeErrorMsg;
    } else {
      if (this._control.hasError('type')) {
        delete errors.type;
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
    return this.ng2FileType && !this._hasValidType(value);
  }

  /**
   *
   * @param {File|FileList} value
   * @return {boolean}
   * @private
   */
  private _hasValidType(value: File|FileList|undefined): boolean {
    let valid: boolean = true;

    if (value) {

      if (this.multiple && !!(value as FileList).length) {
        value = value as FileList;

        for (let i = 0; i < value.length; i++) {
          const file: File = value.item(i);

          if (!this._validateType(file)) {
            valid = false;
            break;
          }
        }

      } else {
        valid = this._validateType(value as File|undefined);
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
  private _validateType(value: File|undefined): boolean {
    let valid: boolean = true;

    if (value) {

      if (this.ng2FileType instanceof RegExp) {
        valid = this.ng2FileType.test(value.type);
      } else if (typeof this.ng2FileType === 'string') {
        valid = this.ng2FileType === value.type;
      } else if (Array.isArray(this.ng2FileType)) {
        valid = this.ng2FileType.includes(value.type);
      }

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

}
