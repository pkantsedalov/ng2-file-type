import { Component, ViewChild } from '@angular/core';

import { Ng2FileTypeDirective } from '../ng2-file-type.directive';

@Component({
    template: '<div></div>'
})
export default class TypeTestComponent {

 /**
  * @type {any}
  * @public
  */
  public model: any;

  /**
   * @public
   * @type {RegExp}
   */
  public regexPattern: RegExp = /(.*)\/json/;

  /**
   * @type {Ng2FileTypeDirective}
   * @public
   */
  @ViewChild('ng2ftd')
  public ng2ftd: Ng2FileTypeDirective;
}
