import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }             from './app.component';
import { Ng2FileSizeDemoComponent } from './pages/size/ng2-file-size-demo.component';
import { Ng2FileSizeModule }        from 'ng2-file-size';

@NgModule({
  declarations: [
    AppComponent,
    Ng2FileSizeDemoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    Ng2FileSizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
