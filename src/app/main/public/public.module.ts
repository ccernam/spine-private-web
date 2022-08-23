import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { BlogListComponent } from './blog-list/blog-list.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgSelectModule } from '@ng-select/ng-select';

// routing
const routes: Routes = [
   {
      path: 'blog',
      component: BlogListComponent
   }
];

@NgModule({
   declarations: [
      BlogListComponent
   ],
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
