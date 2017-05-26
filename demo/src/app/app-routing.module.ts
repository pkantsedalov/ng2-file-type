import { NgModule }               from '@angular/core';
import {  Routes, RouterModule  } from '@angular/router';

import { AppComponent } from './app.component';

import { Ng2FileSizeDemoComponent } from './pages/size/ng2-file-size-demo.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path:      '',
                component: Ng2FileSizeDemoComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [ RouterModule ],
    providers: []
})
export class AppRoutingModule {}
