import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { RolesComponent } from './roles/roles.component';
import { RoleComponent } from './role/role.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    RolesComponent,
    RoleComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
