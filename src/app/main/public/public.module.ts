import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { NgSelectModule } from '@ng-select/ng-select';

// routing
const routes: Routes = [
   {
      path: 'blog',
      loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
   },
];

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      RouterModule.forChild(routes),
      CoreCommonModule,
      NgSelectModule,
      FormsModule,
      NgbModule
   ]
})
export class PublicModule { }
