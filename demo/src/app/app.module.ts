import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }             from './app.component';
import { Ng2FileTypeDemoComponent } from './pages/type/ng2-file-type-demo.component';
import { Ng2FileTypeModule }        from 'ng2-file-type';

@NgModule({
  declarations: [
    AppComponent,
    Ng2FileTypeDemoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    Ng2FileTypeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
