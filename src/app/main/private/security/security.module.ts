import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
      path: 'roles',
      loadChildren: () => import('./role/role.module').then(m => m.RoleModule)
   },
   {
      path: 'users',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule)
   }
];

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      RouterModule.forChild(routes)
   ]
})
export class SecurityModule { }
