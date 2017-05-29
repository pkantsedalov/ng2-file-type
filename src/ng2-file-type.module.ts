import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { NgModule }     from '@angular/core';

import { Ng2FileTypeDirective } from './ng2-file-type.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    Ng2FileTypeDirective
  ],
  exports: [
    Ng2FileTypeDirective
  ]
})
export class Ng2FileTypeModule {}
