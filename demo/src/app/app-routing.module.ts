import { NgModule }               from '@angular/core';
import {  Routes, RouterModule  } from '@angular/router';

import { AppComponent } from './app.component';

import { Ng2FileTypeDemoComponent } from './pages/type/ng2-file-type-demo.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path:      '',
                component: Ng2FileTypeDemoComponent
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
