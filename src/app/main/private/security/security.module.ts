import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { RoleComponent } from './role/role.component';
import { RoleOptionComponent } from './role-option/role-option.component';

// routing
const routes: Routes = [
   {
      path: 'roles',
      component: RolesComponent,
   },
   {
      path: 'users',
      component: UsersComponent,
   }
];

@NgModule({
   declarations: [
      RolesComponent,
      UsersComponent,
      RoleComponent,
      RoleOptionComponent,
   ],
   imports: [
      RouterModule.forChild(routes),
      ContentHeaderModule,
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
      CoreCommonModule,
   ]
})
export class SecurityModule { }
