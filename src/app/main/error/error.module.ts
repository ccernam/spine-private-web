import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';


// routing
const routes: Routes = [
   {
      path: 'not-found',
      component: NotFoundComponent,
      data: { animation: 'error' }
   },
   {
      path: 'not-authorized',
      component: NotAuthorizedComponent,
      data: { animation: 'error' }
   },
   {
      path: 'maintenance',
      component: MaintenanceComponent,
      data: { animation: 'error' }
   },
   {
      path: 'coming-soon',
      component: ComingSoonComponent,
      data: { animation: 'error' }
   }
];

@NgModule({
   declarations: [
      NotFoundComponent,
      NotAuthorizedComponent,
      MaintenanceComponent,
      ComingSoonComponent
   ],
   imports: [
      CommonModule,
      RouterModule.forChild(routes),
      CoreCommonModule
   ]
})
export class ErrorModule { }
