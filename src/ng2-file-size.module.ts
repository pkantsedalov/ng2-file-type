import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { NgModule }     from '@angular/core';

import { Ng2FileSizeDirective } from './ng2-file-size.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    Ng2FileSizeDirective
  ],
  exports: [
    Ng2FileSizeDirective
  ]
})
export class Ng2FileSizeModule {}
