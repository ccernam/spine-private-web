import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// routing
const routes: Routes = [
   {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
   },
   {
      path: 'commons',
      loadChildren: () => import('./commons/commons.module').then(m => m.CommonsModule)
   },
   {
      path : 'logistics',
      loadChildren: () => import('./logistics/logistics.module').then(m => m.LogisticsModule)
   },
   {
      path: 'security',
      loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
   },
];

@NgModule({
   declarations: [
  ],
   imports: [
      CommonModule,
      RouterModule.forChild(routes),
   ]
})
export class PrivateModule { }
