import { Component, ViewChild } from '@angular/core';

import { Ng2FileSizeDirective } from '../ng2-file-size.directive';
import { FileSizeRestrictions } from '../file-size-restrictions.interface';

@Component({
    template: '<div></div>'
})
export default class SizeTestComponent {

 /**
  * @type {any}
  * @public
  */
  public model: any;

  public min: number = 1024;

  public max: number = 1024 * 1024;

  public range: FileSizeRestrictions = {
      min: this.min,
      max: this.max
  };

  @ViewChild('ng2fsd')
  public ng2fsd: Ng2FileSizeDirective;
}
