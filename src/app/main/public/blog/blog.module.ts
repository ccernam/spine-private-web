import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { AuthGuard } from 'app/auth/helpers';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogService } from './blog.service';

const routes: Routes = [
   {
      path: '',
      component: BlogListComponent,
   },
   {
      path: 'details/:id',
      component: BlogDetailComponent,
   }
];

@NgModule({
   declarations: [BlogListComponent, BlogDetailComponent],
   imports: [
      CommonModule,
      RouterModule.forChild(routes),
      ContentHeaderModule,
      CoreCommonModule,
      QuillModule.forRoot(),
      NgSelectModule,
      FormsModule,
      NgbModule
   ],

   providers: [
      BlogService
   ]
})
export class BlogModule { }
