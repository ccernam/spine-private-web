import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserListComponent } from './user-list/user-list.component';
import { DatatableModule } from 'app/main/components/datatable/datatable.module';
import { CommonModule } from '@angular/common';

// routing
const routes: Routes = [
   {
      path: '',
      component: UserListComponent,
   }
];

@NgModule({
   declarations: [
      UserListComponent
   ],
   imports: [
      CommonModule,
      RouterModule.forChild(routes),
      ContentHeaderModule,
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
      CoreCommonModule,
      DatatableModule
   ]
})
export class UserModule { }
