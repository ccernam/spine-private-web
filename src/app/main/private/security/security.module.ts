import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';

// routing
const routes: Routes = [
   {
      path: 'role',
      component: RoleComponent,
   },
   {
      path: 'user',
      component: RoleComponent,
   }
];

@NgModule({
   declarations: [
      RoleComponent,
      UserComponent,
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
